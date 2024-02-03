const Statistic = (props: any) => {
  const { number, text } = props;
  return (
    <div className="flex flex-col items-center w-32">
      <h1 className="text-3xl md:text-5xl font-semibold text-violet-700">
        {number}
      </h1>
      <p className="text-center text-pink-600 font-semibold">{text}</p>
    </div>
  );
};

export default Statistic;
