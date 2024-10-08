package com.green.Supplier.supm.service;

import com.green.Supplier.supm.vo.SupmVO;

public interface SupmService {

//    회원가입
    void join(SupmVO supmVO);

//    아이디 중복
    boolean isDuplicate(String supmId);

//    로그인
    SupmVO login (SupmVO supmVO);
}
