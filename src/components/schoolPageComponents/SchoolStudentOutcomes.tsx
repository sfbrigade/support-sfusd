import { Metric } from "@/types/school";
import HeadingContentWrapper from "./HeadingContentWrapper";
import StatisticList from "./StatisticList";

const SchoolStudentOutcomes: React.FC<{ stats: Metric[] }> = ({ stats }) => {
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
