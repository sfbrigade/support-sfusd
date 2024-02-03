import HeadingContentWrapper from "../Material/HeadingContentWrapper";
import StatisticList from "../Material/StatisticList";

const StudentOutcomes = () => {
  const stats = [
    { number: "83%", text: "High school graduation rate" },
    { number: "56%", text: "Accepted into 4-year colleges" },
    { number: "68%", text: "Accepted into 2-year colleges" },
    { number: "11%", text: "SBAC English proficiency" },
    { number: "0%", text: "SBAC match Proficiency" },
  ];
  return (
    <section id="About">
      <HeadingContentWrapper
        heading="Student Outcomes"
        content={<StatisticList statistics={stats} />}
      />
    </section>
  );
};

export default StudentOutcomes;
