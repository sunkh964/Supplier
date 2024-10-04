import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>AdminLayout
      
      <div><Outlet /></div>
    </div>
  )
}

export default AdminLayout