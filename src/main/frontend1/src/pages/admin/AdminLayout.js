import React, { useState } from 'react';
import './AdminLayout.css';
import { Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();

  const [isShow, setIsShow] = useState(null);

  const [adminMenu, setAdminMenu] = useState([
    {
      title: '수주 관리',
      path: '/admin/orderManage',
      subMenu: [
        { title: '주문 목록', path: '/admin/orderManage' },
        { title: '고객 목록', path: '/admin/cusList' },
      ]
    },
    {
      title: '출하 관리',
      path: '/admin/shipManage',
      subMenu: [
        { title: '주문서 관리', path: '/admin/shipManage' },
        { title: '개별 주문 관리', path: '/admin/shipItemManage' },
      ]
    },
    {
      title: '제품 관리',
      path: '/admin/itemManage',
      subMenu: [
        { title: '재고 목록', path: '/admin/itemManage' },
        { title: '재고 추가', path: '/admin/addItem' },
      ]
    },
    {
      title: '매출 관리',
      path: '/admin/salesManage',
      subMenu: [
        { title: '직원 스케쥴 목록', path: '/admin/salesManage' }
      ]
    }
  ]);

  const clickMenu = (index, path) => {
    setIsShow(isShow === index ? null : index);
    if (path) {
      navigate(path);
    }
  };

  const clickSubMenu = (subPath) => {
    navigate(subPath);
  };

  return (
    <div className='adminLayout'>
      <div className='adminLayout-content'>
        <div className='side-menu'>
          {adminMenu.map((menu, index) => (
            <div key={index} className="menu-titles">
              <div
                className={`menu-title ${isShow === index ? 'active' : ''}`}
                onClick={() => clickMenu(index, menu.path)}
              >
                <div className='menu-title-content'>
                  {menu.title}
                  <span><i className="bi bi-caret-down-fill"></i></span>
                </div>
              </div>
              {isShow === index && (
                <div className='dropdown-menu'>
                  <ul>
                    {menu.subMenu.map((sub, subi) => (
                      <li
                        key={subi}
                        onClick={() => clickSubMenu(sub.path)}
                      >
                        {sub.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className='main-menu'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
