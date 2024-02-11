"use client"
import React from 'react';
import {Line} from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


export default ({
  xAxes, yAxes
}) => {
  const data = {
    labels: xAxes,
    datasets: [
      {
        data: yAxes,
        showLines: false,
        borderColor: "#025BAE",
        pointRadius: 1,
      }
    ]
  };
  
  const options = {
    scales: {
      x: {
        display: false
      },
      y: {
          display: false,
      }
    },
    elements: {
      point: {
        radius: 2
      }
    },
    plugins: {
      legend: {
        display: false,
        position: "bottom"
      }
    }
  };
  return (
  <div>
    <Line
      data={data}
      options={options}
      // width={400}
      // height={400}
    />
  </div>
);
}