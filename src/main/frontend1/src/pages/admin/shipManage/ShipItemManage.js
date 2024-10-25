import React, { useEffect, useState } from 'react'
import "./ShipManage.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../common/Modal';

const ShipItemManage = () => {

   const navigate = useNavigate();

   // 주문품목 저장
   const [orderDetailList, setOrderDetailList] = useState([]);
   console.log(orderDetailList);
   // 체크박스 상태 관리
   const [hideDelivered, setHideDelivered] = useState(false);

   // 정렬 상태 관리
   const [sortChecked, setSortChecked] = useState('DESC'); 

   // 검색 정보 기본값 저장
   const [searchInfo, setSearchInfo] = useState({
      searchType: 'ITEM_NAME',
      searchValue: '',
      sortValue: 'DESC',
      noDeliver : false   //배송완료 및 주문취소 제외 여부
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
      setSearchInfo({
         ...searchInfo,
         noDeliver : !searchInfo.noDeliver
      });
   }

   // 정렬 라디오 버튼 onChange 함수
   const handleSortChange = (e) => {
      setSortChecked(e.target.value);
   };

   // 화면 리렌더링 상태 저장
   const [refresh, setRefresh] = useState(false);

   // 주문품목 불러오기
   useEffect(() => {
      const fetchOrderDetailList = async () => {
         try {
            const res = await axios.post(`/orderItem/getOrderDetailList`, searchInfo);
            setOrderDetailList(res.data);
         } catch (error) { alert(error); }
      };
      fetchOrderDetailList();
   }, [refresh, searchInfo.sortValue, searchInfo.noDeliver]);

   // 배송 시작 후 변경 값 저장
   const [orderDetail, setOrderDetail] = useState({
      itemNum: 0,
      detailNum: 0
   });

   // 배송 시작 버튼 함수
   const deliStart = (each) => {
      setOrderDetail({
         ...orderDetail,
         orderCnt: each.orderCnt,
         itemNum: each.itemNum,
         detailNum: each.detailNum,
         orderNum: each.orderNum
      });
   }

   // 배송 시작 시 put
   useEffect(() =>{
      if (orderDetail.detailNum != 0) {
         if (window.confirm('배송을 시작하시겠습니까?')) {
            axios.put(`/orderItem/setDeliStart`, orderDetail)
            .then((res) => {setRefresh(prev => !prev); console.log(orderDetail)})
            .catch((error) => {alert(error)});
         } else { return; }
      }
   }
   , [orderDetail]);
   
   // 개별 상품 주문 취소 시 주문서 번호도 들고가야함
   const [cancelOrder, setCancelOrder] = useState({
      orderNum: 0,
      detailNum : 0
   });

   // 개별 상품 주문 취소 함수 버튼
   const cancelDetail = (each) => {
      setCancelOrder({
         ...cancelOrder,
         orderNum: each.orderNum,
         detailNum : each.detailNum
      })
   }

   // 개별 상품 주문 취소 put
   useEffect(() => {
      if (cancelOrder.detailNum != 0) {
         if (window.confirm('상품의 주문을 취소하시겠습니까?')) {
            axios.put(`/orderItem/cancelDetail`, cancelOrder)
            .then((res) => { setRefresh(prev => !prev);})
            .catch((error) => {alert(error)});
         } else { return; }
      }
   }, [cancelOrder]);

   // 검색하기 버튼 함수
   const searchBtn = () => {
      axios.post(`/orderItem/getOrderDetailList`, searchInfo)
      .then((res) => {
         setOrderDetailList(res.data);
         console.log("검색 성공");
      })
      .catch((error) => {alert(error);});
   }

   // 리스트 그리기
   const drawDetailList = orderDetailList.map((orderItem, i) => {
      const details = orderItem.orderDetailList;

      return (
         details.map((each, j) => {
            let deliColor; let stockColor; let isAbleCancel; let isAbleDeliver;
            switch (each.deliverVO.deliStatus) {
               case '주문취소':
                  deliColor = 'red';
                  isAbleCancel = true;
                  isAbleDeliver = true;
                  break;
         
               case '배송완료':
                  deliColor = 'blue';
                  isAbleCancel = true;
                  isAbleDeliver = true;
                  break;
         
               case '배송중':
                  deliColor = '';
                  isAbleCancel = true;
                  isAbleDeliver = true;
                  break;
         
               case '상품준비중':
               case '주문확인중':
                  if (each.itemVO.stock < each.orderCnt) {
                     deliColor = 'red';
                     stockColor = 'red'
                     isAbleCancel = false;
                     isAbleDeliver = true;
                  } else {
                     deliColor = 'grey';
                     isAbleCancel = false;
                     isAbleDeliver = false;
                  }
                  break;
         
               default:
                  deliColor = 'grey';
                  isAbleCancel = false;
                  isAbleDeliver = false;
                  break;
         }

            return (
               <tr key={each.detailNum}>
                  {j === 0 ? (<td rowSpan={ details.length} className='order-go' onClick={() => {
                     // navigate(`/admin/orderDetail/${each.orderNum}`);
                     ResSelUpdate(each.orderNum);
                     }}>{each.orderNum}</td>) : null}
                  <td >{each.detailNum}</td>
                  <td>{each.typeVO.typeName}</td>
                  <td><img src={`http://localhost:8081/images/${each.itemVO.itemImg}`} className='item-img' /></td>
                  <td>{each.itemVO.itemName}</td>
                  <td>{each.itemVO.stock}</td>
                  <td className={`stock-${stockColor}`}>{each.orderCnt}</td>
                  <td>{each.itemVO.price.toLocaleString()}</td>
                  <td>{each.detailPrice.toLocaleString()}</td>
                  {j === 0 ? (<td rowSpan={details.length}>{orderItem.orderDate}</td>) : null}
                  <td>{each.departTime ? each.departTime : '-'}</td>
                  <td>{each.arriveTime ? each.arriveTime : '-'}</td>
                  <td className={`deli-status deli-${deliColor}`}>{each.deliverVO.deliStatus}</td>
                  <td><button type='button' className='cancel-order' onClick={() => cancelDetail(each)} disabled={isAbleCancel}>주문 취소</button></td>
                  <td><button type='button' onClick={() => {deliStart(each)}} disabled={isAbleDeliver}>배송 시작</button></td>
               </tr>
            );
         })
      );
   });

     // -------------------- 모달 ----------------------
   const [updateModal, setUpdateModal] = useState(false);
   const [modifyActive, setModifyActive] = useState(false);
   const [modalContent, setModalContent] = useState({});

         // 버튼 클릭 시 모달창 활성화
   function ResSelUpdate(orderNum) {
      setModifyActive(true);
      axios.get(`/orderItem/orderDetail/${orderNum}`)
      .then((res) => {setModalContent(res.data)})
      .catch((error) => {console.log(error)});
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
         
         {modalContent.length > 0 && (
            <tbody>
               <tr>
               <td>상호</td>
               <td colSpan={5}>{modalContent[0].cusVO.cusName}</td>
               </tr>
               <tr>
               <td>배송지</td>
               <td colSpan={5}>{modalContent[0].cusVO.cusAddr}</td>
               </tr>
               <tr>
               <td>연락처</td>
               <td colSpan={5}>{modalContent[0].cusVO.cusTel}</td>
               </tr>
               <tr>
               <td>주문 날짜</td>
               <td colSpan={5}>{modalContent[0].orderDate}</td>
               </tr>
               <tr>
               <td>배송 현황</td>
               <td colSpan={5}>{modalContent[0].deliverVO.deliStatus}</td>
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
                     {modalContent[0].orderDetailList.map((content, i) => (
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
                  <td colSpan={5}>{modalContent[0].totalPrice.toLocaleString()}</td>
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
        <sapn><i class="bi bi-check-all"></i></sapn> 출하관리 <span>- 개별 주문 관리</span>
      </div>
         <div className='top-div'>
            <div className='row'>
               {/* 정렬 라디오 버튼 */}
            <div className='sort-div btn-div'>
               <div className='radio-btn'>
                  <input type='radio' id='addr-radio' name='sortValue' className='radio' value='DESC' checked={sortChecked === 'DESC'} onChange={(e) => {handleSortChange(e); searchInfoChange(e);}} />
                  <label for='addr-radio'>주문 번호 <i class="bi bi-caret-down-fill" /></label>
               </div>
               <div className='radio-btn'>
                  <input type='radio' id='order-num-radio' name='sortValue' className='radio' value='ASC' checked={sortChecked === 'ASC'} onChange={(e) => {handleSortChange(e); searchInfoChange(e);}} />
                  <label for='order-num-radio'>주문 번호 <i class="bi bi-caret-up-fill" /></label>
               </div>
            </div>
            <div className='search-div'>
               <select name='searchType'>
                  <option value={"ITEM_NAME"}>상품명</option>
                  <option value={"ORDER_DATE"}>주문일자</option>
               </select>
               <input type='text' name='searchValue' onChange={(e) => {searchInfoChange(e)}}></input>
               <button type='button' onClick={() => {searchBtn()}}>검색</button>
            </div>
            </div>
            <div className='sort-div btn-div'>
            <input type='checkbox' id='after-deliver' className='after-deliver' checked={hideDelivered} onChange={handleCheckboxChange}/>
            <label for='after-deliver'>배송완료/주문취소 항목 제외</label>
            </div>
         </div>

         <div className='table-div'>
            <table>
               <colgroup>
                  <col width={"3%"} />
                  <col width={"3%"} />
                  <col width={"6%"} />
                  <col width={"5%"} />
                  <col width={"*%"} />
                  <col width={"4%"} />
                  <col width={"6%"} />
                  <col width={"4%"} />
                  <col width={"4%"} />
                  <col width={"8%"} />
                  <col width={"8%"} />
                  <col width={"8%"} />
                  <col width={"6%"} />
                  <col width={"7%"} />
                  <col width={"7%"} />
               </colgroup>
               <thead>
                  <tr>
                     <td>주문번호</td>
                     <td>개별번호</td>
                     <td>상품 타입</td>
                     <td>이미지</td>
                     <td>상품명</td>
                     <td>재고</td>
                     <td>주문 수량</td>
                     <td>가격</td>
                     <td>총 가격</td>
                     <td>주문 시간</td>
                     <td>출발 시간</td>
                     <td>도착 시간</td>
                     <td>배송 현황</td>
                     <td>주문 취소</td>
                     <td>배송 시작</td>
                  </tr>
               </thead>
            <tbody>
            {                  
               drawDetailList
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

export default ShipItemManage