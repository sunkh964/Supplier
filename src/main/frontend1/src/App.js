import './App.css';
import './reset.css';
import { Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <div className="App">
      <Routes>
        {/* 홈 화면 */}
        <Route path='/' element={<UserLayout />}>
          <Route path='' element={<UserHome />} />
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
  );
}

export default App;