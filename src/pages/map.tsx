import React, { useEffect, useState } from "react";
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
import Link from "next/link";
import HighPriorityModal from "@/components/HighPriorityModal";
import { useMapContext } from "../contexts/MapContext";
import SEO from "@/components/SEO";
import { SchoolType } from "@prisma/client";
import FilterBySchoolType from "../components/FilterBySchoolType";

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
const schoolCardPlaceholderText =
  "All schools are looking for volunteers and donations. Click on the school closest to you to learn more.";

const Map: React.FC<Props> = (props) => {
  const { isMapView, selectedSchool, setIsMapView, setSelectedSchool } =
    useMapContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSchoolTypes, setSelectedSchoolTypes] = useState<SchoolType[]>(
    [],
  );
  const [filteredSchools, setFilteredSchools] = useState(props.schools);
  const [priorityFilter, setPriorityFilter] = useState(false);

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

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const setToggle = () => {
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

        {/* Top Bar with Search and Toggle Button */}
        <div className="top-16 z-10 flex justify-center gap-2 border-t-4 border-[#D7F1FF] bg-[#D7F1FF] pt-1 max-md:sticky max-md:w-full max-md:flex-col max-md:px-4 max-md:pb-4 md:hidden md:justify-end">
          <SearchBar onItemSelect={itemSelect} onSearch={handleSchoolSearch} />
          <ToggleButton isMapView={isMapView} toggleView={setToggle} />
        </div>

        {/* Main Content Area */}
        <div
          className={`relative mx-auto flex h-auto flex-col overflow-auto md:h-[calc(100vh-64px)] md:gap-4 md:p-8 lg:w-10/12 2xl:w-2/3 ${isMapView ? " w-full flex-1" : ""}`}
        >
          <div className="flex h-full w-full grid-cols-10 flex-row-reverse items-center justify-center gap-4 md:grid md:w-auto md:flex-col">
            {/* School Card or Placeholder */}
            <div
              className={`col-span-4 ${isMapView && selectedSchool ? "p-0" : "p-2 md:p-0"}  ${isMapView && selectedSchool !== null ? "flex" : "hidden"} absolute bottom-0 left-0 right-0 z-50 m-4 flex h-fit items-center justify-center rounded-2xl bg-white md:static md:m-0 md:flex md:h-full`}
            >
              {isMapView ? (
                selectedSchool ? (
                  <div className="w-full md:w-auto">
                    <Link
                      href={
                        "/school?name=" +
                        encodeURIComponent(selectedSchool.name)
                      }
                      className="block md:hidden"
                      passHref
                    >
                      <SelectedSchoolCard school={selectedSchool} />
                    </Link>
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
            <div className="relative flex h-full w-full flex-col gap-2 overflow-auto md:col-span-6 md:gap-4">
              <div className="flex justify-center gap-2 bg-[#D7F1FF] max-md:hidden md:justify-end">
                <ToggleButton isMapView={isMapView} toggleView={setToggle} />
              </div>
              <div className="max-md:hidden">
                <SearchBar
                  onItemSelect={itemSelect}
                  onSearch={handleSchoolSearch}
                />
              </div>

              <div>
                <FilterBySchoolType
                  selectedSchoolTypes={selectedSchoolTypes}
                  setSelectedSchoolTypes={setSelectedSchoolTypes}
                  handleSchoolTypeSelection={handleSchoolTypeSelection}
                />
                <label>Priority</label>
                <input
                  type="checkbox"
                  id="priority"
                  name="priority"
                  onChange={handlePriorityChange}
                  checked={priorityFilter}
                  className="border-black bg-transparent"
                />
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
