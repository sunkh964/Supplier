import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const SalesChart = () => {
  const [getSales, setGetSales] = useState([]);
  const [monthlySales, setMonthlySales] = useState(Array(12).fill(0)); // 12개월의 매출 초기화
  const [monthlyOrders, setMonthlyOrders] = useState(Array(12).fill(0)); // 12개월의 주문량 초기화

  useEffect(() => {
    axios.get("/orderItem/getSales")
      .then((res) => {
        setGetSales(res.data);
        console.log("주문내역 :", res.data);
      })
      .catch((error) => { console.log(error) });
  }, []);

  useEffect(() => {
    const sales = Array(12).fill(0); 
    const orders = Array(12).fill(0); 

    getSales.forEach(item => {
      const orderDate = new Date(item.orderDate);
      const month = orderDate.getMonth(); // 

      if (month >= 0 && month < 12) {
        sales[month] += item.totalPrice || 0; 
        orders[month] += 1; 
      }
    });

    setMonthlySales(sales); 
    setMonthlyOrders(orders); 
  }, [getSales]);


  const series = [{
    name: '월별 매출액',
    data: monthlySales.map((sale,i) => sale/10000) // 월별 매출 데이터
  }, {
    name: '주문량',
    data: monthlyOrders // 주문량 데이터
  }];

  // 최고점 최저점 구하기
  const maxSales = Math.max(...monthlySales) / 10000;

  const filterSales = monthlySales.filter(sale => sale > 0);
  const minSales = filterSales.length >0 ? Math.min(...filterSales) /10000 : 0; // 0일 경우 기본값 0 

  const options = {
    chart: {
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      categories: [
        "2024-01", "2024-02", "2024-03", "2024-04",
        "2024-05", "2024-06", "2024-07", "2024-08",
        "2024-09", "2024-10", "2024-11", "2024-12",
      ],
    },
    legend:{
      markers :{ 
        shape : 'square'
      },
      offsetY : 10,
      itemMargin: {
        horizontal: 15, // 가로 간격 조정
      }
    },
    tooltip: {
      x: {
        format: 'yyyy / MM',
      },
    },
    yaxis: [
      {
        title: {
          text: '월별 매출액',
        },
        max: 1000,
      },
      {
        opposite: true,
        title: {
          text: '주문량',
        },
        max: 25,
      },
    ],
    annotations: {
      yaxis: [
        {
          y: maxSales,
          borderColor: '#FF4560',
          label: {
            borderColor: '#FF4560',
            style: {
              color: '#fff',
              background: '#FF4560',
            },
            text: `최대 매출: ${maxSales.toFixed()} 만원`,
          },
        },
        {
          y: minSales,
          borderColor: '#5f5e5e',
          label: {
            borderColor: '#5f5e5e',
            style: {
              color: '#fff',
              background: '#5f5e5e',
            },
            text: `최저 매출: ${minSales.toFixed()} 만원`,
          },
        },
      ],
    }
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="area" height={320} />
    </div>
  );
}

export default SalesChart;
