package com.green.Supplier.cus.controller;

import com.green.Supplier.cus.service.CusService;
import com.green.Supplier.cus.vo.CusVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/cus")
public class CusController {
    @Resource(name = "cusService")
    private CusService cusService;

    @GetMapping("/get")
    public List<CusVO> getCus(){
        return cusService.getCus();
    }

}
