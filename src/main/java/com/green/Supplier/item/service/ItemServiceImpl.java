package com.green.Supplier.item.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("itemService")
public class ItemServiceImpl implements ItemService {
    @Autowired
    private SqlSessionTemplate sqlSession;
}
