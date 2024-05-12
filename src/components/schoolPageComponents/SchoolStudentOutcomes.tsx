import { School } from "@/types/school";
import HeadingContentWrapper from "./HeadingContentWrapper";
import StatisticList from "./StatisticList";

const SchoolStudentOutcomes: React.FC<{ school: School }> = ({ school }) => {
  const stats = school.metrics.filter((metric) => metric.category == "outcome");
  return (
    <section id="StudentOutcomes">
      <HeadingContentWrapper
        heading="Student Outcomes"
        content={<StatisticList statistics={stats} />}
      />
    </section>
  );
};

export default SchoolStudentOutcomes;
