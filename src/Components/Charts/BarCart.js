import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axiosInstance from '../../axios/axiosInstance';

const BarColumnChart = () => {
  const [products, setProducts] = useState([]);
  const [chartData, setChartData] = useState({ categories: [], series: [] });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('Product');
        console.log('Fetched products:', response.data); // Log fetched data
        setProducts(response.data);

        // Transform the product data
        const categories = response.data.map(product => product.productTittle);
        const seriesData = response.data.map(product => ({
          x: product.productTittle,
          y: product.rating,
        }));

        setChartData({
          categories,
          series: [{ data: seriesData }],
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const options = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: chartData.categories,
    },
  };

  return (
    <div className="chart">
      <Chart options={options} series={chartData.series} type="bar" height={350} />
    </div>
  );
};

export default BarColumnChart;
