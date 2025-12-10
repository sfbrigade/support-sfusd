import { Metric } from "@/types/school";
import Statistic from "./Statistic";

interface StatisticListProps {
  statistics: Metric[];
}

const StatisticList = ({ statistics }: StatisticListProps) => {
  return (
    <div className="flex flex-wrap gap-6 md:gap-12 ">
      {statistics.map((stat) => (
        <Statistic
          key={stat.name} // This is always unique within the array
          name={stat.name}
          value={stat.value}
          unit={stat.unit}
        />
      ))}
    </div>
  );
};

export default StatisticList;
