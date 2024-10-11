package com.green.Supplier.orderItem.vo;

import com.green.Supplier.cus.vo.CusVO;
import lombok.Data;

@Data
public class OrderItemVO {
    private int orderNum;
    private int totalPrice;
    private String orderDate;
    private int cusNum;
    private int deliNum;
    private CusVO cusVO;
    private DeliverVO deliverVO;
    private OrderDetailVO orderDetailVO;
}
