package com.green.Supplier.item.controller;


import com.green.Supplier.item.service.ItemService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/item")
public class ItemController {
    @Resource(name = "itemService")
    private ItemService itemService;
}
