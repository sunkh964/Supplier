import React, { useState } from 'react'
import './Join.css';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Join = () => {
    //daum 주소 api 팝업창을 띄우기 위한 함수 선언
    const open = useDaumPostcodePopup();
    const navigate = useNavigate();
  
    const [joinData, setJoinData] = useState({
      supmNum: '',
      supmName: '',
      supmAddr: '',
      // supmBirth: '',
      supmTel: '',
      supmId: '',
      supmPw: '',
    });
  
    const [isDisabled, setIsDisabled] = useState(true);
    const [validationErrors, setValidationErrors] = useState({});
  
    const validateId = (id) => /^[a-zA-Z]{4,12}$/.test(id);
    const validatePassword = (password) => /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,12}$/.test(password);
    // const validateBirth = (birth) => /^\d{6}$/.test(birth);
    
    function handleComplete(data) {
      setJoinData({
        ...joinData,
        supmAddr: data.roadAddress,
      });
    }
    
    function handleClick() {
      open({ onComplete: handleComplete });
    }

    console.log(joinData);
    
    function join() {
      const errors = {};
  
      if (!validateId(joinData.supmId)) {
        errors.supmId = 'ID는 4~12자 영문만 포함해야 합니다.';
      }
      if (!validatePassword(joinData.supmPw)) {
        errors.supmPw = '비밀번호는 4~12자 영문 소문자와 숫자만 포함해야 합니다.';
      }
      // if (!validateBirth(joinData.supmBirth)) {
      //   errors.supmBirth = '생년월일은 6자리 숫자여야 합니다.';
      // }
      if (!joinData.supmTel || !joinData.supmAddr) {
        alert('모든 정보를 입력해주세요.');
        return;
      }
  
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }
  

      axios.post('/supm/join', joinData)
        .then((res) => {
          alert('회원가입 성공');
          setJoinData(res.data);
          navigate('/login');
        })
        .catch((error) => {
          console.log(error);
          alert('회원가입 실패');
        });
    }
  
    function changeJoinData(e) {
      const { name, value } = e.target;
  
      let errors = {};
      switch (name) {
        case 'supmId':
          if (!validateId(value)) {
            errors.supmId = 'ID는 4~12자 영문만 포함해야 합니다.';
          }
          break;
        case 'supmPw':
          if (!validatePassword(value)) {
            errors.supmPw = '비밀번호는 4~12자 영문 소문자와 숫자만 포함해야 합니다.';
          }
          break;
        // case 'supmBirth':
        //   if (!validateBirth(value)) {
        //     errors.supmBirth = '생년월일은 6자리 숫자여야 합니다.';
        //   }
        //   break;
        default:
          break;
      }
  
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        ...errors,
      }));
  
      setJoinData({
        ...joinData,
        [e.target.name]:e.target.value
      });
  
      if (!errors[name]) {
        setValidationErrors((prevErrors) => {
          const { [name]: _, ...rest } = prevErrors;
          return rest;
        });
      }
    }

  
    function checkId() {
      if (joinData.supmId === '') {
        alert('아이디를 입력해 주세요');
        return;
      }
  
      axios.get(`/supm/checkId/${joinData.supmId}`)
        .then((res) => {
          const result = res.data;
          
          if (result) {
            alert('ID 중복');
            setIsDisabled(true);
          } else {
            alert('사용 가능');
            setIsDisabled(false);
          }
        })
        .catch((error) => {
          alert('오류 발생');
          console.log(joinData.supmId); // ID 값 확인
          console.log(error);
        });
    }


  return (
<div className='body-lo'>
  <div class="form-structor">
    <div class="login">
      <div class="center">
        <h2 class="form-title" id="join">회원가입</h2>
        <div class="form-holder">
          <input type="text" name='supmId' onChange={(e)=>{changeJoinData(e)}} class="input" placeholder="아이디" />{validationErrors.supmId && <div className="error-message">{validationErrors.supmId}</div>}
          <input type="password" name='supmPw' onChange={(e)=>{changeJoinData(e)}} class="input" placeholder="비밀번호" />{validationErrors.supmPw && <div className="error-message">{validationErrors.supmPw}</div>}
        <input type="password" name='supmPw' onChange={(e)=>{changeJoinData(e)}} class="input" placeholder="비밀번호 확인" />
        <input type="text" name='supmTel' onChange={(e)=>{changeJoinData(e)}} class="input" placeholder="전화번호" />{validationErrors.supmTel && <div className="error-message">{validationErrors.supmTel}</div>}
        <input type="text" name='supmName' onChange={(e)=>{changeJoinData(e)}} class="input" placeholder="이름" />
        <input type="text" name='supmAddr' onChange={(e)=>{changeJoinData(e)}} class="input" placeholder="주소" />{validationErrors.supmAddr && <div className="error-message">{validationErrors.supmAddr}</div>}
        </div>
        <button class="submit-btn1" onClick={(e)=>{checkId(e)}}>아이디 중복확인</button>
        <button class="submit-btn" type='button' disabled={isDisabled} onClick={(e)=>{join()}}>회원가입</button>
      </div>
    </div>
  </div>
</div>
  )
}

export default Join