import React from 'react'
import './Cart.css';

const Cart = () => {
  return (
  <div className='body-ca'>
    <table className='table'>
      <thead className='t-ca'>
        <tr>
          <th>check</th>
          <th>제품명</th>
          <th>가격</th>
          <th>수량</th>
          <th>날짜</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input type='checkbox'></input></td>
          <td>주사기 26G</td>
          <td>10,000원</td>
          <td><input type='number' min="1" max="50"></input></td>
          <td>01/13/1979</td>
        </tr>
        <tr>
          <td><input type='checkbox'></input></td>
          <td>혈압기기</td>
          <td>20,000원</td>
          <td><input type='number' min="1" max="50"/></td>
          <td>06/09/1971</td>
        </tr>
      </tbody>
    </table>
    <button className='btn1'>주문하기</button>
  </div>
  )
}

export default Cart