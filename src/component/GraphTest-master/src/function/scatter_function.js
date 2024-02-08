import { scales } from "chart.js";
import React, { useState } from "react";
import { Line, Scatter } from "react-chartjs-2";
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
  // Collect unique quarter values across all selected banks
  const allQuarters = selectedBanks.reduce((quarters, bank) => {
    const bankQuarters = bankDataMap[bank].data.map((item) => item.quarter);
    return [...new Set([...quarters, ...bankQuarters])];
  }, []);

  // Prepare data for selected banks
  const datasets = selectedBanks.map((bank, index) => {
    const dataPoints = bankDataMap[bank].data
      .map((item) => ({
        x: allQuarters.indexOf(item.quarter),
        y: parseFloat(item.value) || 0,
      }))
      .filter((point) => !isNaN(point.y));

    return {
      label: bank,
      data: dataPoints,
      backgroundColor: colors[index % colors.length],
      pointRadius: 6,
      key: index,
    };
  });

  const data = {
    datasets,
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        ticks: {
          stepSize: 1,
          callback: (value, index) => allQuarters[index], // Use quarter values for ticks
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = allQuarters[context.dataIndex];
            const value = context.dataset.data[context.dataIndex].y;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return <Scatter data={data} options={options} />;
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


