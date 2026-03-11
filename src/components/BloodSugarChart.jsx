import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function BloodSugarChart({ data }) {

  // 🔥 Safe timestamp formatter
  const formatTime = (timestamp) => {
    if (!timestamp) return "";

    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleTimeString();
    }

    return new Date(timestamp).toLocaleTimeString();
  };

  // 🔥 Oldest → Newest for better visual flow
  const sortedData = [...data].reverse();

  const chartData = {
    labels: sortedData.map((entry) =>
      formatTime(entry.timestamp)
    ),
    datasets: [
      {
        label: "Blood Sugar (mg/dL)",
        data: sortedData.map((entry) => entry.sugarLevel),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <Line data={chartData} />
    </div>
  );
}

export default BloodSugarChart;