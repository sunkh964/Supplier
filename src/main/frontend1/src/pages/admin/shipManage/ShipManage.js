import React, { useEffect, useState } from 'react'
import "./ShipManage.css"
import axios from 'axios';

const ShipManage = () => {

  // 주문서 저장
  const [orderList, setOrderList] = useState([]);

  // 주문서 리스트 불러오기
  useEffect(() => {
    axios.get(`/orderItem/getOrderList`)
    .then((res) => {
      setOrderList(res.data);
    })
    .catch((error) => {alert(error);});
  }, []);

  return (
    <div className='ship-container'>
      <div className='top-div'>
        <div className='row'>
            {/* 정렬 라디오 버튼 */}
          <div className='sort-div btn-div'>
            <div className='radio-btn'>
              <input type='radio' id='order-num-radio' name='sort-radio' className='radio' />
              <label for='order-num-radio'>주문 번호 순</label>
            </div>
            <div className='radio-btn'>
              <input type='radio' id='addr-radio' name='sort-radio' className='radio' />
              <label for='addr-radio'>배송 위치 순</label>
            </div>
          </div>
          <div className='search-div'>
            <select>
              <option>주문일자</option>
              <option>고객명</option>
              <option>제품명</option>
            </select>
            <input type='text'></input>
            <button type='button'>검색</button>
          </div>
        </div>
        <div className='sort-div btn-div'>
          <input type='checkbox' id='after-deliver' className='after-deliver' />
          <label for='after-deliver'>배송 완료 제외</label>
        </div>
      </div>

      <div className='table-div'>
        <table>
          <thead>
            <tr>
              <td>주문번호</td>
              <td>고객명</td>
              <td>주문날짜</td>
              <td>총 가격</td>
              <td>주소</td>
              <td>연락처</td>
              <td>배송 완료 여부</td>
              <td>주문 취소</td>
              <td>배송 시작</td>
            </tr>
          </thead>
          <tbody>
            {
              orderList.map((order, i) => {
                return (
                  <tr key={i}>
                    <td>{order.orderNum}</td>
                    <td>{order.cusVO.cusName}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.totalPrice.toLocaleString()}</td>
                    <td>{order.cusVO.cusAddr}</td>
                    <td>{order.cusVO.cusTel}</td>
                    <td>{order.deliverVO.deliStatus}</td>
                    
                    <td><button type='button' className='cancel-order'>주문 취소</button></td>
                    <td><button type='button'>배송 시작</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ShipManage