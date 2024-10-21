package com.green.Supplier.orderItem.service;

import com.green.Supplier.orderItem.vo.*;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface OrderItemService {

    //<!-- 당월 매출 조회 -->
    List<OrderItemVO> getSales();

    /* 제품 당 주문량 조회 */
    List<OrderDetailVO> getOrderCnt();

//<!--===============================================================-->

    List<OrderItemVO> getOrderList(SearchVO searchVO);

//    주문 상세내역 조회
    List<OrderItemVO> getOrderDetail(int orderNum);

    //    주문 상세내역 조회
    List<OrderItemVO> getDetail(int orderNum);

    //    공급사 개별상품주문 목록
    List<OrderDetailVO> getOrderDetailList(SearchVO searchVO);

//    주문번호 목록 조회
    List<OrderItemVO> getOrderNumList(String sortValue);

//    주문 당 상품 개수 파악
    int getItemCnt(int orderNum);

//   주문 취소 = 주문 취소로 업데이트
    void cancelOrder(int orderNum);

//   개별 주문 취소
    void cancelDetail(OrderDetailVO detailVO);

//    전체 주문취소인지 파악
    int getCancelCnt(int orderNum);

//    상세 내역이 전부 주문취소면 주문서도 주문취소로 변경
    void setAllCanceled(int orderNum);

//    개별 주문 배송 시작
    void setDeliStart(OrderDetailVO orderDetailVO);

    int getDeliStartCnt(int orderNum);

//    주문 배송 시작
    void setDelisStart(OrderDetailVO orderDetailVO);
}
