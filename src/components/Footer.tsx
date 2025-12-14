import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#FFC627] p-8 text-sm font-medium">
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
      <div className="mt-2 flex gap-2 fill-gray-800">
        <a>
          <Image
            src="/icons/instagram-icon.svg"
            alt="Instagram Icon"
            width={32}
            height={32}
          />
        </a>
        <a>
          <Image
            src="/icons/facebook-icon.svg"
            alt="Facebook Icon"
            width={32}
            height={32}
          />
        </a>

        <a>
          <Image
            src="/icons/globe-icon.svg"
            alt="Globe Icon"
            width={32}
            height={32}
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
