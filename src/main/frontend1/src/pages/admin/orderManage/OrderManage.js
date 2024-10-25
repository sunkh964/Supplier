import React, { useEffect, useState } from 'react';
import './OrderManage.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../../common/Modal';

const OrderManage = () => {
  const navigate = useNavigate();
  const { orderNum } = useParams();

  const [orderList, setOrderList] = useState([]);
  const [orderList2, setOrderList2] = useState([]);
  const [detailList, setDetailList] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});
  const [updateModal, setUpdateModal] = useState(false);
  const [modifyActive, setModifyActive] = useState(false);

  // 내역 목록 조회
  useEffect(() => {
    axios.post('/orderItem/getOrderList', searchInfo)
      .then((res) => {
        setOrderList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 버튼 클릭 시 모달창 활성화
  function ResSelUpdate(orderNum) {
    setModifyActive(true);

    axios.all([
      axios.get(`/orderItem/orderDetail/${orderNum}`),
      axios.get(`/orderItem/detail/${orderNum}`)
    ])
    .then(axios.spread((res1, res2) => {
      setOrderList2(res1.data); // 배열로 감싸서 상태 업데이트
      console.log(res1.data);
      setDetailList(res2.data);
      setUpdateModal(true); // 모달 열기
    }))
    .catch((error) => {
      console.log(error);
    });
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
    const orderDateFormatted = formatDate(orderList2[0].orderDate); // 날짜 포맷팅
    const randomNumber = generateRandomNumber(); // 임의의 숫자 생성
    const orderNumber = `${orderDateFormatted}-${randomNumber}`; // 최종 주문번호

    return (
      <div className='orderDetail'>
        <div className='sales-title'>
          <i className="bi bi-check-all"></i> 주문서
        </div>
        <div className='table-div1'>
          <div>주문번호 : <span>{orderNumber}</span></div>
          <table className='tabled'>
            {orderList2.length > 0 && (
              <tbody>
                <tr>
                  <td>상호</td>
                  <td colSpan={5}>{orderList2[0].cusVO.cusName}</td>
                </tr>
                <tr>
                  <td>배송지</td>
                  <td colSpan={5}>{orderList2[0].cusVO.cusAddr}</td>
                </tr>
                <tr>
                  <td>연락처</td>
                  <td colSpan={5}>{orderList2[0].cusVO.cusTel}</td>
                </tr>
                <tr>
                  <td>주문 날짜</td>
                  <td colSpan={5}>{orderList2[0].orderDate}</td>
                </tr>
                <tr>
                  <td>배송 현황</td>
                  <td colSpan={5}>{orderList2[0].deliverVO.deliStatus}</td>
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
                        {detailList.map((detail, i) => (
                          <tr key={i}>
                            <td>{detail.itemVO.itemName}</td>
                            <td>{detail.typeVO.typeName}</td>
                            <td>{detail.itemVO.price.toLocaleString()}</td>
                            <td>{detail.orderCnt}</td>
                            <td>{detail.detailPrice.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>총 가격</td>
                  <td colSpan={5}>{orderList2[0].totalPrice.toLocaleString()}</td>
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

  return (
    <div className='orderManage'>
      <div className='sales-title'>
        <span><i className="bi bi-check-all"></i></span> 수주관리
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
            {orderList.map((order, i) => (
              <tr className='table-div' key={i}>
                <td>{order.orderNum}</td>
                <td>{order.cusVO.cusName}</td>
                <td>{order.orderDate}</td>
                <td>{order.totalPrice.toLocaleString()}</td>
                <td>{order.cusVO.cusTel}</td>
                <td>{order.deliverVO.deliStatus}</td>
                <td>
                  <div className="btn-container" onClick={() => ResSelUpdate(order.orderNum)}>
                    <button className="btn-3d blue">Button</button>
                  </div>
                </td>
              </tr>
            ))}
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
  );
}

export default OrderManage;
