package com.green.Supplier.item.service;

import com.green.Supplier.item.vo.ItemVO;

import java.util.List;

public interface ItemService {
    List<ItemVO> getItem();

//    상품 목록조회
    List<ItemVO> selectCartItems();

//    장바구니 등록
    void insertCart(ItemVO itemVO);
}
