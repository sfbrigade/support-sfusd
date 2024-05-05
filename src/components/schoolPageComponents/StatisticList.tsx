import Statistic from "./Statistic";

const StatisticList = (props: any) => {
  const { statistics } = props;
  return (
    <div className="mt-6 flex flex-wrap gap-6 max-md:justify-center md:gap-12 ">
      {statistics.map(
        (stat: any) =>
          stat.number &&
          stat.text && (
            <Statistic key={stat.text} number={stat.number} text={stat.text} />
          ),
      )}
    </div>
  );
};

export default StatisticList;
