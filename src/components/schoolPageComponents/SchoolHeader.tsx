import Image from "next/image";
import { School } from "@/types/school";

type Props = {
  school: School;
};

export default function SchoolHeader({ school }: Props) {
  const ICON_SIZE = 36;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4 max-md:flex-col-reverse">
        <h1
          className="text-3xl font-medium text-pink-600 max-md:w-full md:text-5xl"
          style={{ marginBlock: 0 }}
        >
          {school.name}
        </h1>
        {/* hide socials if not exist */}
        <div className="flex justify-end gap-3 max-md:w-full">
          {school && (
            <>
              {school.instagram_url && (
                <a href={school.instagram_url} target="_blank">
                  <Image
                    src="/icons/instagram-icon.svg"
                    alt="Instagram Icon"
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    style={{ width: ICON_SIZE, height: ICON_SIZE }}
                  />
                </a>
              )}
              {school.facebook_url && (
                <a href={school.facebook_url} target="_blank">
                  <Image
                    src="/icons/facebook-icon.svg"
                    alt="Facebook Icon"
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    style={{ width: ICON_SIZE, height: ICON_SIZE }}
                  />
                </a>
              )}
              {school.website_url && (
                <a href={school.website_url} target="_blank">
                  <Image
                    src="/icons/globe-icon.svg"
                    alt="Globe Icon"
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    style={{ width: ICON_SIZE, height: ICON_SIZE }}
                  />
                </a>
              )}
            </>
          )}
        </div>
      </div>

      <div className="flex w-full max-md:flex-col md:items-end">
        <h2
          className="text:xl mr-2.5 font-medium text-pink-600 md:text-2xl"
          style={{ marginBlock: 0 }}
        >
          {school.neighborhood}
        </h2>
        <p>{school.address}</p>
      </div>

      {/* hide buttons if link doesn't exist*/}
      <div className="flex gap-2">
        <a
          href="#volunteer"
          className="rounded bg-blue-500 p-2 px-8 font-medium text-white"
        >
          Volunteer
        </a>
        <a
          href="#donate"
          className="rounded border-2 border-blue-500 p-2 px-8 font-medium text-blue-500"
        >
          Donate
        </a>
      </div>
    </div>
  );
}
