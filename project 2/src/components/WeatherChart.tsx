import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ForecastResponse } from '../types/weather';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface WeatherChartProps {
  forecastData: ForecastResponse;
  type: 'temperature' | 'precipitation' | 'humidity';
}

const WeatherChart: React.FC<WeatherChartProps> = ({ forecastData, type }) => {
  // Process data for the next 24 hours (8 data points, every 3 hours)
  const next24Hours = forecastData.list.slice(0, 8);

  // Format time labels (e.g., "3 PM")
  const labels = next24Hours.map(item => {
    const date = new Date(item.dt * 1000);
    return date.toLocaleTimeString([], { hour: 'numeric' });
  });

  // Get data based on chart type
  let data;
  let chartTitle;
  let borderColor;
  let backgroundColor;
  let yAxisLabel;

  switch (type) {
    case 'temperature':
      data = next24Hours.map(item => Math.round(item.main.temp));
      chartTitle = 'Temperature Forecast (24h)';
      borderColor = 'rgb(255, 99, 132)';
      backgroundColor = 'rgba(255, 99, 132, 0.2)';
      yAxisLabel = 'Temperature (°C)';
      break;
    case 'precipitation':
      data = next24Hours.map(item => Math.round(item.pop * 100));
      chartTitle = 'Precipitation Probability (24h)';
      borderColor = 'rgb(54, 162, 235)';
      backgroundColor = 'rgba(54, 162, 235, 0.2)';
      yAxisLabel = 'Probability (%)';
      break;
    case 'humidity':
      data = next24Hours.map(item => item.main.humidity);
      chartTitle = 'Humidity Forecast (24h)';
      borderColor = 'rgb(75, 192, 192)';
      backgroundColor = 'rgba(75, 192, 192, 0.2)';
      yAxisLabel = 'Humidity (%)';
      break;
  }

  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: chartTitle,
        data,
        borderColor,
        backgroundColor,
        tension: 0.3,
        pointBackgroundColor: borderColor,
        pointBorderColor: '#fff',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#334155',
        bodyColor: '#334155',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: type === 'precipitation',
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 10,
          },
        },
        title: {
          display: true,
          text: yAxisLabel,
          color: '#64748b',
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 10,
          },
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  };

  return (
    <motion.div 
      className="glass-card p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{chartTitle}</h3>
      <div className="p-2 bg-white/60 rounded-xl">
        <Line data={chartData} options={options} />
      </div>
    </motion.div>
  );
};

export default WeatherChart;