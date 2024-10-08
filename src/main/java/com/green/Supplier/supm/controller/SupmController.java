package com.green.Supplier.supm.controller;

import com.green.Supplier.supm.service.SupmService;
import com.green.Supplier.supm.vo.SupmVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/supm")
public class SupmController {
    @Resource(name = "supmService")
    private SupmService supmService;

//    회원가입
    @PostMapping("/join")
    public void join(@RequestBody SupmVO supmVO){
        supmService.join(supmVO);
    }
//아이디 중복 확인
    @GetMapping("/checkId/{inputId}")
    public boolean checkId(@PathVariable("inputId")String inputId){

        return supmService.isDuplicate(inputId);
    }

}
