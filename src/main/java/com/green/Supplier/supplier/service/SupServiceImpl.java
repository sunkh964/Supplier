package com.green.Supplier.supplier.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("supService")
public class SupServiceImpl implements SupService{
    @Autowired
    private SqlSessionTemplate sqlSession;


}
