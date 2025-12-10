const Statistic = (props: any) => {
  
  const { name, value, unit } = props;

  // Replace all occurrences of '|' with a newline character (stat name only)
  const formattedName = name.replaceAll("|", "\n");

  return (
    <div className="flex w-32 flex-col items-center">
      <h1 className="text-3xl font-semibold text-violet-700 md:text-5xl">
        {value}
        {unit}
      </h1>
      <p className="whitespace-pre-line text-center font-semibold text-pink-600">{formattedName}</p>
    </div>
  );
};

export default Statistic;
