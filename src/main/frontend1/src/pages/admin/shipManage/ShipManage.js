import React from 'react'
import "./ShipManage.css"

const ShipManage = () => {
  return (
    <div className='ship-container'>
      <div className='top-div'>
        <div>
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
          <input type='checkbox' />
          <span>배송 완료 제외</span>
        </div>
      </div>
      <div className='table-div'>
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
          <tr>
            <td>주문번호</td>
            <td>고객</td>
            <td>주문날짜</td>
            <td>총 가격</td>
            <td>주소</td>
            <td>연락처</td>
            <td>배송 완료 여부</td>
            <td>주문 취소</td>
            <td>배송 시작</td>
          </tr>
        </tbody>
      </div>
    </div>
  )
}

export default ShipManage

/*
  리스트
    검색) 주문날짜… 고객…
    목록) 주문번호, 고객, 주문날짜, 총 가격, 주소, 연락처, 배송 완료 여부
    버튼) 주문 취소, 배송 시작

  개별
    주문번호, 상품 타입, 이미지, 상품명, 재고 수(비교해서 빨강), 주문수량, 개당 가격, 상품 별 총 가격, 주문 시간, 배송 출발 시간, 도착 시간, 배송현황
    버튼) 주문 취소, 배송 시작

*/