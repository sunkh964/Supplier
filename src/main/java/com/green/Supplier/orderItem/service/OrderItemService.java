package com.green.Supplier.orderItem.service;

import com.green.Supplier.orderItem.vo.OrderDetailVO;
import com.green.Supplier.orderItem.vo.OrderItemVO;
import com.green.Supplier.orderItem.vo.SalesDataVO;
import com.green.Supplier.orderItem.vo.SearchVO;

import java.util.List;

public interface OrderItemService {

    //<!-- 당월 매출 조회 -->
    List<OrderItemVO> getSales();

    List<OrderItemVO> getOrderList(SearchVO searchVO);

//    공급사 개별상품주문 목록
    List<OrderDetailVO> getOrderDetailList(SearchVO searchVO);

//    주문번호 목록 조회
    List<Integer> getOrderNumList();

//   주문 취소=주문서 삭제
    void deleteOrder(int orderNum);

//   개별 주문 취소
    void deleteDetail(int detailNum);

//    개별 주문 배송 시작
    void setDeliStart(int detailNum);

//    주문 배송 시작
    void setDelisStart(int orderNum);
}
