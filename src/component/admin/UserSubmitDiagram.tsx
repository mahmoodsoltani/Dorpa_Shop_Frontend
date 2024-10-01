// UsersSubmitted.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UsersSubmittedDiagram: React.FC = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Users Submitted in 2024",
        data: [500, 700, 900, 400, 600, 1000],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "User Submissions during 2024",
      },
    },
  };

  return (
    <div>
      <h2>User Submissions</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default UsersSubmittedDiagram;
