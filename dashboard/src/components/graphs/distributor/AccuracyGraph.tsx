import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

interface DataEntry {
  date: string;
  accuracy: number;
}

interface AccuracyOverTimeProps {
  data: DataEntry[];
}

const AccuracyOverTime = ({ data }: AccuracyOverTimeProps) => {
  const formattedLabels = data.map((entry) =>
    new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
  );

  const chartData = {
    labels: formattedLabels,
    datasets: [
      {
        label: "Accuracy (%)",
        data: data.map((entry) => entry.accuracy),
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#4CAF50",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
        pointRadius: 4,
        pointHoverBackgroundColor: "#388E3C",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#333",
          font: {
            size: 14,
            weight: 700,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `Accuracy: ${tooltipItem.raw}%`,
          title: (tooltipItems: any) => `Date: ${data[tooltipItems[0].dataIndex].date}`,
        },
        backgroundColor: "#222",
        titleColor: "#fff",
        bodyColor: "#fff",
        cornerRadius: 6,
        padding: 10,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#555",
          font: {
            size: 12,
          },
          autoSkip: false, // Ensure all labels are shown
          maxRotation: 45, // Rotate labels if necessary
          minRotation: 0,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#555",
          font: {
            size: 12,
          },
          callback: (value: any) => `${value}%`,
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
          borderDash: [5, 5],
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">📊 Accuracy Over Time</h3>
      <div className="h-64">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default AccuracyOverTime;
