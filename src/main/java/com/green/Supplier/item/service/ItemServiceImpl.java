package com.green.Supplier.item.service;

import com.green.Supplier.item.vo.ItemVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("itemService")
public class ItemServiceImpl implements ItemService {
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public List<ItemVO> getItem() {
        return sqlSession.selectList("itemMapper.getItem");
    }
}
