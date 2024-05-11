const BannerWrapper: React.FC<{
  left: any;
  right?: any;
  className?: string;
}> = ({ left, right, className = "" }) => {
  return (
    <div className={`flex items-center max-md:flex-col ` + className}>
      <div className="flex-1">{left}</div>
      <div className="flex-1">{right}</div>
    </div>
  );
};

export default BannerWrapper;
