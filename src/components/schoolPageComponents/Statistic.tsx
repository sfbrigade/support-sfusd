const Statistic = (props: any) => {
  const { name, value, unit } = props;
  return (
    <div className="flex w-32 flex-col items-center">
      <h1 className="text-3xl font-semibold text-violet-700 md:text-5xl">
        {value}
        {unit}
      </h1>
      <p className="text-center font-semibold text-pink-600">{name}</p>
    </div>
  );
};

export default Statistic;
