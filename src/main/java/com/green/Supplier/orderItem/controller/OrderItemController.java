package com.green.Supplier.orderItem.controller;

import com.green.Supplier.orderItem.service.OrderItemService;
import com.green.Supplier.orderItem.vo.OrderDetailVO;
import com.green.Supplier.orderItem.vo.OrderItemVO;
import com.green.Supplier.orderItem.vo.SalesDataVO;
import com.green.Supplier.orderItem.vo.SearchVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/orderItem")
public class OrderItemController {
    @Resource(name = "orderItemService")
    private OrderItemService orderItemService;

//    공급사 주문 목록
    @PostMapping("/getOrderList")
    public List<OrderItemVO> getOrderList(@RequestBody(required = false) SearchVO searchVO) {
        List<OrderItemVO> result = orderItemService.getOrderList(searchVO);
        return result;
    }

//주문 상세 내역 확인
    @GetMapping("/orderDetail/{orderNum}")
    public List<OrderItemVO> getOrderDetail(@PathVariable("orderNum") int orderNum) {
        System.out.println("Requested Order Number: " + orderNum);
        return orderItemService.getOrderDetail(orderNum);
    }

    //주문 상세 내역 확인
    @GetMapping("/detail/{orderNum}")
    public List<OrderItemVO> getDetail(@PathVariable("orderNum") int orderNum) {
        System.out.println("Requested Order Number: " + orderNum);
        return orderItemService.getDetail(orderNum);
    }
//<!--===============================================================-->
    //<!-- 매출 조회 -->
    @GetMapping("/getSales")
    public List<OrderItemVO> getSales(){
        return orderItemService.getSales();
    }
    /* 제품당 주문량 조회 */
    @GetMapping("/getOrderCnt")
    public List<OrderDetailVO> getOrderCnt(){
        return orderItemService.getOrderCnt();
    }

//<!--===============================================================-->

//    공급사 개별상품 목록
    @PostMapping("/getOrderDetailList")
    public List<OrderItemVO> getOrderDetailList(@RequestBody(required = false) SearchVO searchVO) {
        System.out.println(searchVO);

        //주문 정보에서 주문번호만 조회 [1,2,3]
        List<OrderItemVO> orderItemList =  orderItemService.getOrderNumList(searchVO.getSortValue());

        for(OrderItemVO orderItem : orderItemList) {
            searchVO.setOrderNum(orderItem.getOrderNum());
            List<OrderDetailVO> result = orderItemService.getOrderDetailList(searchVO);

            orderItem.setOrderDetailList(result);
        }

        System.out.println(orderItemList);
        return orderItemList;
    }

//   주문 취소 = 주문 취소로 업데이트
    @PutMapping("/cancelOrder/{orderNum}")
    void cancelOrder(@PathVariable("orderNum") int orderNum) {
        orderItemService.cancelOrder(orderNum);
    }

//   개별 주문 취소
    @PutMapping("/cancelDetail")
    void cancelDetail(@RequestBody OrderDetailVO detailVO) {
        orderItemService.cancelDetail(detailVO);
        int cancelCnt = orderItemService.getCancelCnt(detailVO.getOrderNum());
        int itemCnt = orderItemService.getItemCnt(detailVO.getOrderNum());
        if (cancelCnt == itemCnt) {
            orderItemService.setAllCanceled(detailVO.getOrderNum());
        }
    }

//    개별 상품 배송 시작
    @PutMapping("/setDeliStart")
    void setDeliStart(@RequestBody OrderDetailVO orderDetailVO) {
        orderItemService.setDeliStart(orderDetailVO);
        int orderStartCnt = orderItemService.getDeliStartCnt(orderDetailVO.getOrderNum());
        int itemCnt = orderItemService.getItemCnt(orderDetailVO.getOrderNum());
        if (orderStartCnt == itemCnt) {
            orderItemService.setDelisStart(orderDetailVO);
        }
    }

//    상품 배송 시작
    @PutMapping("/setDelisStart")
    void setDelisStart(@RequestBody List<OrderDetailVO> orderDetailList) {
        for (OrderDetailVO orderDetail : orderDetailList) {
            orderItemService.setDelisStart(orderDetail);
        }
    }
}

