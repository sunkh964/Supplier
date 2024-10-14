import React, { useEffect, useState } from 'react'
import './SalesManage.css'
import SalesChart from './SalesChart'
import axios from 'axios';

const SalesManage = () => {
  // 당월 매출액 저장 변수
  const [getSales, setGetSales] = useState([]);

  useEffect(() => {
    axios.get("/orderItem/getSales")
    .then((res) =>{
      setGetSales(res.data)
    })
    .catch((error) => {console.log(error)})
  },[])

  // 당월 매출 추출
  const totalSales = getSales
    .filter(item => {
      const orderDate = new Date(item.orderDate); // orderDate를 Date 객체로 변환
      const currentDate = new Date(); // 현재
      return orderDate.getFullYear() === currentDate.getFullYear() && 
             orderDate.getMonth() === currentDate.getMonth(); 
    })
    .reduce((accumulator, current) => accumulator + current.totalPrice, 0); // totalPrice 합산

  // 당월 주문량 계산
  const orderCount = getSales.filter(item => {
    const orderDate = new Date(item.orderDate);
    const currentDate = new Date();
    return orderDate.getFullYear() === currentDate.getFullYear() &&
           orderDate.getMonth() === currentDate.getMonth();
  }).length;

  // 당월 문자 추출
  const CurrentMName = () => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMIndex = new Date().getMonth();
    return monthNames[currentMIndex]; 
  };


  return (
    <div className='sales'>
      <div className='sales-1'>
        매출 관리
      </div>

      <div className='sales-2'>
        <div className='s2'>
          <div>매출액<span className='s2-title'>{CurrentMName()}</span></div>
          <div>
            <div className='s2-icon'><i className="bi bi-cash-coin"></i></div>
            <div>{(totalSales / 10000).toLocaleString()}만원</div>
          </div>
        </div>
        <div className='s2'>
          <div>주문량<span className='s2-title'>{CurrentMName()}</span></div>
          <div>
            <div className='s2-icon'><i className="bi bi-receipt-cutoff"></i></div>
            <div>{orderCount} 건</div>
          </div>
        </div>
        <div className='s2'>
          <div>고객<span className='s2-title'>병원</span></div>
          <div>
            <div className='s2-icon'><i className="bi bi-people-fill"></i></div>
            <div></div>
          </div>
        </div>
      </div>

      <div className='sales-3'>
        <div className='s3-chart'>
          <SalesChart />
        </div>
      </div>
    </div>
  )
}

export default SalesManage