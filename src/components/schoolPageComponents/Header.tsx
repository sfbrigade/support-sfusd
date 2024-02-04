import Image from "next/image";
import InstagramIcon from "../../../public/icons/instagram-icon.svg";
import TwitterIcon from "../../../public/icons/twitter-icon.svg";
import FacebookIcon from "../../../public/icons/facebook-icon.svg";
import GlobeIcon from "../../../public/icons/globe-icon.svg";
import Button from "../shared/Button";

const Header = (props: any) => {
  const { school } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end gap-4 flex-wrap">
        <h1
          className="text-4xl md:text-6xl text-pink-600 font-medium"
          style={{ marginBlock: 0 }}
        >
          {school.name}
        </h1>
        {/* hide socials if not exist */}
        <div className="flex gap-2 fill-blue-500">
          <a>
            <InstagramIcon className="fill-inherit" height="30" width="30" />
          </a>
          <a>
            <TwitterIcon className="fill-inherit" height="30" width="30" />
          </a>
          <a>
            <FacebookIcon className="fill-inherit" height="30" width="30" />
          </a>
          <a>
            <GlobeIcon className="fill-inherit" height="30" width="30" />
          </a>
        </div>
      </div>

      <div className="w-full flex md:items-end max-md:flex-col">
        <h1
          className="text:xl md:text-2xl text-pink-600 font-medium mr-2.5"
          style={{ marginBlock: 0 }}
        >
          {school.district}
        </h1>
        <p>{school.address}</p>
      </div>

      {/* hide buttons if link doesn't exist*/}
      <div className="flex gap-2">
        <Button style="Primary" text="Volunteer" className="w-36" />
        <Button style="Secondary" text="Donate" className="w-36" />
      </div>
    </div>
  );
};

export default Header;
