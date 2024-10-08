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
import Login from './pages/user/Login';
import Join from './pages/user/Join';
import Cart from './pages/user/Cart';

function App() {
  const navigaite=useNavigate();
  return (
    <div className="App">
      <div className='header'>
      <div className='auth-links'>
          <span onClick={(e)=>{navigaite('login')}}>로그인</span>
          <span> | </span>
          <span onClick={(e)=>{navigaite('join')}}>회원가입</span>
        </div>
        <div className='header-content'>
<<<<<<< HEAD
          <h1><i class="bi bi-capsule-pill"></i>그린카페 의약품</h1>
=======
          <h1 onClick={()=>{navigaite('/')}}><i class="bi bi-capsule-pill"></i>그린카페 의약품 쇼핑몰</h1>
>>>>>>> nohk
        </div>
      </div>
      <div className='layout-div'>
        <Routes>
          {/* 홈 화면 */}
          <Route path='/' element={<UserLayout />}>
            <Route path='' element={<UserHome />} />
            <Route path='login' element={<Login/>}/>
            <Route path='join' element={<Join/>}/>
            <Route path='cart' element={<Cart/>}/>
          </Route>
  
          {/* 관리자 페이지 */}
          <Route path='/admin' element={<AdminLayout/>}>
            <Route path='' element={<AdminHome />} />
            <Route path='orderManage' element={<OrderManage />} />
            <Route path='cusList' element={<CusList />} />
            <Route path='shipManage' element={<ShipManage />} />
            <Route path='itemManage' element={<ItemManage />} />
            <Route path='addItem' element={<AddItem />} />
            <Route path='salesManage' element={<SalesManage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;