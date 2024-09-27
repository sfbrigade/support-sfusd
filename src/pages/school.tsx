import BannerWrapper from "@/components/schoolPageComponents/BannerWrapper";
import SchoolAbout from "@/components/schoolPageComponents/SchoolAbout";
import SchoolDonation from "@/components/schoolPageComponents/SchoolDonation";
import SchoolHeader from "@/components/schoolPageComponents/SchoolHeader";
import SchoolStudentOutcomes from "@/components/schoolPageComponents/SchoolStudentOutcomes";
import SchoolTestimonial from "@/components/schoolPageComponents/SchoolTestimonial";
import SchoolVolunteer from "@/components/schoolPageComponents/SchoolVolunteer";
import prisma from "@/lib/prisma";
import { School } from "@/types/school";
import { blurDataURL } from "@/lib/imageConfig";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export const getStaticProps: GetStaticProps = async (context) => {
  const schools = await prisma.school.findMany({
    include: {
      profile: true,
      metrics: true,
      programs: true,
    },
  });
  return { props: { schools } };
};

type Props = {
  schools: School[];
};

const Profile: React.FC<Props> = (props) => {
  const router = useRouter();
  const { name } = router.query;
  const { schools } = props;
  const school = schools.find((school) => school.name == name);

  return (
    <>
      {school && (
        <div>
          <div className="relative w-full">
            <Image
              className="relative h-64 w-full object-cover max-md:h-48"
              src={"/school_img/" + school.img}
              alt={school.name + " image"}
              width={2000}
              height={2000}
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </div>
          <div className="relative mx-auto flex flex-col gap-10 p-6 pt-2 md:py-20 lg:w-4/5 2xl:w-2/3">
            <Image
              className="z-1 absolute -top-20 h-32 w-32 rounded bg-white drop-shadow-lg md:-top-32 md:h-44 md:w-44"
              src={"/school_img/logo/" + school.img}
              alt={school.name + " logo"}
              width={1000}
              height={1000}
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
            <SchoolHeader school={school} />
            <SchoolAbout school={school} />
            {school.metrics.length ? (
              <SchoolStudentOutcomes school={school} />
            ) : (
              ""
            )}
            <SchoolVolunteer school={school} />
            <SchoolDonation school={school} />
            {school.profile?.testimonial && (
              <SchoolTestimonial school={school} />
            )}
            {school.profile?.noteable_video && (
              <iframe
                height="340"
                src={school.profile?.noteable_video}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full rounded-lg"
              ></iframe>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Profile;
