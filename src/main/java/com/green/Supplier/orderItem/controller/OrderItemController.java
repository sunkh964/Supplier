package com.green.Supplier.orderItem.controller;

import com.green.Supplier.orderItem.service.OrderItemService;
import com.green.Supplier.orderItem.vo.OrderItemVO;
import com.green.Supplier.orderItem.vo.SalesDataVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orderItem")
public class OrderItemController {
    @Resource(name = "orderItemService")
    private OrderItemService orderItemService;

//    공급사 주문 목록
    @GetMapping("/getOrderList")
    public List<OrderItemVO> getOrderList() {
        List<OrderItemVO> result = orderItemService.getOrderList();
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+ result);
        return result;
    }

    //<!-- 매출 조회 -->
    @GetMapping("/getSales")
    public List<OrderItemVO> getSales(){
        return orderItemService.getSales();
    }


}

