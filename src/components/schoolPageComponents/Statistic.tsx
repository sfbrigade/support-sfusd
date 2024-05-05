const Statistic = (props: any) => {
  const { number, text } = props;
  return (
    <div className="flex w-32 flex-col items-center">
      <h1 className="text-3xl font-semibold text-violet-700 md:text-5xl">
        {number}
      </h1>
      <p className="text-center font-semibold text-pink-600">{text}</p>
    </div>
  );
};

export default Statistic;
