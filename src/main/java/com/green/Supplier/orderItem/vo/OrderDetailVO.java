package com.green.Supplier.orderItem.vo;

import com.green.Supplier.item.vo.ItemVO;
import lombok.Data;

@Data
public class OrderDetailVO {
    private int detailNum;
    private int orderCnt;
    private int itemNum;
    private ItemVO itemVO;
    private int detailPrice;
    private int orderNum;
    private OrderItemVO orderItemVO;
}
