// SalesDiagram.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesDiagram: React.FC = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"], 
    datasets: [
      {
        label: "Sales in 2024", 
        data: [12000, 19000, 30000, 5000, 20000, 30000], 
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
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
        text: "Sales during 2024",
      },
    },
  };

  return (
    <div>
      <h2>Sales Diagram</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesDiagram;
