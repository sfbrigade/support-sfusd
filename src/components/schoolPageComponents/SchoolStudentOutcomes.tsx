import { School } from "@/types/school";
import HeadingContentWrapper from "./HeadingContentWrapper";
import StatisticList from "./StatisticList";

const SchoolStudentOutcomes: React.FC<{ school: School }> = ({ school }) => {
  const stats = school.metrics.map((m) => ({
    number: m.percentage + "%",
    text: m.name,
  }));
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
