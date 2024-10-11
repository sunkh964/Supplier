package com.green.Supplier.orderItem.controller;

import com.green.Supplier.orderItem.service.OrderItemService;
import com.green.Supplier.orderItem.vo.OrderDetailVO;
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

//    공급사 주문 목록
    @PostMapping("/getOrderList")
    public List<OrderItemVO> getOrderList(@RequestBody(required = false) SearchVO searchVO) {
        List<OrderItemVO> result = orderItemService.getOrderList(searchVO);
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+ result);
        return result;
    }

//    공급사 개별상품 목록
    @PostMapping("/getOrderDetailList")
    public List<OrderDetailVO> getOrderDetailList(@RequestBody(required = false) SearchVO searchVO) {
        List<OrderDetailVO> result = orderItemService.getOrderDetailList(searchVO);
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+ result);
        return result;
    }
}
