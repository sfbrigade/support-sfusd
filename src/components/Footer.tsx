import Image from "next/image";
import InstagramIcon from "../../public/icons/instagram-icon.svg";
import TwitterIcon from "../../public/icons/twitter-icon.svg";
import FacebookIcon from "../../public/icons/facebook-icon.svg";
import GlobeIcon from "../../public/icons/globe-icon.svg";
const Footer = () => {
  return (
    <footer className="bg-[#FFC627] p-8 font-medium text-sm">
      <ul className="flex flex-col gap-0.5">
        <li>
          <a href="">SupportSFschool.org</a>
        </li>
        <li>
          <a href="">About Us</a>
        </li>
        <li>
          <a href="">Contact Us</a>
        </li>
        <li>
          <a href="">Sitemap</a>
        </li>
      </ul>
      <div className="flex gap-2 mt-2 fill-gray-800">
        <a>
          <InstagramIcon className="fill-inherit" height="32" width="32" />
        </a>

        <a>
          <TwitterIcon className="fill-inherit" height="32" width="32" />
        </a>

        <a>
          <FacebookIcon className="fill-inherit" height="32" width="32" />
        </a>

        <a>
          <GlobeIcon className="fill-inherit" height="32" width="32" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
