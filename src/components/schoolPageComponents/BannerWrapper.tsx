const BannerWrapper = (props: any) => {
  const { left, right, className } = props;
  return (
    <div className={`flex items-center max-md:flex-col ` + className}>
      <div className="flex-1">{left}</div>
      <div className="flex-1">{right}</div>
    </div>
  );
};

export default BannerWrapper;
