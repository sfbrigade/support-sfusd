import { School } from "@/types/school";
import HeadingContentWrapper from "./HeadingContentWrapper";
import Statistic from "./Statistic";
import StatisticList from "./StatisticList";

const SchoolAbout: React.FC<{ school: School }> = ({ school }) => {
  const stats = school.metrics.filter((metric) => metric.category == "about");

  const innerContent = (
    <div>
      {school.profile && (
        <>
          <div className="md:text-lg">{school.profile.about}</div>
          <ul className="ml-4 mt-6 list-disc md:text-lg">
            {school.profile.about_bp.map((bullet: string, i: number) => (
              <li key={i} className="ml-2">
                {bullet}
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="mt-6">
        <StatisticList statistics={stats} />
      </div>
    </div>
  );
  return (
    <section id="About">
      <HeadingContentWrapper heading="About" content={innerContent} />
    </section>
  );
};

export default SchoolAbout;
