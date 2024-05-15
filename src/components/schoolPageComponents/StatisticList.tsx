import Statistic from "./Statistic";

const StatisticList = (props: any) => {
  const { statistics } = props;
  return (
    <div className=" flex flex-wrap gap-6 max-md:justify-center md:gap-12 ">
      {statistics.map((stat: any) => (
        <Statistic
          key={stat.text}
          name={stat.name}
          value={stat.value}
          unit={stat.unit}
        />
      ))}
    </div>
  );
};

export default StatisticList;
