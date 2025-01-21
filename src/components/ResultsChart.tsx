import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

// Interfaces
interface ResultsChartProps {
  dataSource: number[];
}

export default function ResultsChart({ dataSource }: ResultsChartProps) {
  const data = {
    labels: ["", "", "", ""],
    datasets: [
      {
        data: dataSource,
        backgroundColor: ["#ff746c", "#6786b1", "#ffee8c", "#82b682"],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options}></Bar>
    </div>
  );
}
