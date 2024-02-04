import Button from "../shared/Button";
import CardList from "../shared/CardList";
import HeadingContentWrapper from "../shared/HeadingContentWrapper";

const Volunteer = () => {
  const volunteerList = [
    {
      title: "Math Tutors",
      description:
        "Our students need help in this subject now more than ever before. A strong commitment can make a huge lifetime change. A strong commitment can make a huge lifetime change. A strong commitment can make a huge lifetime change.",
    },
    {
      title: "Event Volunteers",
      description:
        "Participate in community gatherings which cultivate joy and a positive school culture.",
    },
    {
      title: "Remotely Friendly Tasks",
      description: "Volunteer from home!",
    },
    {
      title: "remotely Friendly Tasks",
      description: "Volunteer from home!",
    },
    {
      title: "remotely Friendly Tasks",
      description: "Volunteer from home!",
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="grid md:grid-cols-2 gap-4 auto-rows-auto">
        <div className="border-2 border-black h-auto">pic filler</div>
        <div className="flex flex-col gap-4">
          <h1 className="text-blue-500 font-medium text-2xl md:text-5xl">
            Volunteer today!
          </h1>
          <p>
            June Jordan values community volunteers and has volunteer needs and
            opportunities throughout the school year. You can sign up to
            volunteer through the San Francisco Ed Fund or fill out this form to
            connect directly with the school.
          </p>
          <div className="flex gap-2">
            <Button style="Primary" text="Fill out form" className="w-36" />
            <Button style="Secondary" text="Contact SF Ed Fund" className="" />
          </div>
        </div>
      </div>

      <HeadingContentWrapper
        heading="Opportunities to volunteer, short & long term"
        content={<CardList cards={volunteerList} />}
      />
    </div>
  );
};

export default Volunteer;
