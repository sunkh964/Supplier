package com.green.Supplier.orderItem.service;

import com.green.Supplier.orderItem.vo.*;
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
    public List<OrderItemVO> getOrderNumList(String sortValue) {
        return sqlSession.selectList("orderItemMapper.getOrderNumList", sortValue);
    }

    @Override
    public int getItemCnt(int orderNum) {
        return sqlSession.selectOne("orderItemMapper.getItemCnt", orderNum);
    }

    @Override
    public void cancelOrder(int orderNum) {
        sqlSession.delete("orderItemMapper.cancelOrder", orderNum);
    }

    @Override
    public void cancelDetail(OrderDetailVO detailVO) {
        sqlSession.delete("orderItemMapper.cancelDetail", detailVO.getDetailNum());
    }

    @Override
    public int getCancelCnt(int orderNum) {
        return sqlSession.selectOne("orderItemMapper.getCancelCnt", orderNum);
    }

    @Override
    public void setAllCanceled(int orderNum) {
        sqlSession.update("orderItemMapper.setAllCanceled", orderNum);
    }

    @Override
    public void setDeliStart(OrderDetailVO orderDetailVO) {
        sqlSession.update("orderItemMapper.setDeliStart", orderDetailVO);
    }

    @Override
    public int getDeliStartCnt(int orderNum) {
        return sqlSession.selectOne("orderItemMapper.getDeliStartCnt", orderNum);
    }

    @Override
    public void setDelisStart(OrderDetailVO orderDetailVO) {
        sqlSession.update("orderItemMapper.setDelisStart", orderDetailVO);
    }

//<!--===============================================================-->
    /*매출 조회*/
    @Override
    public List<OrderItemVO> getSales() {
        return sqlSession.selectList("orderItemMapper.getSales");
    }

    /* 제품 당 주문량 조회 */
    @Override
    public List<OrderDetailVO> getOrderCnt() {
        return sqlSession.selectList("orderItemMapper.getOrderCnt");
    }
}
