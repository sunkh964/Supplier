package com.green.Supplier.orderItem.vo;

import com.green.Supplier.cus.vo.CusVO;
import com.green.Supplier.item.vo.ItemVO;
import com.green.Supplier.item.vo.TypeVO;
import lombok.Data;

@Data
public class OrderDetailVO {
    private int detailNum;
    private int orderCnt;
    private int itemNum;
    private int detailPrice;
    private int orderNum;
    private ItemVO itemVO;
    private String departTime;
    private String arriveTime;
    private DeliverVO deliverVO;
    private CusVO cusVO;
    private TypeVO typeVO;
}
