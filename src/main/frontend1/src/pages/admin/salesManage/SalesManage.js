import React, { useEffect, useState } from 'react'
import './SalesManage.css'
import SalesChart from './SalesChart'
import axios from 'axios';
import ItemOrderChart from './ItemOrderChart';

const SalesManage = () => {
  // 고객정보 불러오기
  const [getCus, setGetCus] = useState([]);

  useEffect(()=>{
    axios.get("/cus/get")
    .then((res)=>{
      setGetCus(res.data);
    })
    .catch((error) =>{console.log(error)})
  },[])

  // 당월 매출액 저장 변수
  const [getSales, setGetSales] = useState([]);

  const [monthlySales, setMonthlySales] = useState(Array(12).fill(0));

  useEffect(() => {
    axios.get("/orderItem/getSales")
    .then((res) =>{
      setGetSales(res.data)
    })
    .catch((error) => {console.log(error)})
  },[])

  // 월별 매출량 계산
  useEffect(() => {
    const sales = Array(12).fill(0); // 12개월 매출 초기화

    getSales.forEach(item => {
      const orderDate = new Date(item.orderDate);
      const month = orderDate.getMonth(); // 0~11로 반환, 1월은 0

      if (month >= 0 && month < 12) {
        sales[month] += item.totalPrice || 0; // 해당 월의 매출에 합산
      }
    });
    setMonthlySales(sales);
  }, [getSales]);

  // 당월 매출 추출
  const totalSales = getSales
    .filter(item => {
      const orderDate = new Date(item.orderDate); // orderDate를 Date 객체로 변환
      const currentDate = new Date(); // 현재
      return orderDate.getFullYear() == currentDate.getFullYear() && 
             orderDate.getMonth() == currentDate.getMonth(); 
    })
    .reduce((total, t) => total + t.totalPrice, 0); 

  // 당월 주문량 계산
  const orderCount = getSales.filter(item => {
    const orderDate = new Date(item.orderDate);
    const currentDate = new Date();
    return orderDate.getFullYear() == currentDate.getFullYear() &&
           orderDate.getMonth() == currentDate.getMonth();
  }).length;

  // 당월 문자 추출
  const CurrentMName = () => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMIndex = new Date().getMonth();
    return monthNames[currentMIndex]; 
  };

  // 연간 매출량 구하기
  const yearSales = monthlySales.reduce((y,i) =>{
    return y + i;
  },0)


  return (
    <div className='sales'>

      <div className='sales-2'>
        <div className='s2'>
          <div>매출액<span className='s2-title'>당월({CurrentMName()})</span></div>
          <div>
            <div className='s2-icon'><i className="bi bi-cash-coin"></i></div>
            <div className='s2-num'>{(totalSales / 10000).toLocaleString()} 만원</div>
          </div>
        </div>
        <div className='s2'>
          <div>주문량<span className='s2-title'>당월({CurrentMName()})</span></div>
          <div>
            <div className='s2-icon'><i className="bi bi-receipt-cutoff"></i></div>
            <div className='s2-num'>{orderCount} 건</div>
          </div>
        </div>
        <div className='s2'>
          <div>고객<span className='s2-title'>병원사</span></div>
          <div>
            <div className='s2-icon'><i className="bi bi-people-fill"></i></div>
            <div className='s2-num'>{getCus.length}</div>
          </div>
        </div>
      </div>

      <div className='sales-3'>
      <div>[ 연간 매출 현황 ] <span>￦ {(yearSales/10000).  toLocaleString()} 만원/년</span></div>
        <div className='s3-chart'>
          <SalesChart />
          <div className='sales-1'>
        <div>- 월 매출 현황</div>
        <div className='unit'>(만원)</div>
        <table className='s1-table'>
          <tr>
            <td>월</td>
            {
              [...Array(12)].map((a, i) => {
                const currentMonth = (i === new Date().getMonth()); // 현재 월 인덱스와 비교
                return (
                  <td key={i} className={currentMonth ? 'curMonth' : ''}>{i + 1}</td>
                );
              })
            }
          </tr>
          <tr>
            <td>매출액</td>
            {
              monthlySales.map((sales,i) => {
                const currentMonth = (i == new Date().getMonth()); // 현재 월 인덱스와 비교
                return(
                  <td key={i}
                  className={currentMonth ? 'curMonth' : ''}>{sales/10000}</td>
                );
              })
            }
          </tr>
        </table>
      </div>
        </div>
        
      </div>

      <div className='sales-4'>
      <div>[ 제품 주문량 ]</div>
        <div className='s4-chart'>
          <ItemOrderChart/>
        </div>
      </div>
    </div>
  )
}

export default SalesManage