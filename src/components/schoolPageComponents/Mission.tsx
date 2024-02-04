import HeadingContentWrapper from "../shared/HeadingContentWrapper";

const Mission = () => {
  const innerContent = (
    <div className="md:text-lg">
      As a school for Social Justice serving predominantly working class
      communities of color, the mission of JJSE is not just to prepare students
      for college but also to prepare our graduates to be agents of positive
      change in the world. Our mission and vision is to prepare young people in
      three key areas: community, social justice, and independent thinkers.
    </div>
  );
  return (
    <section id="About">
      <HeadingContentWrapper heading="Our Mission" content={innerContent} />
    </section>
  );
};

export default Mission;
