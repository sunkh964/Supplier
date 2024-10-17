import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ItemOrderChart = () => {
  const [getItem, setGetItem] = useState([]);
  const [getCus, setGetCus] = useState([]);
  const [getCnt, setGetCnt] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    // 아이템 데이터 가져오기
    axios.get("/item/get")
      .then((res) => {
        setGetItem(res.data);
        console.log("아이템:", res.data);
      })
      .catch((error) => { console.log(error) });
  }, []);

  useEffect(() => {
    // 고객 데이터 가져오기
    axios.get("/cus/get")
      .then((res) => {
        setGetCus(res.data);
        console.log("고객:", res.data);
      })
      .catch((error) => { console.log(error) });
  }, []);

  useEffect(() => {
    // 주문량 데이터 가져오기
    axios.get("/orderItem/getOrderCnt")
      .then((res) => {
        setGetCnt(res.data);
        console.log("주문량....:", res.data);
      })
      .catch((error) => { console.log(error) });
  }, []);

  useEffect(() => {
    // 시리즈 배열 생성
    const newSeries = getCus.map((cus) => {
      const customerData = getCnt.filter(cnt => cnt.cus_num === cus.cusNum); // 고객별 주문량 필터링

      return {
        name: cus.cusName, // 고객 이름
        data: getItem.map((item) => {
          const itemData = customerData.find(data => data.item_num === item.itemNum);
          return itemData ? itemData.order_cnt : 0; // 주문량이 없으면 0
        })
      };
    });
    
    setSeries(newSeries);
  }, [getCus, getItem, getCnt]);

  const options = {
    chart: {
      type: 'bar',
      height: 300,
      stacked: true,
    },
    colors: ['#008FFB', '#00E396', '#775DD0'],
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
        <ReactApexChart options={options} series={series} type="bar" height={300} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default ItemOrderChart;
