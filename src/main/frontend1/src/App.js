import './App.css';
import './reset.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
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

function App() {

const navigaite=useNavigate();

const [loginInfo, setLoginInfo] = useState({});
useEffect(() => {
  const sessionLoginInfo = window.sessionStorage.getItem('loginInfo');

  if (sessionLoginInfo != null) {
    const obj_loginInfo = JSON.parse(sessionLoginInfo);
    setLoginInfo(obj_loginInfo);
  }
}, []);

  return (
    <div className="App">
      <div className='header'>
      <div className='auth-links'>
      {
  Object.keys(loginInfo).length === 0 ? (
    <>
      <span onClick={() => { navigaite('login'); }}>로그인</span>
      <span> | </span>
      <span onClick={() => { navigaite('join'); }}>회원가입</span>
    </>
  ) : (
    <>
      <span>{loginInfo.supmName}님 반갑습니다</span>
      <span> | </span>
      <span onClick={() => {
        window.sessionStorage.removeItem('loginInfo');
        setLoginInfo({});
        navigaite('/');
      }}>로그아웃</span>
    </>
  )
}
        </div>
        <div className='header-content'>
          <h1><i className="bi bi-capsule-pill"></i>그린카페 의약품</h1>
        <div className='header-content' onClick={(e)=>{navigaite('/')}}>
          <h1><i class="bi bi-capsule-pill"></i>그린카페 의약품</h1>
        </div>
      </div>
      <div className='layout-div'>
        <Routes>
          {/* 홈 화면 */}
          <Route path='/' element={<UserLayout />}>
            <Route path='' element={<UserHome />} />
            <Route path='login' element={<Login setLoginInfo={setLoginInfo} 
              loginInfo={loginInfo} />}/>
            <Route path='join' element={<Join/>}/>
            <Route path='cart' element={<Cart/>}/>
          </Route>
  
          {/* 관리자 페이지 */}
          <Route path='/admin' element={<AdminLayout/>}>
            <Route path='' element={<AdminHome />} />
            <Route path='orderManage' element={<OrderManage />} />
            <Route path='cusList' element={<CusList />} />
            <Route path='shipManage' element={<ShipManage />} />
            <Route path='shipItemManage' element={<ShipItemManage />} />
            <Route path='itemManage' element={<ItemManage />} />
            <Route path='addItem' element={<AddItem />} />
            <Route path='salesManage' element={<SalesManage />} />
          </Route>
        </Routes>
      </div>
    </div>
    </div>
  );
}

export default App;