import Statistic from "./Statistic";

const StatisticList = (props: any) => {
  const { statistics } = props;
  return (
    <div className="flex flex-wrap gap-6 md:gap-12 mt-6 max-md:justify-center ">
      {statistics.map(
        (stat: any) =>
          stat.number &&
          stat.text && <Statistic number={stat.number} text={stat.text} />
      )}
    </div>
  );
};

export default StatisticList;
