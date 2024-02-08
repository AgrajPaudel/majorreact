import React from "react";
import { Bar } from "react-chartjs-2";

const colors = [
  "rgb(75, 192, 192)",
  "rgb(255, 99, 132)",
  "rgb(150, 19, 72)",
  "rgb(255, 193, 7)",
  "rgb(54, 162, 235)",
  "rgb(153, 102, 255)",
  "rgb(255, 87, 34)",
  "rgb(123, 31, 162)",
  "rgb(33, 150, 243)",
  "rgb(139, 195, 74)",
  "rgb(255, 61, 61)",
  "rgb(0, 188, 212)",
  "rgb(255, 152, 0)",
  "rgb(233, 30, 99)",
  "rgb(63, 81, 181)",
  "rgb(0, 150, 136)",
  "rgb(255, 235, 59)",
];

const generateBarChart = (data) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.error("Invalid data format or empty data array");
    return null;
  }

  const datasets = data.map((quarter, index) => ({
    label: quarter.quarter,
    data: quarter.data.values,
    backgroundColor: colors[index % colors.length],
  }));

  const chartData = {
    labels: data[0].bank_name,
    datasets,
  };

  return <Bar data={chartData} />;
};

function CreateBarChart({ data }) {
  console.log(data[0]);
  console.log(data[0].bank_name);
  console.log(data[0].data.bank_name);
  return (
    <div style={{ width: 900 }}>
      <h2>Bar Chart</h2>
      {generateBarChart(data)}
    </div>
  );
}

export default CreateBarChart;
