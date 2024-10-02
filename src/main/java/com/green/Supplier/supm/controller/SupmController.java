package com.green.Supplier.supm.controller;

import com.green.Supplier.supm.service.SupmService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/supm")
public class SupmController {
    @Resource(name = "supmService")
    private SupmService supmService;


}
