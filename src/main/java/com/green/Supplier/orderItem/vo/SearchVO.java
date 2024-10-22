package com.green.Supplier.orderItem.vo;

import lombok.Data;

@Data
public class SearchVO {
    private String searchType;
    private String searchValue;
    private int orderNum;
    private String sortType;
    private String sortValue;
    private boolean noDeliver;
}