import Image from "next/image";

const Banner = ({
  onClose,
  children = null,
}: {
  onClose?: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex bg-[#FFDC7C] p-4 text-left text-base font-medium md:text-center">
      <div className="flex-1">{children}</div>
      <button onClick={onClose} className="ml-2">
        <Image
          src={`/circle_close.svg`}
          alt="Close Icon"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default Banner;
