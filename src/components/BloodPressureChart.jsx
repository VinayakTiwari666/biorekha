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

function BloodPressureChart({ data }) {

  // 🔥 Convert Firestore timestamp safely
  const formatTime = (timestamp) => {
    if (!timestamp) return "";

    // If Firestore Timestamp object
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleTimeString();
    }

    // If already JS Date
    return new Date(timestamp).toLocaleTimeString();
  };

  // 🔥 Reverse so chart shows oldest → newest
  const sortedData = [...data].reverse();

  const chartData = {
    labels: sortedData.map((entry) =>
      formatTime(entry.timestamp)
    ),
    datasets: [
      {
        label: "Systolic (mmHg)",
        data: sortedData.map((entry) => entry.systolic),
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        tension: 0.3,
      },
      {
        label: "Diastolic (mmHg)",
        data: sortedData.map((entry) => entry.diastolic),
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

export default BloodPressureChart;