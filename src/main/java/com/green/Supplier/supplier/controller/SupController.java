package com.green.Supplier.supplier.controller;

import com.green.Supplier.supplier.service.SupService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sup")
public class SupController {
    @Resource(name = "supService")
    private SupService supService;
}
