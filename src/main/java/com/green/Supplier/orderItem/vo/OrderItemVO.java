package com.green.Supplier.orderItem.vo;

import com.green.Supplier.cus.vo.CusVO;
import com.green.Supplier.item.vo.ItemVO;
import lombok.Data;

@Data
public class OrderItemVO {
    private int orderNum;
    private int orderCnt;
    private String orderDate;
    private String departTime;
    private String arriveTime;
    private int cusNum;
    private int itemNum;
    private int deliNum;
    private CusVO cusVO;
    private ItemVO itemVO;
    private DeliverVO deliverVO;
}
