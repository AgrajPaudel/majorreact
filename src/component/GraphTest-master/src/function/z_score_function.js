import React from 'react';
import { Line } from 'react-chartjs-2';

const ZScoreChart = (value ) => {
    console.log(value.value);
  // Create the chart data
  const data = {
    labels: [...Array(100).keys()].map((x) => (x - 50) / 10),
    datasets: [
      {
        label: 'Normal Distribution',
        data: [...Array(100).keys()].map((x) => Math.exp(-0.5 * Math.pow((x - 50) / 10, 2))),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
      {
        label: 'Shaded Area',
        data: [...Array(100).keys()].map((x) => (x -50)/10 <= value.value? Math.exp(-0.5 * Math.pow((x - 50) / 10, 2)) : null),
        fill: true,
        backgroundColor: 'rgba(255,0,0,0.5)', // Red color for shading
        borderColor: 'rgba(255,0,0,0.5)',
        borderWidth: 1,
        pointRadius: 0, // Hide points for this dataset
      },
    ],
  };

  // Chart options
  const options = {
    tooltips: {
      bodyFontSize: 14,
      bodySpacing: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 1,
    },
  };

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default ZScoreChart;
