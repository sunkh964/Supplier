package com.green.Supplier.item.vo;

import com.green.Supplier.supplier.vo.SupVO;
import lombok.Data;

@Data
public class ItemVO {
    private int itemNum;
    private String itemName;
    private int price;
    private int stock;
    private String itemCode;
    private String itemDetail;
    private String itemImg;
    private int typeNum;
    private TypeVO typeVO;
    private int supNum;
    private SupVO supVO;
}
