import { Program, School } from "@/types/school";
import HeadingContentWrapper from "./HeadingContentWrapper";
import CardList from "./CardList";

const VolunteerList: React.FC<{ school: School; fullCard?: boolean }> = ({
  school,
  fullCard = true,
}) => {
  type volunteer = {
    title: string;
    description: string;
    img?: string;
  };

  const volunteerList: volunteer[] = school.programs.reduce(
    (acc: volunteer[], program: Program) => {
      if (program.category == "volunteer") {
        const volunteer: volunteer = {
          title: program.name,
          description: program.details,
          img: program.img,
        };
        acc.push(volunteer);
      }
      return acc;
    },
    [],
  );
  return (
    <>
      {volunteerList.length > 0 && fullCard && (
        <HeadingContentWrapper
          heading="Opportunities to volunteer, short & long term"
          content={<CardList cards={volunteerList} />}
        />
      )}
      {volunteerList.length > 0 && !fullCard && (
        <div className="mb-4 mt-3 hidden md:block">
          <h1 className="mb-1 text-xl font-medium text-blue-500">
            Volunteer Opportunities
          </h1>
          <ul className="mx-5 list-disc">
            {volunteerList.map((opportunity) => (
              <li key={opportunity.title}>{opportunity.title}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default VolunteerList;
