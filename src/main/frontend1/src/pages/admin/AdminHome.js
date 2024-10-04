import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminHome = () => {
  return (
    <div >
      <div>dd</div>
      <div className='side-menu'>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminHome