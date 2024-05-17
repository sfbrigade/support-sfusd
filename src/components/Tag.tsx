import Image from "next/image";

// TODO: make this a more generic component
const Tag = ({ children = null }: { children?: React.ReactNode }) => {
  return (
    <span className="inline-flex rounded-md bg-[#FFE7D1] px-3 py-1 text-xs font-semibold text-[#FF7700]">
      <Image
        alt="High priority icon"
        src="/circle_priority.svg"
        width={16}
        height={17}
        className="mr-2"
      ></Image>
      <span className="flex-1">High Priority</span>
      {children}
    </span>
  );
};

export default Tag;
