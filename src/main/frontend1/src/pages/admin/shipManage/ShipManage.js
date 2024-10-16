import React, { useEffect, useState } from 'react'
import "./ShipManage.css"
import axios from 'axios';

const ShipManage = () => {

  // 주문서 저장
  const [orderList, setOrderList] = useState([]);

  // 체크박스 상태 관리
  const [hideDelivered, setHideDelivered] = useState(false);

  // 정렬 상태 관리
  const [sortChecked, setSortChecked] = useState('sortOrderNumDown'); 

  // 검색 정보 기본값 저장
  const [searchInfo, setSearchInfo] = useState({
    searchType: 'CUS_NAME',
    searchValue: ''
  });

  // 검색 searchInfo onChange 함수
  const searchInfoChange = (e) => {
    setSearchInfo({
      ...searchInfo,
      [e.target.name] : e.target.value
    })
  };

  // 배송완료 제외 체크박스 onChange 함수
  const handleCheckboxChange = () => {
    setHideDelivered(prev => !prev);
  };

  // 정렬 라디오 버튼 onChange 함수
  const handleSortChange = (e) => {
    setSortChecked(e.target.value);
  };

  // 검색하기 버튼 함수
  const searchBtn = () => {
    console.log("검색 실행");
    axios.post(`/orderItem/getOrderList`, searchInfo)
    .then((res) => {
      console.log(searchInfo);
      setOrderList(res.data);
      console.log("검색 성공");
    })
    .catch((error) => {alert(error);});
  }

  // 화면 리렌더링 상태 저장
  const [refresh, setRefresh] = useState(false);

  // 주문품목 불러오기
  useEffect(() => {
    const fetchOrderDetailList = async () => {
        try {
          const res = await axios.post(`/orderItem/getOrderList`, searchInfo);
          setOrderList(res.data);
        } catch (error) {
          alert(error);
        }
    };
    fetchOrderDetailList();
  }, [refresh]);
  
  // 배송 시작 버튼 함수
  const delisStart = (orderNum) => {
    if (window.confirm('배송을 시작하시겠습니까?')) {
        axios.put(`/orderItem/setDelisStart/${orderNum}`)
        .then((res) => {setRefresh(prev => !prev); })
        .catch((error) => {alert(error)});
    } else { return; }
  }
  
  // 주문 취소 함수 버튼
  const deleteOrder = (orderNum) => {
    if (window.confirm('상품의 주문을 취소하시겠습니까?')) {
        axios.delete(`/orderItem/deleteOrder/${orderNum}`)
        .then((res) => { setRefresh(prev => !prev); })
        .catch((error) => {alert(error)});
    } else { return; }
  }

  // 주문 취소 가능 여부
  const isAbleCancel = (e) => {
    console.log(e);
  }

  return (
    <div className='ship-container'>
      <div className='top-div'>
        <div className='row'>
            {/* 정렬 라디오 버튼 */}
          <div className='sort-div btn-div'>
            <div className='radio-btn'>
              <input type='radio' id='order-num-radio' name='sort-radio' className='radio' value='sortOrderNumDown' checked={sortChecked === 'sortOrderNumDown'} onChange={handleSortChange} />
              <label for='order-num-radio'>주문 번호 <i className="bi bi-caret-up-fill" /></label>
            </div>
            <div className='radio-btn'>
              <input type='radio' id='addr-radio' name='sort-radio' className='radio' value='sortOrderNumUp' checked={sortChecked === 'sortOrderNumUp'} onChange={handleSortChange} />
              <label for='addr-radio'>주문 번호 <i className="bi bi-caret-down-fill" /></label>
            </div>
          </div>
          <div className='search-div'>
            <select onClick={(e) => {searchInfoChange(e);}}>
              <option value="CUS_NAME">고객명</option>
              <option value="ORDER_DATE">주문일자</option>
            </select>
            <input type='text' name='searchValue' onChange={(e) => {searchInfoChange(e);}} />
            <button type='button' onClick={() => {searchBtn();}}>검색</button>
          </div>
        </div>
        <div className='sort-div btn-div'>
          <input type='checkbox' id='after-deliver' className='after-deliver' checked={hideDelivered} onChange={handleCheckboxChange} />
          <label for='after-deliver'>배송 완료 제외</label>
        </div>
      </div>

      <div className='table-div'>
        <table>
          <colgroup>
            <col width={"4%"} />
            <col width={"10%"} />
            <col width={"15%"} />
            <col width={"8%"} />
            <col width={"*"} />
            <col width={"10%"} />
            <col width={"10%"} />
            <col width={"10%"} />
            <col width={"10%"} />
          </colgroup>
          <thead>
            <tr>
              <td>주문번호</td>
              <td>고객명</td>
              <td>주문일자</td>
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
                let color;  
                  switch (order.deliverVO.deliStatus) {
                    case '주문취소':
                      color = 'red';
                      break;
                    case '배송완료':
                      color = 'blue';
                      break;
                    case '배송중':
                      color = '';
                      break;
                    default:
                      color = 'grey';
                      break;
                  } 

                // '배송완료'라면 <tr> 제거
                if (hideDelivered && order.deliverVO.deliStatus === '배송완료') {
                  return null;
                }

                return (
                  <tr key={i}>
                    <td>{order.orderNum}</td>
                    <td>{order.cusVO.cusName}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.totalPrice.toLocaleString()}</td>
                    <td>{order.cusVO.cusAddr}</td>
                    <td>{order.cusVO.cusTel}</td>
                    <td className={`deli-status deli-${color}`}>{order.deliverVO.deliStatus}</td>
                    <td><button type='button' className='cancel-order' 
                    onClick={(e) => {
                      // deleteOrder(order.orderNum);
                      isAbleCancel(e);}}
                    // disabled={true}
                    >주문 취소</button></td>
                    <td><button type='button'
                    onClick={() => {delisStart(order.orderNum)}}
                    disabled={true}>배송 시작</button></td>
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