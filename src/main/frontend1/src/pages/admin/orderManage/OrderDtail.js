import React, { useEffect, useState } from 'react'
import './OrderDtail.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDtail = () => {
  const {orderNum} = useParams();
  console.log(orderNum);
 //조회한 상세 정보 데이터를 저장할 state 변수
  const [orderList, setOrderList] = useState([]);
  const [detailList, setDetailList] = useState([]);

  useEffect(()=>{
    axios.get(`/orderItem/orderDetail/${orderNum}`)
    .then((res)=>{
      setOrderList(res.data);
      console.log(res.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  },[]);

  useEffect(()=>{
    axios.get(`/orderItem/detail/${orderNum}`)
    .then((res)=>{
      setDetailList(res.data);
      console.log(res.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  },[]);


  return (
    <div className='orderDetail'>
      <div className='sales-title'>
        <sapn><i class="bi bi-check-all"></i></sapn> 주문 상세내역
      </div>
      <div className='main-div1'>
      </div>
      <div className='table-div1'>
        <table className='tabled'>
          {orderList.length > 0 && (
          <tbody>
            <tr>
              <td>주문번호</td>
              <td colSpan={5}>{orderList[0].orderNum}</td>
            </tr>
            <tr>
              <td>주문 업체</td>
              <td colSpan={5}>{orderList[0].cusVO.cusName}</td>
            </tr>
            <tr>
              <td>주문 업체 주소</td>
              <td colSpan={5}>{orderList[0].cusVO.cusAddr}</td>
            </tr>
            <tr>
              <td>연락처</td>
              <td colSpan={5}>{orderList[0].cusVO.cusTel}</td>
            </tr>
            <tr>
              <td>주문 날짜</td>
              <td colSpan={5}>{orderList[0].orderDate}</td>
            </tr>
            <tr>
              <td>배송 현황</td>
              <td colSpan={5}>{orderList[0].deliverVO.deliStatus}</td>
            </tr>
            <tr>
              <td>상품</td>
              <td>
                <table className='n'>
                  <thead>
                    <tr>
                      <td>상품명</td>
                      <td>타입</td>
                      <td>가격</td>
                      <td>수량</td>
                      <td>계</td>
                    </tr>
                  </thead>
                  {
                    detailList.map((detail, i) => {
                      return (
                          <tr>
                            {/* {
                              i == 0 ? (<td rowSpan={detailList.length != 1 ? detailList.length : 1}></td>) : null
                            } */}
                            <td>{detail.itemVO.itemName}</td>
                            <td>{detail.typeVO.typeName}</td>
                            <td>{detail.itemVO.price.toLocaleString()}</td>
                            <td>{detail.orderCnt}</td>
                            <td>{detail.detailPrice.toLocaleString()}</td>
                          </tr>
                        );
                      })
                    }
                </table>
              </td>
              </tr>
            <tr>
              <td>총 가격</td>
              <td  colSpan={5}>{orderList[0].totalPrice.toLocaleString()}</td>
            </tr>
          </tbody>
)}
            {/* <tr>
              <td>주문번호</td>
              <td>{orderList[0].orderNum}</td>
            </tr>
            <tr>
              <td>주문 업체</td>
              <td>{orderList[0].cusVO.cusName}</td>
            </tr>
            <tr>
              <td>연락처</td>
              <td>{orderList[0].cusVO.cusTel}</td>
            </tr>
            <tr>
              <td>주문 날짜</td>
              <td>{orderList[0].orderDate}</td>
            </tr>
            <tr>
              {
                orderList.map((order, i)=>{
                  return(
                    <td key={i}>
                      {order.typeName}
                    </td>
                  )
                })
              }
              <td>주문 항목</td>
              <td>{orderList.typeName}</td>
            </tr>
            <tr>
              <td>주문 총 가격</td>
              <td>{orderList.totalPrice}</td>
            </tr>
            <tr>
              <td>배송 현황</td>
              <td>{orderList.deliStatus}</td>
            </tr> */}
        </table>
        </div>
    </div>
  )
}

export default OrderDtail