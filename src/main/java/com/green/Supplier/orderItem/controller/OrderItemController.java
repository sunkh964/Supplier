package com.green.Supplier.orderItem.controller;

import com.green.Supplier.orderItem.service.OrderItemService;
import com.green.Supplier.orderItem.vo.OrderAmountVO;
import com.green.Supplier.orderItem.vo.OrderItemVO;
import com.green.Supplier.orderItem.vo.SearchVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orderItem")
public class OrderItemController {
    @Resource(name = "orderItemService")
    private OrderItemService orderItemService;

    /*주문 목록*/
    @PostMapping("/selectOrderItem")
    public List<OrderItemVO> selectOrderItem(@RequestBody(required = false) SearchVO searchVO) {
        return orderItemService.selectOrderItem(searchVO);
    }
    /*당월 총 주문금액*/
    @GetMapping("/totalOrderAmount")
    public List<OrderAmountVO> totalOrderAmount(){
        return orderItemService.totalOrderAmount();
    }


}
