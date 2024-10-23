package com.green.Supplier.item.controller;


import com.green.Supplier.cus.vo.CusVO;
import com.green.Supplier.item.service.ItemService;
import com.green.Supplier.item.vo.ItemVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemController {
    @Resource(name = "itemService")
    private ItemService itemService;

    @GetMapping("/get")
    public List<ItemVO> getItem(){
        return itemService.getItem();
    }

//    상품 목록 조회
    @GetMapping("/itemList")
    public List<ItemVO> selectCartItems(){
        return itemService.selectCartItems();
    }

//    장바구니 상품 등록
    @PostMapping("/insert")
    public void insertCart(@RequestBody ItemVO itemVO){
        itemService.insertCart(itemVO);
    }
}
