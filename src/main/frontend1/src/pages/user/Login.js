import React, { useState } from 'react'
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({setLoginInfo}) => {
  const navigaite=useNavigate();

    // 로그인 성공 실패 여부
    const [isLogin, setIsLogin]=useState(false);

    // 입력한 id, pw를 저장하는 변수
    const [loginData, setLoginData]=useState({
      supmId: '',
      supmPw:'',
      supmRole:''
    });
  
    // 입력한 id, pw를 loginData에 저장하는 함수
    function changeLoginData(e){
      setLoginData({
        ...loginData,
        [e.target.name]:e.target.value
      });
    }
  
  
    function login(){
      //id,pw 입력 여부 확인
      if(loginData.supmId == '' || loginData.supmPw == ''){
        alert('정보를 입력해주세요')
        return ;
      }
  
      axios.post('/supm/login', loginData)
      .then((res)=>{
        if(res.data==''){
          setIsLogin(false);
          alert('로그인 실패')
        }
        else{     // 로그인 성공시
          setIsLogin(true);
          const loginInfo={
            supmId:res.data.supmId,
            supmPw:res.data.supmPw,
            supmNum:res.data.supmNum,
            supmName:res.data.supmName,
            supmRole:res.data.supmRole
          };
          alert('로그인 성공')
  
          //로그인 정보를 가진 객체를 문자열 형태로 변환
          //객체 -> 문자열로 변환한 데이터를 JSON 데이터로 부른다.
          const json_loginInfo = JSON.stringify(loginInfo);
          //sessionStoragy에 로그인한 회원의 아이디, 이름, 권한정보 등록
          window.sessionStorage.setItem('loginInfo', json_loginInfo);
          //로그인 정보를 저장
          setLoginInfo(loginInfo);
          console.log(loginInfo.supmRole);
        // admin으로 로그인한 경우 admin 페이지로 이동
        if (loginInfo.supmRole === 'ADMIN') {
          navigaite('/admin'); // admin 전용 페이지로 이동
        } else {
          navigaite('/'); // 일반 사용자 페이지로 이동
        }
        }
      })
      .catch((error)=>{
        console.log(error);
      });}
  
  


  return (
    <div className='body-lo'>
<div className="form-structor">
  <div className="signup">
    <h2 className="title1" id="signup">로그인</h2>
    <div className="form-holder">
      <input type="text" className="input" name='supmId' onChange={(e)=>{changeLoginData(e)}} placeholder="아이디" />
      <input type="password" className="input" name='supmPw' onChange={(e)=>{changeLoginData(e)}} placeholder="비밀번호" />
    </div>
    <button className="submit-btn"  onClick={(e) => {login()}} >로그인</button>
  </div>
  <div className="login slide-up">
    <div className="center">
      <h2 className="form-title" id="login" onClick={(e)=>{navigaite('/join')}} >
        <span>or</span>회원가입</h2>
      <div className="form-holder">
      </div>
      <button className="submit-btn">Log in</button>
    </div>
  </div>
</div>
    </div>
  );
}
export default Login