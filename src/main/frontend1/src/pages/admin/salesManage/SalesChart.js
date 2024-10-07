import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const SalesChart = () => {
  const [series] = useState([{
    name: '월별 매출액',
    data: [31, 40, 28, 51, 42, 109, 100]
}, {
    name: '주문량',
    data: [11, 32, 45, 32, 34, 52, 41]
}]);

const [options] = useState({
    chart: {
        height: 350,
        type: 'area'
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    xaxis: {
        type: 'datetime',
        categories: [
            "2024-01",
            "2024-02",
            "2024-03",
            "2024-04",
            "2024-05",
            "2024-06",
            "2024-07",
            "2024-08",
            "2024-09",
            "2024-10",
            "2024-11",
            "2024-12",
        ]
    },
    tooltip: {
        x: {
            format: 'dd/MM/yy HH:mm'
        },
    },
    yaxis: [
      {
          title: {
              text: '월별 매출액',
          },
      },
      {
          opposite: true, // 오른쪽 y축에 표시되도록 설정
          title: {
              text: '주문량',
          },
      }
  ],
});

  return (
    <div>
      <ReactApexChart options={options} series={series} type="area" height={350} />
      
    </div>
  )
}

export default SalesChart