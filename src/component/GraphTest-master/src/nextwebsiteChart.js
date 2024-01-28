import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as CharJS } from "chart.js/auto";
// Import the BankData
import BankData from "./BankData";
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
  CivilBank: mapData(BankAData),
  EverestBank: mapData(BankBData),
  InvestmentBank: mapData(BankCData),
};
function LineChart() {
  const [selectedBank, setSelectedBank] = useState("CivilBank");

  const data = {
    labels: bankDataMap[selectedBank].map((item) => item.quarter),
    datasets: [
      {
        label: "Selected Bank",
        data: bankDataMap[selectedBank].map((item) => item.value),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  const handleBankChange = (event) => {
    setSelectedBank(event.target.value);
  };
  return (
    <div style={{ width: 900 }}>
      <h2>Line Chart</h2>
      <label htmlFor="bankDropdown">Select a Bank: </label>
      <select
        id="bankDropdown"
        value={selectedBank}
        onChange={handleBankChange}
      >
        <option value="CivilBank">Civil Bank</option>
        <option value="EverestBank">Everest Bank</option>
        <option value="InvestmentBank">Investment Bank</option>
      </select>
      <Line data={data} />
    </div>
  );
}

export default LineChart;
