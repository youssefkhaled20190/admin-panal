import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axiosInstance from '../../axios/axiosInstance';

const DonutChart = () => {
  const [chartData, setChartData] = useState({ labels: [], series: [] });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('Product');
        console.log('Fetched products:', response.data); // Log fetched data

        // Transform the product data
        const labels = response.data.map(product => product.productTittle);
        const series = response.data.map(product => product.count);

        setChartData({
          labels,
          series,
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const options = {
    chart: {
      type: 'donut',
    },
    labels: chartData.labels,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <div className="chart">
      <Chart options={options} series={chartData.series} type="donut" height={350} />
    </div>
  );
};

export default DonutChart;
