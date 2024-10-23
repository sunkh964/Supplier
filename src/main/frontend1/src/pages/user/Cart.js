import React, { useEffect, useState } from 'react'
import './Cart.css';
import axios from 'axios';

const Cart = () => {
    //조회한 장바구니 목록 데이터를 저장할 변수
    const [cartList, setCartList] = useState([]);

    // 장바구니 목록 조회
    useEffect(()=>{
      const loginInfo = JSON.parse(window.sessionStorage.getItem('loginInfo'));

      axios.get(`/item/itemList/${loginInfo.supmId}`)
      .then((res)=>{
        console.log(res.data);
        setCartList(res.data);
      }).catch((error)=>{});
    }, []);

  return (
  <div className='body-ca'>
    <table className='table'>
      <thead className='t-ca'>
        <tr>
          <th>check</th>
          <th>제품 타입</th>
          <th>제품명</th>
          <th>가격</th>
          <th>수량</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input type='checkbox'></input></td>
          <td>상품 A</td>
          <td>석션카테터</td>
          <td>15000원</td>
          <td><input type="number" name="quantity" min="1" /></td>
        </tr>
      </tbody>
    </table>
    <button className='btn1'>주문하기</button>
  </div>
  )
}

export default Cart