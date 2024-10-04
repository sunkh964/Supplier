import logo from './logo.svg';
import './App.css';
import './reset.css';
import { Route, Routes } from 'react-router-dom';
import UserLayout from './pages/user/UserLayout';
import AdminLayout from './pages/admin/AdminLayout';
import UserHome from './pages/user/UserHome';
import AdminHome from './pages/admin/AdminHome';

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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
