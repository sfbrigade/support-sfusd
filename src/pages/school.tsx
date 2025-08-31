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
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SEO from "@/components/SEO";

const Profile: React.FC = () => {
  const router = useRouter();
  const { stub } = router.query;

  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (stub && typeof stub === 'string') {
      setLoading(true);
      setError(null);

      fetch(`/api/school/${stub}`)
      .then(res => {
        if(!res.ok) {
          throw new Error(res.status === 404 ? 'School not found' : 'Failed to load school');
        }
        return res.json();
      })
      .then(data => {
        setSchool(data.school);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      })
    } else {
        setError('School stub is required');
        setLoading(false);
    }
  }, [stub]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading school information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600 mb-2">School Not Found</h1>
          <p className="text-gray-500">The requested school could not be found.</p>
          <button 
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {school && (
        <>
          <SEO
            title={`Support SF Schools - ${school.name} Profile`}
            description={`Support SF Schools encourages the community to support ${school.name}. ${school.about} Learn more about ${school.name} and their available donation and volunteer opportunities.`}
          />
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
              {school.metrics.length ? (
                <SchoolStudentOutcomes school={school} />
              ) : (
                ""
              )}
              <SchoolVolunteer school={school} />
              <SchoolDonation school={school} />
              {school.testimonial && <SchoolTestimonial school={school} />}
              {school.noteable_video && (
                <iframe
                  height="340"
                  src={school.noteable_video}
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
        </>
      )}
    </>
  );
};
export default Profile;
