import React, { useEffect, useState } from 'react'
import './OrderManage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderManage = () => {
  const navigaite=useNavigate();

  // 조회한 내역 목록 데이터 저장
  const [orderList, setOrderList]=useState([]);

  const [searchInfo, setSearchInfo] = useState({});

    //내역 목록 조회
    useEffect(() => {
      axios.post('/orderItem/getOrderList', searchInfo)
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
              <td>주문 업체</td>
              <td>주문날짜</td>
              <td>총 가격</td>
              <td>연락처</td>
              <td>배송 완료 여부</td>
              <td>주문서 확인</td>
            </tr>
          </thead>
          <tbody>
              {
                orderList.reverse().map((order, i)=>{
                  return(
                    <tr className='table-div' key={i}>
                      <td>{order.orderNum}</td>
                      <td>{order.cusVO.cusName}</td>
                      <td>{order.orderDate}</td>
                      <td>{order.totalPrice}</td>
                      <td>{order.cusVO.cusTel}</td>
                      <td>{order.deliverVO.deliStatus}</td>
                      <td><div class="btn-container" onClick={()=>{navigaite(`/admin/orderDetail/${order.orderNum}`)}}>
                      <a href="" class="btn-3d blue">Button</a>
                      </div></td>
                    </tr>
                  );
                })
              }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderManage