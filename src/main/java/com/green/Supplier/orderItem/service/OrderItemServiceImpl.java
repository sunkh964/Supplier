package com.green.Supplier.orderItem.service;

import com.green.Supplier.orderItem.vo.OrderAmountVO;
import com.green.Supplier.orderItem.vo.OrderItemVO;
import com.green.Supplier.orderItem.vo.SearchVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("orderItemService")
public class OrderItemServiceImpl  implements OrderItemService{
    @Autowired
    private SqlSessionTemplate sqlSession;

//    공급사 주문서 목록
    @Override
    public List<OrderItemVO> getOrderList() {
        return sqlSession.selectList("orderItemMapper.getOrderList");
    }
}
