import React, { useEffect, useState } from 'react'
import "./ShipManage.css"
import axios from 'axios';

const ShipItemManage = () => {

   // 주문품목 저장
   const [orderDetailList, setOrderDetailList] = useState([]);

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

   // 화면 리렌더링 상태 저장
   const [refresh, setRefresh] = useState(false);

   // 주문품목 불러오기
   useEffect(() => {
      const fetchOrderDetailList = async () => {
         try {
            const res = await axios.post(`/orderItem/getOrderDetailList`, searchInfo);
            setOrderDetailList(res.data);
         } catch (error) {
            alert(error);
         }
      };
      fetchOrderDetailList();
   }, [refresh]);
   
   // 배송 시작 버튼 함수
   const deliStart = (detailNum) => {
      if (window.confirm('배송을 시작하시겠습니까?')) {
         axios.put(`/orderItem/setDeliStart/${detailNum}`)
         .then((res) => {setRefresh(prev => !prev); })
         .catch((error) => {alert(error)});
      } else { return; }
   }
   
   // 개별 상품 주문 취소 함수 버튼
   const deleteDetail = (detailNum) => {
      if (window.confirm('상품의 주문을 취소하시겠습니까?')) {
         axios.delete(`/orderItem/deleteDetail/${detailNum}`)
         .then((res) => { setRefresh(prev => !prev); })
         .catch((error) => {alert(error)});
      } else { return; }
   }


   const drawDetailList = Object.keys(orderDetailList).reverse().map((orderNum, i) => {
      const details = orderDetailList[orderNum];

      // '배송완료'가 있는지 여부를 확인
      const hasDelivered = details.some(each => each.deliverVO.deliStatus === '배송완료');

      return (
         details.reverse().map((each, j) => {
            let color;  
            switch (each.deliverVO.deliStatus) {
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
            if (hideDelivered && each.deliverVO.deliStatus === '배송완료') {
               return null;
            }

            return (
               <tr key={each.detailNum}>
                  {j === 0 ? (
                     <td rowSpan={hasDelivered && hideDelivered ? 0 : details.length}>
                        {each.orderNum}
                     </td>
                  ) : null}
                  <td>{each.detailNum}</td>
                  <td>{each.typeVO.typeName}</td>
                  <td><img src={`http://localhost:8081/images/${each.itemVO.itemImg}`} className='item-img' /></td>
                  <td>{each.itemVO.itemName}</td>
                  <td>{each.itemVO.stock}</td>
                  <td>{each.orderCnt}</td>
                  <td>{each.itemVO.price}</td>
                  <td>{each.detailPrice.toLocaleString()}</td>
                  <td>{each.orderItemVO ? each.orderItemVO.orderDate : '-'}</td>
                  <td>{each.departTime ? each.departTime : '-'}</td>
                  <td>{each.arriveTime ? each.arriveTime : '-'}</td>
                  <td className={`deli-status deli-${color}`}>{each.deliverVO.deliStatus}</td>
                  <td><button type='button' className='cancel-order' onClick={() => deleteDetail(each.detailNum)}>주문 취소</button></td>
                  <td><button type='button' onClick={() => {deliStart(each.detailNum)}}>배송 시작</button></td>
               </tr>
            );
         })
      );
   });
   

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
               <select name='searchType'>
                  <option value={"ITEM_NAME"}>상품명</option>
               </select>
               <input type='text' name='searchValue'></input>
               <button type='button'>검색</button>
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
                  <col width={"4%"} />
                  <col width={"5%"} />
                  <col width={"5%"} />
                  <col width={"*%"} />
                  <col width={"4%"} />
                  <col width={"4%"} />
                  <col width={"4%"} />
                  <col width={"4%"} />
                  <col width={"9%"} />
                  <col width={"9%"} />
                  <col width={"9%"} />
                  <col width={"7%"} />
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
      </div>
      )
}

export default ShipItemManage