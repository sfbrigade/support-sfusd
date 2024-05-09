import BannerWrapper from "@/components/schoolPageComponents/BannerWrapper";
import SchoolAbout from "@/components/schoolPageComponents/SchoolAbout";
import SchoolHeader from "@/components/schoolPageComponents/SchoolHeader";
import SchoolStudentOutcomes from "@/components/schoolPageComponents/SchoolStudentOutcomes";
import prisma from "@/lib/prisma";
import { School } from "@/types/school";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export const getStaticProps: GetStaticProps = async (context) => {
  const schools = await prisma.school.findMany({
    include: {
      profile: true,
      metrics: true,
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
              src={"/" + school.img}
              alt={school.name + " image"}
              width={2000}
              height={2000}
            />
          </div>
          <div className="relative mx-auto flex flex-col gap-10 p-8 pt-2 md:pt-20 lg:w-4/5 2xl:w-2/3">
            <Image
              className="z-1 absolute -top-20 h-32 w-32 rounded drop-shadow-lg md:-top-32 md:h-44 md:w-44"
              src={"/" + school.img}
              alt={school.name + " logo"}
              width={1000}
              height={1000}
            />
            <SchoolHeader school={school} />
            <SchoolAbout school={school} />
            {school.metrics.length && <SchoolStudentOutcomes school={school} />}
            <BannerWrapper
              className=" gap-10 rounded-lg md:bg-[#FFF5DA] md:p-8 md:px-12 "
              left={
                <div>
                  <Image
                    src="/volunteer-graphic.png"
                    alt="volunteer graphic"
                    width={500}
                    height={1000}
                  />
                </div>
              }
              right={
                <div className="flex flex-col gap-4">
                  <h1 className="text-2xl font-medium text-blue-500 md:text-5xl">
                    Volunteer today!
                  </h1>
                  <p>
                    {school.name} values community volunteers and has volunteer
                    needs and opportunities throughout the school year. You can
                    sign up to volunteer through the San Francisco Ed Fund or
                    fill out this form to connect directly with the school.
                  </p>
                  <div className="flex gap-2">
                    <button className="rounded bg-blue-500 p-2 px-4 font-medium text-white md:px-8">
                      Fill out form
                    </button>
                    <button className="rounded border-2 border-blue-500 bg-white p-2 px-4 font-medium text-blue-500 md:px-8">
                      Contact SF Ed Fund
                    </button>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Profile;
