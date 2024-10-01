// DiscountsTimeline.tsx
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

const DiscountsTimelineDiagram: React.FC = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Discounts Applied",
        data: [100, 200, 150, 300, 250, 400],
        fill: false,
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
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
        text: "Discounts Applied Over Time",
      },
    },
  };

  return (
    <div>
      <h2>Discounts Timeline</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default DiscountsTimelineDiagram;
