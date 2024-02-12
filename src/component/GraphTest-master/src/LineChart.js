import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
} from "recharts";

const BankData = {
  quarter: [
    "Q1 2064",
    "Q2 2064",
    "Q3 2064",
    "Q4 2064",
    "Q1 2065",
    "Q2 2065",
    "Q3 2065",
    "Q4 2065",
    "Q1 2066",
    "Q2 2066",
    "Q3 2066",
    "Q4 2066",
    "Q1 2067",
    "Q2 2067",
    "Q3 2067",
    "Q4 2067",
    "Q1 2068",
    "Q2 2068",
    "Q3 2068",
    "Q4 2068",
    "Q1 2069",
    "Q2 2069",
    "Q3 2069",
    "Q4 2069",
    "Q1 2070",
    "Q2 2070",
    "Q3 2070",
    "Q4 2070",
    "Q1 2071",
    "Q2 2071",
    "Q3 2071",
    "Q4 2071",
    "Q1 2072",
    "Q2 2072",
    "Q3 2072",
    "Q4 2072",
    "Q1 2073",
    "Q2 2073",
    "Q3 2073",
    "Q4 2073",
    "Q1 2074",
    "Q2 2074",
    "Q3 2074",
    "Q4 2074",
    "Q1 2075",
    "Q2 2075",
    "Q3 2075",
    "Q4 2075",
    "Q1 2076",
    "Q2 2076",
    "Q3 2076",
    "Q4 2076",
    "Q1 2077",
    "Q2 2077",
    "Q3 2077",
    "Q4 2077",
    "Q1 2078",
    "Q2 2078",
    "Q3 2078",
    "Q4 2078",
    "Q1 2079",
    "Q2 2079",
    "Q3 2079",
    "Q4 2079",
    "Q1 2080",
    "Q2 2080",
    "Q3 2080",
    "Q4 2080",
  ],
  values: [
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "nan",
    "3320963.0",
    "3194561.0",
    "3504515.0",
    "3644846.0",
    "3340210.0",
    "3652226.0",
    "3846306.0",
    "4185782.0",
    "3261974.0",
    "3779076.0",
    "4375384.0",
    "4813778.0",
    "4002759.0",
    "4633125.0",
    "5274461.0",
    "5686669.0",
    "4696945.0",
    "5202468.0",
    "6085632.0",
    "6869602.0",
    "6066040.0",
    "5190960.075",
    "5325987.259",
    "5796006.031",
    "6116985.95",
    "6790001.798",
    "5670966.635",
    "6080706.759",
    "5986630.811",
    "6198834.933",
    "6588789.341",
    "6952623.632",
    "7154346.379",
    "7544894.397",
    "6472136.45",
    "7353753.114",
    "7426425.805",
    "13457609.7",
    "nan",
    "nan",
    "nan",
    "nan",
  ],
};

const BankChart = () => {
  const chartData = BankData.values.map((value, index) => ({
    quarter: BankData.quarter[index],
    value: parseFloat(value) || 0,
  }));

  return (
    <div style={{ width: "100%", height: 600 }}>
      <ResponsiveContainer>
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="quarter" scale="band" angle={-30} interval={2} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="value"
            fill="#8884d8"
            stroke="#8884d8"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BankChart;
