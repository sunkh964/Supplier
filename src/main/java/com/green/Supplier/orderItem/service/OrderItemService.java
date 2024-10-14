package com.green.Supplier.orderItem.service;

import com.green.Supplier.orderItem.vo.OrderItemVO;
import com.green.Supplier.orderItem.vo.SalesDataVO;

import java.util.List;

public interface OrderItemService {
//    공급사 주문서 목록
    List<OrderItemVO> getOrderList();

    //<!-- 당월 매출 조회 -->
    List<OrderItemVO> getSales();


}
