package com.green.Supplier.orderItem.controller;

import com.green.Supplier.orderItem.service.OrderItemService;
import com.green.Supplier.orderItem.vo.OrderDetailVO;
import com.green.Supplier.orderItem.vo.OrderItemVO;
import com.green.Supplier.orderItem.vo.SearchVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public Map<Integer, List<OrderDetailVO>> getOrderDetailList(@RequestBody(required = false) SearchVO searchVO) {
        Map<Integer, List<OrderDetailVO>> orderMap = new HashMap<>();

        //주문 정보에서 주문번호만 조회 [1,2,3]
        List<Integer> orderNumList =  orderItemService.getOrderNumList();

        for(int orderNum : orderNumList){
            searchVO.setOrderNum(orderNum);
            List<OrderDetailVO> result = orderItemService.getOrderDetailList(searchVO);
            orderMap.put(orderNum, result);
        }

        System.out.println(orderMap);
        return orderMap;
    }

//   주문 취소=주문서 삭제
    @DeleteMapping("/deleteOrder/{orderNum}")
    void deleteOrder(@PathVariable("orderNum") int orderNum) {
        orderItemService.deleteOrder(orderNum);
    }

//   개별 주문 취소
    @DeleteMapping("/deleteDetail/{detailNum}")
    void deleteDetail(@PathVariable("detailNum") int detailNum) {
        System.out.println(detailNum);
        orderItemService.deleteDetail(detailNum);
    }

//    개별 상품 배송 시작
    @PutMapping("/setDeliStart/{detailNum}")
    void setDeliStart(@PathVariable("detailNum") int detailNum) {
        orderItemService.setDeliStart(detailNum);
    }

//    상품 배송 시작
    @PutMapping("/setDelisStart/{orderNum}")
    void setDelisStart(@PathVariable("orderNum") int orderNum) {
        orderItemService.setDelisStart(orderNum);
    }
}
