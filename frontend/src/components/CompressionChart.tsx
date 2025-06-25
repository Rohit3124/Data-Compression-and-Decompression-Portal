"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface CompressionChartProps {
  originalSize: number;
  outputSize: number;
}

export default function CompressionChart({
  originalSize,
  outputSize,
}: CompressionChartProps) {
  const data = {
    labels: ["Original Size", "Output Size"],
    datasets: [
      {
        label: "File Size (Bytes)",
        data: [originalSize, outputSize],
        backgroundColor: ["#3b82f6", "#10b981"], // blue, green
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
}
