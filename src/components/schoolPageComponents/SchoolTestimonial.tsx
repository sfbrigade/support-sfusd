import { School } from "@/types/school";
import HeadingContentWrapper from "./HeadingContentWrapper";
import BannerWrapper from "./BannerWrapper";
import Image from "next/image";

const SchoolTestimonial: React.FC<{ school: School }> = ({ school }) => {
  function getTestimonialGraphic(school: School) {
    if (school.profile?.testimonial_video) {
      return (
        <iframe
          height="315"
          src={school.profile?.testimonial_video}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full rounded-lg"
        ></iframe>
      );
    } else if (school.profile?.testimonial_img) {
      return (
        <Image
          src={school.profile.testimonial_img}
          alt="testimonial image"
          className="w-full rounded-lg"
          width={500}
          height={1000}
        />
      );
    } else {
      return null;
    }
  }

  return (
    <BannerWrapper
      left={getTestimonialGraphic(school)}
      right={
        <HeadingContentWrapper
          heading={"Testimonial"}
          content={
            <div>
              <p>{school.profile?.testimonial}</p>
              {school.profile?.testimonial_author && (
                <h2 className="mt-2 text-xl font-medium text-[#8338EC]">
                  {school.profile.testimonial_author}
                </h2>
              )}
            </div>
          }
        />
      }
      className=" justify-between gap-4 md:gap-8"
    />
  );
};

export default SchoolTestimonial;
