package com.green.Supplier.supm.service;

import com.green.Supplier.supm.vo.SupmVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("supmService")
public class SupmServiceImpl implements SupmService{
    @Autowired
    private SqlSessionTemplate sqlSession;

//회원가입
    @Override
    public void join(SupmVO supmVO) {
        sqlSession.insert("supmMapper.join", supmVO);
    }

//    아이디 중복 확인
    @Override
    public boolean isDuplicate(String supmId) {
        String id=sqlSession.selectOne("supmMapper.isDuplicate", supmId);
        return id!=null;
    }

//    로그인
    @Override
    public SupmVO login(SupmVO supmVO) {
        return sqlSession.selectOne("supmMapper.login", supmVO);
    }
}
