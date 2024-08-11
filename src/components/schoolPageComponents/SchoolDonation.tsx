import { School } from "@/types/school";
import BannerWrapper from "./BannerWrapper";
import HeadingContentWrapper from "./HeadingContentWrapper";
import { blurDataURL } from "@/lib/imageConfig";
import Image from "next/image";

const SchoolDonation: React.FC<{ school: School }> = ({ school }) => {
  const otherDonations = school.programs.filter(
    (program) => program.category == "donate",
  );

  function formatDonationText() {
    const donation_text = school.profile ? school.profile.donation_text : "";
    const donation_txt_split = donation_text.split(":\n");
    if (donation_txt_split.length > 1) {
      const address_split = donation_txt_split[1].split("\n");
      return (
        <>
          {donation_txt_split[0]}:<br />
          <b>
            {address_split.map((a, i) => (
              <div key={i}>{a}</div>
            ))}
          </b>
        </>
      );
    } else {
      return donation_text;
    }
  }

  return (
    <div id="donate">
      <BannerWrapper
        left={
          <HeadingContentWrapper
            heading={"Donate"}
            content={
              <div className="flex flex-col gap-4">
                <p>{formatDonationText()}</p>
                {school.profile?.donation_url && (
                  <a
                    href={school.profile?.donation_url}
                    target="_blank"
                    className={
                      "plausible-event-name=Clicked+" +
                      school.name +
                      "+Main+Donate w-fit rounded bg-blue-500 p-2 px-8 font-medium text-white"
                    }
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
            placeholder="blur"
            blurDataURL={blurDataURL}
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
              heading={"Or donate through these other options"}
              content={
                <ul className="flex flex-col">
                  {otherDonations.map((donation, i) => (
                    <li key={i}>
                      {donation.url ? (
                        <a
                          href={donation.url}
                          target="_blank"
                          className={
                            "plausible-event-name=Clicked+" +
                            school.name +
                            "+" +
                            donation.name +
                            " underline underline-offset-4"
                          }
                        >
                          {donation.name}
                        </a>
                      ) : (
                        <p className="underline underline-offset-4">
                          {donation.name}
                        </p>
                      )}
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
