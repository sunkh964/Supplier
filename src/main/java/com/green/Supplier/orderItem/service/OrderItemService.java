package com.green.Supplier.orderItem.service;

import com.green.Supplier.orderItem.vo.OrderDetailVO;
import com.green.Supplier.orderItem.vo.OrderItemVO;
import com.green.Supplier.orderItem.vo.SearchVO;

import java.util.List;

public interface OrderItemService {
//    공급사 주문서 목록
    List<OrderItemVO> getOrderList(SearchVO searchVO);
//    공급사 개별상품주문 목록
    List<OrderDetailVO> getOrderDetailList(SearchVO searchVO);
}
