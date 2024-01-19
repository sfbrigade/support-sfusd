import Image from "next/image";

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
      <ul className="flex gap-2 mt-2">
        <li>
          <a href="">
            <Image
              src="/icons/instagram-icon.svg"
              alt="Arrow Icon"
              width={32}
              height={32}
            />
          </a>
        </li>
        <li>
          <a href="">
            <Image
              src="/icons/twitter-icon.svg"
              alt="Arrow Icon"
              width={32}
              height={32}
            />
          </a>
        </li>
        <li>
          {" "}
          <a href="">
            <Image
              src="/icons/facebook-icon.svg"
              alt="Arrow Icon"
              width={32}
              height={32}
            />
          </a>
        </li>
        <li>
          {" "}
          <a href="">
            <Image
              src="/icons/globe-icon.svg"
              alt="Arrow Icon"
              width={32}
              height={32}
            />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
