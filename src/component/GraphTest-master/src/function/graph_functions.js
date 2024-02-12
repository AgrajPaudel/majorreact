import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import Select from "react-select";

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

const mapData = (bankData) => {
  return bankData.values.map((value, index) => ({
    quarter: bankData.quarter[index],
    value: parseFloat(value) || 0,
  }));
};

const bankDataMap = {};


const generateGraph = (selectedBanks) => {
  // Prepare data for selected banks
  const datasets = selectedBanks.map((bank, index) => ({
    label: bank,
    data: bankDataMap[bank].data.map((item) => item.value),
    fill: false,
    borderColor: colors[index % colors.length], // Use modulo to cycle through colors
    tension: 0.1,
    key: index, // Adding a unique key for each dataset
  }));

  const data = {
    labels: bankDataMap[selectedBanks[0]].data.map((item) => item.quarter),
    datasets,
  };

  // Chart.js options for zooming
  const options = {
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
        pan: {
          enabled: true,
          mode: 'x',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

function CreateLineChart( graphDataList ) {
  console.log(graphDataList)
  console.log('hererererere');
  const [selectedBanks, setSelectedBanks] = useState([]);

  if (!graphDataList) {
    // Handle the case where graphDataList is not provided
    console.error("graphDataList is not provided");
    return null; // or return a placeholder, an error message, etc.
  }
  console.log('not empty')
  graphDataList.data.forEach((data) => {
    console.log(data);
    bankDataMap[data.bank_name] = {
      data: mapData(data.data),
    };

  });

  const handleBankChange = (selectedOptions) => {
    setSelectedBanks(selectedOptions.map((option) => option.value));
  };
 
  

  return (
    <div style={{ width: 900 }}>
      <h2>Line Chart</h2>

      {/* Multi-select dropdown */}
      <Select
        isMulti
        options={graphDataList.data.map((data) => ({
          value: data.bank_name,
          label: data.bank_name,
        }))}
        value={selectedBanks.map((bank) => ({ value: bank, label: bank }))}
        onChange={handleBankChange}
      />

     

      {/* Render the Line Chart based on the selected banks */}
      {selectedBanks.length > 0 && generateGraph(selectedBanks)}
    </div>
  );
}

export default CreateLineChart;


