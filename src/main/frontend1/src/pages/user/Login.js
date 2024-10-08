import React from 'react'
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigaite=useNavigate();
  return (
    <div className='body-lo'>
<div class="form-structor">
  <div class="signup">
    <h2 class="title1" id="signup">로그인</h2>
    <div class="form-holder">
      <input type="text" class="input" placeholder="아이디" />
      <input type="password" class="input" placeholder="비밀번호" />
    </div>
    <button class="submit-btn">로그인</button>
  </div>
  <div class="login slide-up">
    <div class="center">
      <h2 class="form-title" id="login" onClick={(e)=>{navigaite('/join')}} ><span>or</span>회원가입</h2>
      <div class="form-holder">
        <input type="email" class="input" placeholder="Email" />
        <input type="password" class="input" placeholder="Password" />
      </div>
      <button class="submit-btn">Log in</button>
    </div>
  </div>
</div>
    </div>
  )
}
export default Login