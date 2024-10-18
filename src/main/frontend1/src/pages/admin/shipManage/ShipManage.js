import React, { useEffect, useState } from 'react'
import "./ShipManage.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ShipManage = () => {

  const navigate = useNavigate();

  // 주문서 저장
  const [orderList, setOrderList] = useState([]);

  // 체크박스 상태 관리
  const [hideDelivered, setHideDelivered] = useState(false);

  // 정렬 상태 관리
  const [sortChecked, setSortChecked] = useState('DESC'); 

  // 검색 정보 기본값 저장
  const [searchInfo, setSearchInfo] = useState({
    searchType: 'CUS_NAME',
    searchValue: '',
    sortValue: ''
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
    searchInfoChange(e);
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
    const fetchOrderList = async () => {
        try {
          const res = await axios.post(`/orderItem/getOrderList`, searchInfo);
          setOrderList(res.data);
        } catch (error) {
          alert(error);
        }
    };
    fetchOrderList();
  }, [refresh, searchInfo.sortValue]);
  
  // 배송 시작 후 변경 값 저장
  const [orderDetail, setOrderDetail] = useState([]);

  // 배송 시작 버튼 함수
  const delisStart = (orderDetailList) => {
    console.log(orderDetailList);
    const addDetail = orderDetailList.map((detail, i) => (
      {
        detailNum: detail.detailNum,
        itemNum: detail.itemNum
      }
    ))
    setOrderDetail(prevDetails => [...prevDetails, ...addDetail]);
  }

  // 배송 시작 시 put
  useEffect(() => {
    if (orderDetail.length != 0) {
      if (window.confirm('배송을 시작하시겠습니까?')) {
        axios.put(`/orderItem/setDelisStart`, orderDetail)
        .then((res) => {setRefresh(prev => !prev); })
        .catch((error) => {alert(error)});
      } else { return; }
    }
  }, [orderDetail]);
  
  // 주문 취소 함수 버튼
  const cancelOrder = (orderNum) => {
    if (window.confirm('상품의 주문을 취소하시겠습니까?')) {
        axios.put(`/orderItem/cancelOrder/${orderNum}`)
        .then((res) => { setRefresh(prev => !prev); })
        .catch((error) => {alert(error)});
    } else { return; }
  }

  return (
    <div className='ship-container'>
      <div className='top-div'>
        <div className='row'>
            {/* 정렬 라디오 버튼 */}
          <div className='sort-div btn-div'>
            <div className='radio-btn'>
              <input type='radio' id='addr-radio' name='sortValue' className='radio' value='DESC' checked={sortChecked === 'DESC'} onChange={(e) => {handleSortChange(e);}} />
              <label for='addr-radio'>주문 번호 <i class="bi bi-caret-down-fill" /></label>
            </div>
            <div className='radio-btn'>
              <input type='radio' id='order-num-radio' name='sortValue' className='radio' value='ASC' checked={sortChecked === 'ASC'} onChange={(e) => {handleSortChange(e);}} />
              <label for='order-num-radio'>주문 번호 <i class="bi bi-caret-up-fill" /></label>
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
          <label for='after-deliver'>배송 완료 항목 제외</label>
        </div>
      </div>

      <div className='table-div'>
        <table>
          <colgroup>
            <col width={"5%"} />
            <col width={"10%"} />
            <col width={"15%"} />
            <col width={"8%"} />
            <col width={"*"} />
            <col width={"11%"} />
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
                let color; let isAbleCancel;
                  switch (order.deliverVO.deliStatus) {
                    case '주문취소':
                      color = 'red';
                      isAbleCancel = true;
                      break;
                    case '배송완료':
                      color = 'blue';
                      isAbleCancel = true;
                      break;
                    case '배송중':
                      color = '';
                      isAbleCancel = true;
                      break;
                    default:
                      color = 'grey';
                      isAbleCancel = false;
                      break;
                  }

                // '배송완료'라면 <tr> 제거
                if (hideDelivered && order.deliverVO.deliStatus === '배송완료') {
                  return null;
                }

                return (
                  <tr key={i}>
                    <td onClick={() => {navigate(`/admin/orderDetail/${order.orderNum}`);}}>{order.orderNum}</td>
                    <td>{order.cusVO.cusName}</td>
                    <td className='long-text'>{order.orderDate}</td>
                    <td>{order.totalPrice.toLocaleString()}</td>
                    <td className='long-text'>{order.cusVO.cusAddr}</td>
                    <td className='long-text'>{order.cusVO.cusTel}</td>
                    <td className={`deli-status deli-${color}`}>{order.deliverVO.deliStatus}</td>
                    <td><button type='button' className='cancel-order' 
                    onClick={(e) => {cancelOrder(order.orderNum)}} disabled={isAbleCancel}
                    >주문 취소</button></td>
                    <td><button type='button'
                    onClick={() => {delisStart(order.orderDetailList)}} disabled={isAbleCancel}
                    >배송 시작</button></td>
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