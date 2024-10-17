import React from 'react'
import './UserHome.css';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
  const navigaite=useNavigate();
  return (
    <div>
              <div className='main'>
          <section id="products" className="products">
            <h2>추천 제품</h2>
            <div className="product-list">
              <div className="product-card">
                  <img src={'http://localhost:8081/images/16232bl.jpg'} alt="그림2" />
                  <h3>니들</h3>
                  <p>10000원</p>
                  <button className='btn0' onClick={()=>{navigaite('cart')}} >장바구니에 담기</button>
              </div>
              <div className="product-card">
                  <img src={'http://localhost:8081/images/1574069809000_m.png'}  alt="제품 2" />
                  <h3>석션 카테터</h3>
                  <p>15000원</p>
                  <button className='btn0' onClick={()=>{navigaite('cart')}} >장바구니에 담기</button>
              </div>
              <div className="product-card">
                  <img  src={'http://localhost:8081/images/1689662196937m0.jpg'} alt="제품 3" />
                  <h3>라텍스 장갑</h3>
                  <p>20000원</p>
                  <button className='btn0' onClick={()=>{navigaite('cart')}} >장바구니에 담기</button>
              </div>
              <div className="product-card">
                  <img src={'http://localhost:8081/images/40131am.jpg'} alt="제품 4" />
                  <h3>리도칸 크림</h3>
                  <p>20000원</p>
                  <button className='btn0' onClick={()=>{navigaite('cart')}} >장바구니에 담기</button>
              </div>
              <div className="product-card">
                  <img src={'http://localhost:8081/images/40132am.jpg'} alt="제품 5" />
                  <h3>리포라제주</h3>
                  <p>15000원</p>
                  <button className='btn0' onClick={()=>{navigaite('cart')}} >장바구니에 담기</button>
              </div>
              <div className="product-card">
                  <img src={'http://localhost:8081/images/1689840293622m0.jfif'} alt="제품 6" />
                  <h3>포비돈</h3>
                  <p>10000원</p>
                  <button className='btn0' onClick={()=>{navigaite('cart')}} >장바구니에 담기</button>
              </div>
          </div>
        </section>
      </div>
      <div className='footer'>
        <p>&copy; 2024 의약품 쇼핑몰. 모든 권리 보유.</p>
      </div>
    </div>
  )
}

export default UserHome