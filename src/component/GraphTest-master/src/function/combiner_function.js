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
  return bankData.data.values.map((value, index) => ({
    quarter: bankData.data.quarter[index],
    value: parseFloat(value) || 0,
  }));
};

function GenerateGraph({ lineData, scatterData }) {
  const [selectedLineBanks, setSelectedLineBanks] = useState([]);
  const [selectedScatterBanks, setSelectedScatterBanks] = useState([]);

  const lineBankDataMap = {};
  const scatterBankDataMap = {};

  if (lineData) {
    lineData.forEach((data) => {
      lineBankDataMap[data.bank_name] = {
        data: mapData(data),
      };
    });
  }

  if (scatterData) {
    scatterData.forEach((data) => {
      scatterBankDataMap[data.bank_name] = {
        data: mapData(data),
      };
    });
  }

  const handleLineBankChange = (selectedOptions) => {
    setSelectedLineBanks(selectedOptions.map((option) => option.value));
  };

  const handleScatterBankChange = (selectedOptions) => {
    setSelectedScatterBanks(selectedOptions.map((option) => option.value));
  };

  const generateGraph = () => {
    if (selectedLineBanks.length > 0 || selectedScatterBanks.length > 0) {
      const allQuarters = [
        ...new Set([
          ...selectedLineBanks.reduce((quarters, bank) => {
            const bankQuarters = lineBankDataMap[bank].data.map((item) => item.quarter);
            return [...quarters, ...bankQuarters];
          }, []),
          ...selectedScatterBanks.reduce((quarters, bank) => {
            const bankQuarters = scatterBankDataMap[bank].data.map((item) => item.quarter);
            return [...quarters, ...bankQuarters];
          }, []),
        ]),
      ];

      const lineDatasets = selectedLineBanks.map((bank, index) => ({
        label: bank,
        data: lineBankDataMap[bank].data.map((item) => item.value),
        fill: false,
        borderColor: colors[index % colors.length],
        tension: 0.1,
        key: index,
      }));

      const scatterDatasets = selectedScatterBanks.map((bank, index) => ({
        label: bank,
        data: scatterBankDataMap[bank].data.map((item) => ({
          x: allQuarters.indexOf(item.quarter),
          y: parseFloat(item.value) || 0,
        })),
        pointBackgroundColor: scatterBankDataMap[bank].data.map((item) =>
          parseFloat(item.value) === 0 ? 'white' : 'black'
        ),
        pointBorderColor: scatterBankDataMap[bank].data.map((item) =>
          parseFloat(item.value) === 0 ? 'white' : 'black'
        ),
        pointStyle: 'circle',
        showLine: false,
        key: index + selectedLineBanks.length, // Offset key for scatter plots
      }));
      

      const data = {
        labels: allQuarters,
        datasets: [...lineDatasets, ...scatterDatasets],
      };

      return <Line data={data} />;
    }

    return null;
  };

  return (
    <div style={{ width: 900 }}>
      <h2>Combined Graph</h2>

      {/* Line Graph Dropdown */}
      <Select
        isMulti
        options={lineData.map((data) => ({
          value: data.bank_name,
          label: data.bank_name, 
        }))}
        value={selectedLineBanks.map((bank) => ({ value: bank, label: bank }))}
        onChange={handleLineBankChange}
      />

      {/* Scatter Graph Dropdown */}
      <Select
        isMulti
        options={scatterData.map((data) => ({
          value: data.bank_name,
          label: data.bank_name,
        }))}
        value={selectedScatterBanks.map((bank) => ({ value: bank, label: bank }))}
        onChange={handleScatterBankChange}
      />

      {/* Render the Graphs */}
      {generateGraph()}
    </div>
  );
}

export default GenerateGraph;
