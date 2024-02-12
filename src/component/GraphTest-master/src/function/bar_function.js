import React, { useState } from "react";
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

const generateBarChart = (data, sortOrder) => {
  if (!data || !data.data || !Array.isArray(data.data.values) || data.data.values.length === 0) {
    console.error("Invalid data format or empty data array");
    return null;
  }

  const sortedData = { ...data };

  // Create an array of objects containing both value and bank
  const valueBankPairs = data.data.values.map((value, index) => ({
    value,
    bank: data.data.bank[index]
  }));

  // Sort the value-bank pairs based on the values
  valueBankPairs.sort((a, b) => {
    if (sortOrder === "ascending") {
      return a.value - b.value;
    } else if (sortOrder === "descending") {
      return b.value - a.value;
    }
    return 0;
  });

  // Update the sorted values and banks in the sortedData object
  sortedData.data.values = valueBankPairs.map(pair => pair.value);
  sortedData.data.bank = valueBankPairs.map(pair => pair.bank);

  const datasets = [{
    label: sortedData.quarter,
    data: sortedData.data.values,
    backgroundColor: colors[0],
  }];

  const chartData = {
    labels: sortedData.data.bank,
    datasets,
  };

  return <Bar data={chartData} />;
};



function CreateBarChart({ data }) {
  const [sortOrder, setSortOrder] = useState(null);

  const handleSort = (order) => {
    setSortOrder(order);
  };

  return (
    <div style={{ width: 900 }}>
      <h2>Bar Chart</h2>
      <div>
        <button onClick={() => handleSort("ascending")}>Sort Ascending</button>
        <button onClick={() => handleSort("descending")}>Sort Descending</button>
      </div>
      {generateBarChart(data[0], sortOrder)}
    </div>
  );
}

export default CreateBarChart;
