"use client";

import SchoolAbout from "@/components/schoolPageComponents/SchoolAbout";
import SchoolDonation from "@/components/schoolPageComponents/SchoolDonation";
import SchoolHeader from "@/components/schoolPageComponents/SchoolHeader";
import SchoolStudentOutcomes from "@/components/schoolPageComponents/SchoolStudentOutcomes";
import SchoolTestimonial from "@/components/schoolPageComponents/SchoolTestimonial";
import SchoolVolunteer from "@/components/schoolPageComponents/SchoolVolunteer";
import { School } from "@/types/school";
import { blurDataURL } from "@/lib/imageConfig";
import Image from "next/image";

type Props = {
  school: School;
};

export default function SchoolPageClient({ school }: Props) {
  const studentOutcomes = school.metrics?.filter(
    ({ category }) => category === "outcome",
  );

  return (
    <div>
      <div className="relative w-full">
        <Image
          className="relative h-64 w-full object-cover max-md:h-48"
          src={`/school-images/full/${school.stub}.webp`}
          alt={school.name + " image"}
          width={800}
          height={400}
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>
      <div className="relative mx-auto flex flex-col gap-10 p-6 pt-2 md:py-20 lg:w-4/5 2xl:w-2/3">
        <Image
          className="z-1 absolute -top-20 h-32 w-32 rounded bg-white drop-shadow-lg md:-top-32 md:h-44 md:w-44"
          src={`/school-images/logo/${school.stub}.webp`}
          alt={school.name + " logo"}
          width={400}
          height={400}
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
        <SchoolHeader school={school} />
        <SchoolAbout school={school} />
        {studentOutcomes.length > 0 && (
          <SchoolStudentOutcomes stats={studentOutcomes} />
        )}
        <SchoolVolunteer school={school} />
        <SchoolDonation school={school} />
        {school.testimonial && <SchoolTestimonial school={school} />}
        // If there's no issue with PostHog/Vercel/Prisma could we structure replace the typos? Reach out to Brandon
        {school.notable_video && (
          <iframe
            height="340"
            src={school.notable_video}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full rounded-lg border-0"
          ></iframe>
        )}
      </div>
    </div>
  );
}