package com.green.Supplier.cus.controller;

import com.green.Supplier.cus.service.CusService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cus")
public class CusController {
    @Resource(name = "cusService")
    private CusService cusService;


}
