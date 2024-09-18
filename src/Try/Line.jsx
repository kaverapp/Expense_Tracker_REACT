// LineChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement,PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
 // PointElement,
  BarElement,
  //LineElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // Ensure this is not undefined
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40], // Ensure data is properly defined
        //fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        borderColor: 'rgb(75, 192, 192)',
        //tension: 0.1
        borderWidth: 1

      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sample Bar Chart',
      },
    },
  };

  return (
    <div>
      <h2>Line Chart</h2>
      {data  && data.datasets ? (
        <Bar data={data} options={options} />
      ) : (
        <p>Loading chart...</p> // Render fallback UI in case data is undefined
      )}
    </div>
  );
};

export default BarChart;
