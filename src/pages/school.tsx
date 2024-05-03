import prisma from "@/lib/prisma";
import { School } from "@/types/school";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export const getStaticProps: GetStaticProps = async () => {
  const schools = await prisma.school.findMany();
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
  console.log(school);
  
  
  return (<>
    {school && (
      <div>
        <div className="relative w-full">
          <Image
            className="relative w-full h-64 object-cover"
            src={"/" + school.img}
            alt={school.name + " image"}
            width={1000}
            height={1000}
          />
          

          <Image
            className="absolute max-md:top-40 top-32 left-2/4 max-md:-translate-x-2/4 md:left-20 z-1 w-32 h-32 md:w-40 md:h-40 rounded drop-shadow-lg"
            src={"/" + school.img}
            alt={school.name + " logo"}
            width={1000}
            height={1000}
          />
        </div>
        <div className="p-8 max-md:mt-8 md:p-24 flex flex-col gap-10">
          {/* <Header school={school} />
          <About school={school} />
          <Mission />
          <StudentOutcomes />
          <Volunteer /> */}
        </div>
      </div>
    )}
  </>)
};
export default Profile;

