import React, { useEffect, useState } from 'react'
import "./ShipManage.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../common/Modal';

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
    axios.post(`/orderItem/getOrderList`, searchInfo)
    .then((res) => {
      setOrderList(res.data);
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
        .then((res) => {setRefresh(prev => !prev);})
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

  // -------------------- 모달 ----------------------
  const [updateModal, setUpdateModal] = useState(false);
  const [modifyActive, setModifyActive] = useState(false);
  const [modalContent, setModalContent] = useState({});

      // 버튼 클릭 시 모달창 활성화
  function ResSelUpdate(orderNum) {
    setModifyActive(true);
    setModalContent(orderList[orderNum-1]);
    setUpdateModal(true); // 모달 열기
  }

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`; // yyyyMMdd 형식으로 반환
  };

  // 임의의 10자리 숫자 생성 함수
  const generateRandomNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  // 모달 내용
  function drawModalContent() {
    const orderDateFormatted = formatDate(modalContent.orderDate); // 날짜 포맷팅
    console.log(orderDateFormatted);
    const randomNumber = generateRandomNumber(); // 임의의 숫자 생성
    const orderNumber = `${orderDateFormatted}-${randomNumber}`; // 최종 주문번호
    console.log(modalContent);

    return (
      <div className='orderDetail'>
        <div className='sales-title'>
          <i className="bi bi-check-all"></i> 주문서
        </div>
        <div className='table-div1'>
          <div>주문번호 : <span>{orderNumber}</span></div>
          <table className='tabled'>
            
            
            {Object.keys(modalContent).length > 0 && (
              <tbody>
                <tr>
                  <td>상호</td>
                  <td colSpan={5}>{modalContent.cusVO.cusName}</td>
                </tr>
                <tr>
                  <td>배송지</td>
                  <td colSpan={5}>{modalContent.cusVO.cusAddr}</td>
                </tr>
                <tr>
                  <td>연락처</td>
                  <td colSpan={5}>{modalContent.cusVO.cusTel}</td>
                </tr>
                <tr>
                  <td>주문 날짜</td>
                  <td colSpan={5}>{modalContent.orderDate}</td>
                </tr>
                <tr>
                  <td>배송 현황</td>
                  <td colSpan={5}>{modalContent.deliverVO.deliStatus}</td>
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
                      <tbody>
                        {modalContent.orderDetailList.map((content, i) => (
                          <tr key={i}>
                            <td>{content.itemVO.itemName}</td>
                            <td>{content.typeVO.typeName}</td>
                            <td>{content.itemVO.price.toLocaleString()}</td>
                            <td>{content.orderCnt}</td>
                            <td>{content.detailPrice.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>총 가격</td>
                  <td colSpan={5}>{modalContent.totalPrice.toLocaleString()}</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    );
  }

  function drawFooterContent() {}

  // 모달 닫기 및 페이지 새로고침
  function handleBtn() {
    setUpdateModal(false); // 모달 닫기
  }  
  // -------------------- 모달 ----------------------

  return (
    <div className='ship-container'>
      <div className='sales-title'>
        <sapn><i className="bi bi-check-all"></i></sapn> 출하관리 <span>- 주문서 관리</span>
      </div>
      <div className='top-div'>
        <div className='row'>
            {/* 정렬 라디오 버튼 */}
          <div className='sort-div btn-div'>
            <div className='radio-btn'>
              <input type='radio' id='addr-radio' name='sortValue' className='radio' value='DESC' checked={sortChecked === 'DESC'} onChange={(e) => {handleSortChange(e);}} />
              <label for='addr-radio'>주문 번호 <i className="bi bi-caret-down-fill" /></label>
            </div>
            <div className='radio-btn'>
              <input type='radio' id='order-num-radio' name='sortValue' className='radio' value='ASC' checked={sortChecked === 'ASC'} onChange={(e) => {handleSortChange(e);}} />
              <label for='order-num-radio'>주문 번호 <i className="bi bi-caret-up-fill" /></label>
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
          <label for='after-deliver'>배송완료/주문취소 항목 제외</label>
        </div>
      </div>

      <div className='table-div'>
        <table>
          <colgroup>
            <col width={"6%"} />
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
                if ((hideDelivered && order.deliverVO.deliStatus === '배송완료') || (hideDelivered && order.deliverVO.deliStatus === '주문취소')) {
                  return null;
                }

                return (
                  <tr key={i}>
                    <td className='order-go' onClick={() => {
                      // navigate(`/admin/orderDetail/${order.orderNum}`);
                      ResSelUpdate(i+1);
                      }}>{order.orderNum}</td>
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

      {updateModal && (
        <Modal 
          content={drawModalContent} 
          setIsShow={setUpdateModal} 
          setModifyActive={setModifyActive}
          clickCloseBtn={handleBtn} 
          footerContent={drawFooterContent}
        />
      )}

    </div>
  )
}

export default ShipManage