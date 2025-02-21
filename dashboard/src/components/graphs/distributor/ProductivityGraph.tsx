import { Bar } from "react-chartjs-2";

interface SalesmanProductivityProps {
  data: { date: string; salesman: string; visits: number }[];
}

const SalesmanProductivity = ({ data }: SalesmanProductivityProps) => {
  const groupedData: { [key: string]: { [key: string]: number } } = {};
  data.forEach((entry) => {
    if (!groupedData[entry.date]) {
      groupedData[entry.date] = {};
    }
    groupedData[entry.date][entry.salesman] = entry.visits;
  });

  const dates = Object.keys(groupedData);
  const salesmen = [...new Set(data.map((entry) => entry.salesman))];

  const datasets = salesmen.map((salesman) => ({
    label: salesman,
    data: dates.map((date) => groupedData[date][salesman] || 0),
    backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`,
  }));

  const chartData = {
    labels: dates,
    datasets,
  };

  return (
    <div>
      <h3>Salesman Productivity Over Time</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default SalesmanProductivity;
