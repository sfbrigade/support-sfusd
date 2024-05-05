import HeadingContentWrapper from "./HeadingContentWrapper";
import Statistic from "./Statistic";
import StatisticList from "./StatisticList";

const SchoolAbout = (props: any) => {
  const { school } = props;

  const stats = [
    { number: school.students, text: "Students Enroled" },
    { number: school.free_reduced_lunch, text: "Free/Reduced Lunch" },
    { number: school.ell, text: "English Language Learners" },
    { number: "28%", text: "Students with Special Needs" },
  ];

  const innerContent = (
    <div>
      <ul className="ml-4 list-disc md:text-lg">
        <li>
          <a href="https://www.cde.ca.gov/sp/eo/as/faqs.asp">
            Alternative school by choice
          </a>
          in San Francisco&#39;s Excelsior neighborhood.
        </li>
        <li>
          Named after activist June Jordan, the school&#39;s three pillars are
          Community, Social Justice, and Independent Thinkers
        </li>
        <li>
          Founded through community organizing by a group of teachers, parents,
          and youth.
        </li>
        <li>
          Engages with southeast San Francisco communities, aligned with social
          justice movement.
        </li>
        <li>
          Aims to prepare students for college while preserving community
          traditions.
        </li>
      </ul>
      <StatisticList statistics={stats} />
    </div>
  );
  return (
    <section id="About">
      <HeadingContentWrapper heading="About" content={innerContent} />
    </section>
  );
};

export default SchoolAbout;
