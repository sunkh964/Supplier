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
                  <img src={'http://localhost:8081/images/그림2.png'} alt="그림2" />
                  <h3>제품 이름 1</h3>
                  <p>제품 설명 1</p>
                  <button className='btn0' onClick={()=>{navigaite('cart')}} >장바구니에 담기</button>
              </div>
              <div className="product-card">
                  <img src={'http://localhost:8081/images/images.png'}  alt="제품 2" />
                  <h3>제품 이름 2</h3>
                  <p>제품 설명 2</p>
                  <button className='btn0' onClick={()=>{navigaite('cart')}} >장바구니에 담기</button>
              </div>
              <div className="product-card">
                  <img src="product3.jpg" alt="제품 3" />
                  <h3>제품 이름 3</h3>
                  <p>제품 설명 3</p>
                  <button className='btn0' onClick={()=>{navigaite('cart')}} >장바구니에 담기</button>
              </div>
              <div className="product-card">
                  <img src="product4.jpg" alt="제품 4" />
                  <h3>제품 이름 4</h3>
                  <p>제품 설명 4</p>
                  <button className='btn0' onClick={()=>{navigaite('cart')}} >장바구니에 담기</button>
              </div>
              <div className="product-card">
                  <img src="product5.jpg" alt="제품 5" />
                  <h3>제품 이름 5</h3>
                  <p>제품 설명 5</p>
                  <button className='btn0' onClick={()=>{navigaite('cart')}} >장바구니에 담기</button>
              </div>
              <div className="product-card">
                  <img src="product6.jpg" alt="제품 6" />
                  <h3>제품 이름 6</h3>
                  <p>제품 설명 6</p>
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