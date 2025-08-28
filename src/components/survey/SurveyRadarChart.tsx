import React from 'react';
import { Box } from '@mui/material';
import { Radar } from 'react-chartjs-2';

interface RadarData {
  name: string;
  value: number;
}

interface SurveyRadarChartProps {
  data: RadarData[];
  color: string;
}

const SurveyRadarChart: React.FC<SurveyRadarChartProps> = ({ data, color }) => {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Điểm đánh giá',
        data: data.map(item => item.value),
        backgroundColor: `${color}20`,
        borderColor: color,
        borderWidth: 2,
        pointBackgroundColor: color,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        min: 0,
        ticks: {
          stepSize: 20,
          color: '#666',
          font: {
            size: 12,
          },
        },
        grid: {
          color: '#e0e0e0',
          lineWidth: 1,
        },
        pointLabels: {
          color: '#333',
          font: {
            size: 12,
            weight: 'bold' as const,
          },
          padding: 20,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: color,
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.parsed.r}/100`;
          },
        },
      },
    },
  };

  return (
    <Box sx={{ width: '100%', height: 400, position: 'relative' }}>
      <Radar data={chartData} options={options} />
    </Box>
  );
};

export default SurveyRadarChart;
