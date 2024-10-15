import React from 'react'
import './OrderManage.css';

const OrderManage = () => {
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
              <td>주소</td>
              <td>연락처</td>
              <td>배송 완료 여부</td>
              <td>주문서 확인</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td><div class="btn-container">
                <a href="#" class="btn-3d blue">Button</a>
              </div></td>
            </tr>
            <tr>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td><div class="btn-container">
                <a href="#" class="btn-3d blue">Button</a>
              </div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderManage