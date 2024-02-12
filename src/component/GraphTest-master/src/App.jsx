import "./styles.css";
import React from "react";
import D3Chart from "./Axis";
import Chart from "./ZoomGraph";
import LineChart from "./LineChart";
import Map from "./Map";
import Charto from "./delete";
import LineChartoo from "./nextwebsiteChart";
import LineChartoss from "./FinalGraph";
// import BankGraph from "./delete";
export default function App() {
  return (
    <div>
      <Chart></Chart>
      <D3Chart></D3Chart>
      <Map></Map>
      <Charto></Charto>
      <LineChart></LineChart>
      <LineChartoo></LineChartoo>
      <LineChartoss></LineChartoss>
    </div>
  );
}
