package com.green.Supplier.item.controller;


import com.green.Supplier.cus.vo.CusVO;
import com.green.Supplier.item.service.ItemService;
import com.green.Supplier.item.vo.ItemVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
