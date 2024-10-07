import React from 'react'
import './SalesManage.css'
import SalesChart from './SalesChart'

const SalesManage = () => {
  return (
    <div className='sales'>
      <div className='sales-1'>
        매출 관리
      </div>

      <div className='sales-2'>
        <div className='s2'>
          <div>매출액<span className='s2-title'>당월</span></div>
          <div>
            <div className='s2-icon'><i class="bi bi-cash-coin"></i></div>
            <div>ㅇ</div>
          </div>
        </div>
        <div className='s2'>
          <div>주문량<span className='s2-title'>금일</span></div>
          <div>
            <div className='s2-icon'><i class="bi bi-receipt-cutoff"></i></div>
            <div></div>
          </div>
        </div>
        <div className='s2'>
          <div>고객<span className='s2-title'>병원</span></div>
          <div>
            <div className='s2-icon'><i class="bi bi-people-fill"></i></div>
            <div></div>
          </div>
        </div>
      </div>

      <div className='sales-3'>
        <div className='s3-chart'>
          <SalesChart />
        </div>
      </div>
    </div>
  )
}

export default SalesManage