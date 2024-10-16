package com.green.Supplier.cus.service;

import com.green.Supplier.cus.vo.CusVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("cusService")
public class CusServiceImpl implements CusService {
    @Autowired
    private SqlSessionTemplate sqlSession;


    @Override
    public List<CusVO> getCus() {
        return sqlSession.selectList("cusMapper.getCus");
    }
}
