import React from 'react'
import { Outlet } from 'react-router-dom'
import "./UserLayout.css";

const UserLayout = () => {
  return (
    <div>
      <div className='main1'>
      <div class="dropdown">
            <button class="dropbtn"> 
              <span class="dropbtn_icon">의료기기</span><i class="bi bi-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="#">1</a>
              <a href="#">1 a post</a>
              <a href="#">1-3</a>
            </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn"> 
            <span class="dropbtn_icon">소모품</span><i class="bi bi-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a href="#">222</a>
            <a href="#">222 a post</a>
            <a href="#">222-3</a>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn"> 
            <span class="dropbtn_icon">문의하기</span><i class="bi bi-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a href="#">3</a>
            <a href="#">3 a post</a>
            <a href="#">3-3</a>
          </div>
        </div>
      </div>
      <div><Outlet /></div>
    </div>
  )
}

export default UserLayout