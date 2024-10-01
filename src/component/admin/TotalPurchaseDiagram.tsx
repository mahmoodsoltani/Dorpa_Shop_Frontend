import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend, Title);

const TotalPurchasesDiagram: React.FC = () => {
  const data = {
    labels: ["Bike", "Clothing", "Accessory", "Part", "Other"],
    datasets: [
      {
        label: "# of Purchases",
        data: [1200, 900, 1500, 700, 500],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "left" as const, // Explicitly type position as "left"
        labels: {
          usePointStyle: true,
          boxWidth: 15,
        },
      },
      title: {
        display: false, // Disable the Chart.js title so we can use a custom title
      },
    },
  };

  return (
    <div style={{ position: "relative", width: "600px", height: "400px" }}>
      <h2
        style={{
          position: "absolute",
          top: "5%",
          left: "20%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          color: "black",
          fontSize: "24px",
          pointerEvents: "none",
        }}
      >
        Total Purchases by <br />
        Category
      </h2>
      <div style={{ width: "100%", height: "100%" }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default TotalPurchasesDiagram;
