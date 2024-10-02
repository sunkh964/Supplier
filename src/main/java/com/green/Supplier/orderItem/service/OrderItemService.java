package com.green.Supplier.orderItem.service;

import com.green.Supplier.orderItem.vo.OrderAmountVO;
import com.green.Supplier.orderItem.vo.OrderItemVO;
import com.green.Supplier.orderItem.vo.SearchVO;

import java.util.List;

public interface OrderItemService {
    // 주문 목록 리스트
    List<OrderItemVO> selectOrderItem(SearchVO searchVO);

    /*당월 총 주문 금액*/
    List<OrderAmountVO> totalOrderAmount();
}
