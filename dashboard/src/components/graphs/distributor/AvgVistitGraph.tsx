import { Line } from "react-chartjs-2";

interface DataEntry {
  date: string;
  avgDuration: number;
}

interface AverageVisitDurationProps {
  data: DataEntry[];
}

const AverageVisitDuration = ({ data }: AverageVisitDurationProps) => {
  const chartData = {
    labels: data.map((entry) => entry.date),
    datasets: [
      {
        label: "Average Visit Duration (min)",
        data: data.map((entry) => entry.avgDuration),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div>
      <h3>Average Visit Duration Over Time</h3>
      <Line data={chartData} />
    </div>
  );
};

export default AverageVisitDuration;
