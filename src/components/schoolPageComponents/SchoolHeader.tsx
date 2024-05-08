import Image from "next/image";
import InstagramIcon from "../../../public/icons/instagram-icon.svg";
import TwitterIcon from "../../../public/icons/twitter-icon.svg";
import FacebookIcon from "../../../public/icons/facebook-icon.svg";
import GlobeIcon from "../../../public/icons/globe-icon.svg";
import { School } from "@/types/school";

type Props = {
  school: School;
};

export default function SchoolHeader({ school }: Props) {
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
        <div className="flex justify-end gap-3 fill-blue-500 max-md:w-full">
          <a>
            <InstagramIcon className="fill-inherit" height="36" width="36" />
          </a>
          <a>
            <FacebookIcon className="fill-inherit" height="36" width="36" />
          </a>
          <a>
            <GlobeIcon className="fill-inherit" height="36" width="36" />
          </a>
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
        <button className="rounded bg-blue-500 p-1 px-4 font-semibold text-white">
          Volunteer
        </button>
        <button className="rounded border-2 border-blue-500 p-1 px-4 font-semibold text-blue-500">
          Donate
        </button>
      </div>
    </div>
  );
}
