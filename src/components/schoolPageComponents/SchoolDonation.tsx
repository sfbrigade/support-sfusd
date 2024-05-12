import { School } from "@/types/school";
import BannerWrapper from "./BannerWrapper";
import HeadingContentWrapper from "./HeadingContentWrapper";
import Image from "next/image";

const SchoolDonation: React.FC<{ school: School }> = ({ school }) => {
  const otherDonations = school.programs.filter(
    (program) => program.category == "donate",
  );

  return (
    <div id="donate">
      <BannerWrapper
        left={
          <HeadingContentWrapper
            heading={"Donate"}
            content={
              <div className="flex flex-col gap-4">
                <p>{school.profile?.donation_text}</p>
                {school.profile?.donation_url && (
                  <a
                    href={school.profile?.donation_url}
                    target="_blank"
                    className="w-fit rounded bg-blue-500 p-2 px-8 font-medium text-white"
                  >
                    Donate
                  </a>
                )}
              </div>
            }
            size="text-5xl"
          />
        }
        right={
          <Image
            src="/donation-graphic.png"
            alt="donation graphic"
            width={500}
            height={1000}
          />
        }
        className={
          "gap-4 bg-[#D7F1FF] p-8 md:gap-8 md:px-16 " +
          (otherDonations.length > 0 ? "rounded-t-lg" : "rounded-lg")
        }
      />
      {otherDonations.length > 0 && (
        <BannerWrapper
          left={
            <HeadingContentWrapper
              heading={"Or donate through any of our partners"}
              content={
                <ul className="flex flex-col">
                  {otherDonations.map((donation, i) => (
                    <li key={i}>
                      <a
                        href={donation.url}
                        target="_blank"
                        className="underline underline-offset-4"
                      >
                        {donation.name}
                      </a>
                    </li>
                  ))}
                </ul>
              }
            />
          }
          className=" gap-10 rounded-b-lg bg-[#FFF5DA] p-8 md:px-16 "
        />
      )}
    </div>
  );
};

export default SchoolDonation;
