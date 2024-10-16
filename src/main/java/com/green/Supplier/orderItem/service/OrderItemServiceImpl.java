package com.green.Supplier.orderItem.service;

import com.green.Supplier.orderItem.vo.OrderDetailVO;
import com.green.Supplier.orderItem.vo.OrderItemVO;
import com.green.Supplier.orderItem.vo.SearchVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("orderItemService")
public class OrderItemServiceImpl implements OrderItemService{
    @Autowired
    private SqlSessionTemplate sqlSession;

//    공급사 주문서 목록
    @Override
    public List<OrderItemVO> getOrderList(SearchVO searchVO) {
        return sqlSession.selectList("orderItemMapper.getOrderList", searchVO);
    }

    //주문 상세내역
    @Override
    public List<OrderItemVO> getOrderDetail(int orderNum) {
        return sqlSession.selectList("orderItemMapper.getOrderDetail", orderNum);
    }

    //주문 상세내역
    @Override
    public List<OrderItemVO> getDetail(int orderNum) {
        return sqlSession.selectList("orderItemMapper.getDetail", orderNum);
    }



    @Override
    public List<OrderDetailVO> getOrderDetailList(SearchVO searchVO) {
        return sqlSession.selectList("orderItemMapper.getOrderDetailList", searchVO);
    }

    @Override
    public List<Integer> getOrderNumList() {
        return sqlSession.selectList("orderItemMapper.getOrderNumList");
    }

    @Override
    public void deleteOrder(int orderNum) {
        sqlSession.delete("orderItemMapper.deleteOrder", orderNum);
    }

    @Override
    public void deleteDetail(int detailNum) {
        sqlSession.delete("orderItemMapper.deleteDetail", detailNum);
    }

    @Override
    public void setDeliStart(int detailNum) {
        sqlSession.update("orderItemMapper.setDeliStart", detailNum);
    }

    @Override
    public void setDelisStart(int orderNum) {
        sqlSession.update("orderItemMapper.setDelisStart", orderNum);
    }


    // <!-- 매출 조회 -->
    @Override
    public List<OrderItemVO> getSales() {
        return sqlSession.selectList("orderItemMapper.getSales");
    }




}
