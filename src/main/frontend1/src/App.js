import './App.css';
import './reset.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import UserLayout from './pages/user/UserLayout';
import AdminLayout from './pages/admin/AdminLayout';
import UserHome from './pages/user/UserHome';
import AdminHome from './pages/admin/AdminHome';
import OrderManage from './pages/admin/orderManage/OrderManage';
import CusList from './pages/admin/orderManage/CusList';
import ShipManage from './pages/admin/shipManage/ShipManage';
import ItemManage from './pages/admin/itemManage/ItemManage';
import AddItem from './pages/admin/itemManage/AddItem';
import SalesManage from './pages/admin/salesManage/SalesManage';
import ShipItemManage from './pages/admin/shipManage/ShipItemManage';
import Login from './pages/user/Login';
import Join from './pages/user/Join';
import Cart from './pages/user/Cart';
import { useEffect, useState } from 'react';
import OrderDtail from './pages/admin/orderManage/OrderDtail';

function App() {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 가져오기
  const [loginInfo, setLoginInfo] = useState({});

  useEffect(() => {
    const sessionLoginInfo = window.sessionStorage.getItem('loginInfo');
    if (sessionLoginInfo != null) {
      const obj_loginInfo = JSON.parse(sessionLoginInfo);
      setLoginInfo(obj_loginInfo);
    }
  }, []);

  // 로그인 및 회원가입 페이지 확인
  const isAuthPage = location.pathname === '/login' || location.pathname === '/join';

  return (
    <div className="App">
      <div className='header'>
        {/* auth-links 부분을 숨기는 조건 */}
        {!isAuthPage && (
          <div className='auth-links'>
            {
              Object.keys(loginInfo).length === 0 ? (
                <>
                  <span onClick={() => { navigate('login'); }}>로그인</span>
                  <span> | </span>
                  <span onClick={() => { navigate('join'); }}>회원가입</span>
                </>
              ) : (
                <>
                  <span>{loginInfo.supmName}님 반갑습니다</span>
                  <span> | </span>
                  <span onClick={() => {
                    window.sessionStorage.removeItem('loginInfo');
                    setLoginInfo({});
                    navigate('/');
                  }}>로그아웃</span>
                </>
              )
            }
          </div>
        )}
        <div className='header-content' onClick={() => { navigate('/'); }}>
          <h1><i className="bi bi-capsule-pill"></i>그린카페 의약품</h1>
        </div>
      </div>
      <div className='layout-div'>
        <Routes>
          {/* 홈 화면 */}
          <Route path='/' element={<UserLayout />}>
            <Route path='' element={<UserHome />} />
            <Route path='cart' element={<Cart />} />
          </Route>
          <Route path='login' element={<Login setLoginInfo={setLoginInfo} loginInfo={loginInfo} />} />
          <Route path='join' element={<Join />} />

          {/* 관리자 페이지 */}
          <Route path='/admin' element={<AdminLayout />}>
            <Route path='' element={<OrderManage />} />
            <Route path='cusList' element={<CusList />} />
            <Route path='shipManage' element={<ShipManage />} />
            <Route path='shipItemManage' element={<ShipItemManage />} />
            <Route path='itemManage' element={<ItemManage />} />
            <Route path='addItem' element={<AddItem />} />
            <Route path='salesManage' element={<SalesManage />} />
            <Route path='orderDetail/:orderNum' element={<OrderDtail />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
