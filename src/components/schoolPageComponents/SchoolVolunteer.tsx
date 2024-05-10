import { Program, School } from "@/types/school";
import Image from "next/image";
import BannerWrapper from "./BannerWrapper";
import Link from "next/link";
import HeadingContentWrapper from "./HeadingContentWrapper";
import CardList from "./CardList";

const SchoolVolunteer: React.FC<{ school: School }> = ({ school }) => {
  // const volunteerList = [
  //   {
  //     title: "Math Tutors",
  //     description:
  //       "Our students need help in this subject now more than ever before. A strong commitment can make a huge lifetime change. A strong commitment can make a huge lifetime change. A strong commitment can make a huge lifetime change.",
  //   },
  //   {
  //     title: "Event Volunteers",
  //     description:
  //       "Participate in community gatherings which cultivate joy and a positive school culture.",
  //   },
  //   {
  //     title: "Remotely Friendly Tasks",
  //     description: "Volunteer from home!",
  //   },
  // ];
  interface volunteer {
    title: string;
    description: string;
  }

  const volunteerList: volunteer[] = school.programs.reduce(
    (acc: volunteer[], program: Program) => {
      if (program.category == "volunteer") {
        const volunteer: volunteer = {
          title: program.name,
          description: program.details,
        };
        acc.push(volunteer);
      }
      return acc;
    },
    [],
  );

  console.log(volunteerList);

  return (
    <section id="volunteer" className="flex flex-col gap-10">
      <BannerWrapper
        className=" gap-10 rounded-lg md:bg-[#FFF5DA] md:p-8 md:px-12 "
        left={
          <div>
            <Image
              src="/volunteer-graphic.png"
              alt="volunteer graphic"
              width={500}
              height={1000}
            />
          </div>
        }
        right={
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-medium text-blue-500 md:text-5xl">
              Volunteer today!
            </h1>
            <p>
              {school.name} values community volunteers and has volunteer needs
              and opportunities throughout the school year. You can sign up to
              volunteer through the San Francisco Ed Fund or fill out this form
              to connect directly with the school.
            </p>
            <div className="flex gap-2">
              <Link
                href={school.profile ? school.profile.volunteer_form_url : ""}
                target="_blank"
                className="rounded bg-blue-500 p-2 px-4 font-medium text-white md:px-8"
              >
                Fill out form
              </Link>
              <Link
                href="https://sfedfund.org/become-a-volunteer/"
                target="_blank"
                className="rounded border-2 border-blue-500 bg-white p-2 px-4 font-medium text-blue-500 md:px-8"
              >
                Contact SF Ed Fund
              </Link>
            </div>
          </div>
        }
      />

      <HeadingContentWrapper
        heading="Opportunities to volunteer, short & long term"
        content={<CardList cards={volunteerList} />}
      />
    </section>
  );
};

export default SchoolVolunteer;
