import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ItemOrderChart = () => {
  const [getItem, setGetItem] = useState([]);
  const [getCus, setGetCus] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    axios.get("/item/get")
      .then((res) => {
        setGetItem(res.data);
        console.log("아이템 데이터:", res.data);
      })
      .catch((error) => { console.log(error) });
  }, []);

  useEffect(() => {
    axios.get("/cus/get")
      .then((res) => {
        setGetCus(res.data);
        console.log("고객 데이터:", res.data);
      })
      .catch((error) => { console.log(error) });
  }, []);

  useEffect(() => {
    // 시리즈 배열 생성
    const newSeries = getCus.map((customer) => ({
      name: customer.cusName, // 고객 이름
      data: getItem.map(() => Math.floor(Math.random() * 100)) // 각 고객에 대한 매출 데이터 예시
    }));
    
    setSeries(newSeries);
  }, [getCus, getItem]);

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
    },
    // 파랑 '#008FFB'/초록 '#00E396'/보라 '#775DD0'/주황 '#FEB019'
    colors: ['#008FFB', '#00E396' ,'#775DD0'],
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 5,
            style: {
              fontSize: '13px',
              fontWeight: 700
            }
          }
        }
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    xaxis: {
      categories: getItem.map((item) => item.itemName), // 아이템 이름으로 카테고리 설정
    },
    yaxis: {
      title: {
        text: undefined
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "K";
        }
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40
    }
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default ItemOrderChart;
