const Banner = ({ children = null }: { children?: React.ReactNode }) => {
  return (
    <div className="bg-[#FFDC7C] p-4 text-left text-base font-medium md:text-center">
      {children}
    </div>
  );
};

export default Banner;
