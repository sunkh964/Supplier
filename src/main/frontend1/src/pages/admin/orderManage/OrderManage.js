import React, { useEffect, useState } from 'react'
import './OrderManage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderManage = () => {
  const navigaite=useNavigate();

  // 조회한 내역 목록 데이터 저장
  const [orderList, setOrderList]=useState([]);

    //내역 목록 조회
    useEffect(() => {
      axios.get('/orderItem/getOrderList')
      .then((res) => {
        setOrderList(res.data);
      })
      .catch((error) => {console.log(error);});
    }, []);

  return (
    <div>
      <div className='main-div'>
      주문 내역
      </div>
      <div className='table-div'>
        <table>
          <thead>
            <tr>
              <td>주문번호</td>
              <td>고객명</td>
              <td>주문날짜</td>
              <td>총 가격</td>
              <td>총 수량</td>
              <td>연락처</td>
              <td>배송 완료 여부</td>
              <td>주문서 확인</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{orderList.orderNum}</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td><div class="btn-container" onClick={()=>{navigaite('/admin/orderDetail')}}>
                <a href="#" class="btn-3d blue">Button</a>
              </div></td>
            </tr>
            <tr>
              {
                orderList.map((order, i)=>{
                  return(
                    <div className='table-div' key={i}>
                      <td>{order.orderNum}</td>
                      <td>123</td>
                      <td>{order.orderDate}</td>
                      <td>{order.totalPrice}</td>
                      <td>{order.orderCount}</td>
                      <td>123</td>
                      <td>123</td>
                      <td><div class="btn-container" onClick={()=>{navigaite('/admin/orderDetail')}}>
                      <a href="#" class="btn-3d blue">Button</a>
                      </div></td>
                    </div>
                  );
                })
              }
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderManage