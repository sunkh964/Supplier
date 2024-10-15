package com.green.Supplier.orderDetail.controller;

import com.green.Supplier.orderDetail.service.OrderDetailService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orderDetail")
public class OrderDetailController {
    @Resource(name="orderDetailService")
    private OrderDetailService orderDetailService;


}
