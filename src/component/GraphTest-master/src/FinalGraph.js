import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import Select from "react-select";
import CivilDepo from "./CivilDepo";
import EverestDepo from "./EverestDepo";
import InvtDepo from "./InvtDepo";


const BankAData = CivilDepo;
const BankBData = EverestDepo;
const BankCData = InvtDepo;

const mapData = (bankData) => {
  return bankData.values.map((value, index) => ({
    quarter: bankData.quarter[index],
    value: parseFloat(value) || 0,
  }));
};

const bankDataMap = {
  CivilBank: {
    data: mapData(BankAData),
  },
  EverestBank: {
    data: mapData(BankBData),
  },
  InvestmentBank: {
    data: mapData(BankCData),
  },
};

const colors = ["rgb(75, 192, 192)", "rgb(255, 99, 132)", "rgb(150, 19, 72)"];

function LineChart() {
  const [selectedBanks, setSelectedBanks] = useState([]);

  const handleBankChange = (selectedOptions) => {
    setSelectedBanks(selectedOptions.map((option) => option.value));
  };

  const generateGraph = () => {
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

    return <Line data={data} />;
  };

  // Options for the multi-select dropdown
  const options = [
    { value: "CivilBank", label: "Civil Bank" },
    { value: "EverestBank", label: "Everest Bank" },
    { value: "InvestmentBank", label: "Investment Bank" },
  ];

  return (
    <div style={{ width: 900 }}>
      <h2>Line Chart</h2>

      {/* Multi-select dropdown */}
      <Select
        isMulti
        options={options}
        value={options.filter((option) => selectedBanks.includes(option.value))}
        onChange={handleBankChange}
      />

      {/* Generate graph button */}
      <button onClick={generateGraph}>Generate Graph</button>

      {/* Render the Line Chart based on the selected banks */}
      {selectedBanks.length > 0 && generateGraph()}
    </div>
  );
}

export default LineChart;
