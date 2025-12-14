import React, { use, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { School, DropdownItem } from "@/types/school";
import SchoolCard from "../components/SchoolCardMap";
import MapList from "@/components/MapList";
import MapboxMap from "@/components/MapboxMap";
import ToggleButton from "@/components/ToggleButton";
import SearchBar from "@/components/SearchBar";
import { GetStaticProps } from "next";
import prisma from "@/lib/prisma";
import Image from "next/image";
import HighPriorityModal from "@/components/HighPriorityModal";
import { useMapContext } from "../contexts/MapContext";
import SEO from "@/components/SEO";
import { SchoolType } from "@prisma/client";
import FilterBySchoolType from "../components/FilterBySchoolType";

import { usePostHog } from "posthog-js/react";

export const getStaticProps: GetStaticProps = async () => {
  const schools = await prisma.school.findMany({
    include: {
      metrics: true,
      programs: true,
    },
  });
  return { props: { schools } };
};

type Props = {
  schools: School[];
};

const schoolCardPlaceholderTitle = "Select a School";
// school in session

// School Year Version. Uncomment below when school starts in the Fall
const schoolCardPlaceholderText =
  "All schools are looking for volunteers and donations. Click on the school closest to you to learn more.";

// Summer Version. Comment-out below when school starts in the Fall
//const schoolCardPlaceholderText = "San Francisco public schools are closed until mid August. Click on the school closest to you to learn about opportunities in the fall.";

// school out of session
/* const schoolCardPlaceholderText =
  "San Francisco public schools are closed until mid August. Click on the school closest to you to learn about opportunities in the fall.";*/

const Map: React.FC<Props> = (props) => {
  const { isMapView, selectedSchool, setIsMapView, setSelectedSchool } =
    useMapContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSchoolTypes, setSelectedSchoolTypes] = useState<SchoolType[]>(
    [],
  );
  const [filteredSchools, setFilteredSchools] = useState(props.schools);
  const [priorityFilter, setPriorityFilter] = useState(false);

  // Mobile drawer state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const storedTypes = sessionStorage.getItem("selectedSchoolTypes");
    const storedPriority = sessionStorage.getItem("priorityFilter");
    if (storedTypes) {
      setSelectedSchoolTypes(JSON.parse(storedTypes) as SchoolType[]);
    }
    if (storedPriority) {
      setPriorityFilter(JSON.parse(storedPriority));
    }
  }, []);

  useEffect(() => {
    setFilteredSchools(
      getSchoolsByType(selectedSchoolTypes, props.schools, priorityFilter),
    );
  }, [selectedSchoolTypes, props.schools, priorityFilter]);

  useEffect(() => {
    const storedPriority = sessionStorage.getItem("priorityFilter");
    if (storedPriority) {
      setPriorityFilter(JSON.parse(storedPriority));
    }
  }, []);
  const posthog = usePostHog();

  const openModal = () => {
    posthog?.capture("high_priority_modal_opened", {
      school: selectedSchool?.name,
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const setToggle = () => {
    posthog?.capture("map_view_toggled", { isMapView: !isMapView });
    setIsMapView(!isMapView);
  };

  const onClose = (e: React.MouseEvent<HTMLElement>) => {
    setSelectedSchool(null);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSchoolTypeSelection = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value as SchoolType;
    const updatedTypes = selectedSchoolTypes.includes(value)
      ? selectedSchoolTypes.filter((type) => type !== value)
      : [...selectedSchoolTypes, value];

    setSelectedSchoolTypes(updatedTypes);

    sessionStorage.setItem("selectedSchoolTypes", JSON.stringify(updatedTypes));
  };

  const getSchoolsByType = (
    schoolTypes: SchoolType[],
    schools: School[],
    priorityFilter: boolean,
  ) => {
    return schools.filter((school) => {
      const matchesSchoolType =
        schoolTypes.length === 0 ||
        schoolTypes.some((type) => school.school_type.includes(type));
      const matchesPriority = !priorityFilter || school.priority === true;

      return matchesSchoolType && matchesPriority;
    });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setPriorityFilter(isChecked);
    sessionStorage.setItem("priorityFilter", JSON.stringify(isChecked));
  };

  const handleSchoolSearch = async (searchTerm: string) => {
    posthog?.capture("searched_for_school", { searchTerm });
    const searchTermToLowerCase = searchTerm.toLowerCase();
    return filteredSchools
      .filter(({ name, zipcode, neighborhood }) => {
        const nameToLowerCase = name.toLowerCase();
        const neighborhoodToLowerCase = neighborhood?.toLowerCase();
        return (
          nameToLowerCase.includes(searchTermToLowerCase) ||
          zipcode?.includes(searchTermToLowerCase) ||
          neighborhoodToLowerCase?.includes(searchTermToLowerCase)
        );
      })
      .map((school) => ({
        label: school.name,
        value: school.name,
        item: school,
      }));
  };

  const itemSelect = (selection: DropdownItem<School>) => {
    posthog?.capture("selected_school_from_search", {
      school: selection.item.name,
    });
    setSelectedSchool(selection.item);
  };

  /* TODO: look into whether or not creating a `WithLink` component
  can simplify this somehow */
  const SelectedSchoolCard = (props: any) => (
    <SchoolCard
      school={props.school}
      onClose={onClose}
      className={`block ${props.className}`}
      onModalOpen={openModal}
    />
  );

  useEffect(() => {
    if (isMapView && window.innerWidth <= 768) {
      window.scrollTo({
        top: 0,
      });
    }
  }, [isMapView]);

  return (
    <>
      <SEO title="Support SF Schools - School Map" />
      <div className="flex h-full flex-col bg-[#D7F1FF]">
        {/* High Priority Modal */}
        <HighPriorityModal isOpen={modalIsOpen} onClose={closeModal} />

        {/* MOBILE ONLY: Top Bar with Search, Toggle, and Filters Button */}
        <div className="flex flex-col gap-2 p-2 md:hidden">
          <div className="flex items-center gap-2">
            <div className="flex-grow">
              <SearchBar
                onItemSelect={itemSelect}
                onSearch={handleSchoolSearch}
              />
            </div>

            <button
              className="ml-2 flex items-center justify-center bg-[#D7F1FF] p-2 text-[#000]"
              aria-label="Open filters"
              onClick={() => setMobileFiltersOpen(true)}
            >
              {/* Replace with your filter icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
              </svg>
            </button>
          </div>
          <ToggleButton isMapView={isMapView} toggleView={setToggle} />
        </div>

        {/* MOBILE ONLY: Filters Drawer */}
        {mobileFiltersOpen && (
          <div
            className="fixed bottom-0 left-0 z-40 h-full w-full bg-black opacity-50"
            onClick={() => setMobileFiltersOpen(false)}
          />
        )}

        <div
          className={`fixed bottom-0 left-0 right-0 z-40 flex flex-col rounded-t-2xl bg-white shadow-lg transition-transform duration-300 md:hidden ${
            mobileFiltersOpen ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ minHeight: "50vh" }}
        >
          <div className="flex flex-grow flex-col justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center justify-between border-b-2 p-4">
                <h2 className="text-lg font-semibold">Filter Schools</h2>
                <button
                  className="text-xl text-gray-500"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                >
                  &times;
                </button>
              </div>
              {/* School Type Filter - stacked */}
              <div className="flex flex-col gap-4 p-4">
                <FilterBySchoolType
                  selectedSchoolTypes={selectedSchoolTypes}
                  setSelectedSchoolTypes={setSelectedSchoolTypes}
                  handleSchoolTypeSelection={handleSchoolTypeSelection}
                  handlePriorityChange={handlePriorityChange}
                  priorityFilter={priorityFilter}
                  setPriorityFilter={setPriorityFilter}
                />
              </div>
            </div>

            {/* Reset and Apply Buttons - stacked at bottom */}
            <div className="flex justify-between gap-4 border-t-2 p-4">
              <button
                className="flex-1 rounded-full px-6 py-2 font-semibold"
                style={{ backgroundColor: "#E7E7E7" }}
                onClick={() => {
                  setSelectedSchoolTypes([]);
                  setPriorityFilter(false);
                  setMobileFiltersOpen(false);
                }}
              >
                Reset
              </button>
              <button
                className="flex-1 rounded-full px-6 py-2 font-semibold text-white"
                style={{ backgroundColor: "#3A86FF" }}
                onClick={() => setMobileFiltersOpen(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
        {/* Main Content Area */}
        <div
          className={`relative mx-auto flex h-auto flex-col overflow-auto md:h-[calc(100vh-64px)] md:gap-4 md:p-4 lg:w-10/12 2xl:w-2/3 ${isMapView ? " w-full flex-1" : ""}`}
        >
          <div className="flex h-full w-full grid-cols-10 flex-row-reverse items-center justify-center gap-4 md:grid md:w-auto md:flex-col">
            {/* School Card or Placeholder */}
            <div
              className={`col-span-4 ${isMapView && selectedSchool ? "p-0" : "p-2 md:p-0"}  ${isMapView && selectedSchool !== null ? "flex" : "hidden"} absolute bottom-0 left-0 right-0 z-20 m-4 flex h-fit items-center justify-center rounded-2xl bg-white md:static md:m-0 md:flex md:h-full`}
            >
              {isMapView ? (
                selectedSchool ? (
                  <div className="w-full md:w-auto md:p-4">
                    <SelectedSchoolCard
                      school={selectedSchool}
                      className="hidden md:block"
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-20 px-5">
                      <div className="flex w-full flex-col items-center gap-12">
                        <Image
                          src="/map-school-logo.png"
                          alt="Homepage Background"
                          className="hidden w-1/2 md:inline-block"
                          width={200}
                          height={200}
                        />
                        <div className="align-center flex flex-col items-center gap-4 text-center">
                          <h1 className="text-2xl font-medium">
                            {schoolCardPlaceholderTitle}
                          </h1>
                          <p className="md:text-lg">
                            {schoolCardPlaceholderText}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )
              ) : (
                <div className="flex flex-col gap-20 px-5">
                  <div className="flex w-full flex-col items-center gap-12">
                    <Image
                      src="/map-school-logo.png"
                      alt="Homepage Background"
                      className="w-1/2"
                      width={200}
                      height={200}
                    />
                    <div className="align-center flex flex-col items-center gap-4 text-center">
                      <h1 className="text-2xl font-medium">
                        {schoolCardPlaceholderTitle}
                      </h1>
                      <p className="md:text-lg">{schoolCardPlaceholderText}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Map or List View */}
            <div className="background relative flex h-full w-full flex-col gap-2 overflow-auto md:col-span-6 md:gap-4 ">
              {/* DESKTOP ONLY: Top Bar with Search, Toggle, Map/List */}
              <div className="hidden rounded-2xl bg-white p-4 md:block">
                <div className="flex w-full items-center gap-2">
                  <div className="w-2/3">
                    <SearchBar
                      onItemSelect={itemSelect}
                      onSearch={handleSchoolSearch}
                    />
                  </div>
                  <div className="w-1/3">
                    <ToggleButton
                      isMapView={isMapView}
                      toggleView={setToggle}
                    />
                  </div>
                </div>
                {/* DESKTOP ONLY: Filters Row */}
                <FilterBySchoolType
                  selectedSchoolTypes={selectedSchoolTypes}
                  setSelectedSchoolTypes={setSelectedSchoolTypes}
                  handleSchoolTypeSelection={handleSchoolTypeSelection}
                  handlePriorityChange={handlePriorityChange}
                  priorityFilter={priorityFilter}
                  setPriorityFilter={setPriorityFilter}
                />
                {/* <div className="flex items-center gap-2">
                    <Image
                      alt="High priority icon"
                      src="/circle_priority.svg"
                      width={19}
                      height={20}
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalIsOpen(true);
                      }}
                    />
                    <label htmlFor="priority" className="text-sm">Priority</label>
                    <input
                      type="checkbox"
                      id="priority"
                      name="priority"
                      onChange={handlePriorityChange}
                      checked={priorityFilter}
                      className="mr-4 border-black bg-transparent accent-orange-500"
                    />
                  </div> */}
              </div>

              {isMapView ? (
                <>
                  <MapboxMap
                    setSelectedSchool={setSelectedSchool}
                    selectedSchool={selectedSchool}
                    schools={filteredSchools}
                  />
                  <div className="fixed bottom-0 left-0 right-0 z-10 m-4 rounded-2xl bg-white p-4 shadow-lg md:hidden">
                    <div className="align-center flex flex-col items-center gap-0 text-center">
                      <h1 className="text-lg font-medium">
                        {schoolCardPlaceholderTitle}
                      </h1>
                      <p className="text-md">{schoolCardPlaceholderText}</p>
                    </div>
                  </div>
                </>
              ) : (
                <MapList
                  setSelectedSchool={setSelectedSchool}
                  selectedSchool={selectedSchool}
                  schools={filteredSchools}
                  onModalOpen={openModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
