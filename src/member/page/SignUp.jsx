import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { appAuth, appFireStore } from '../../firebase/config';
import { collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import Loading from '../../common/component/Loading';
import Swal from 'sweetalert2';
import logo from '../../common/resource/img/logo.png';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f7f6f9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const LogoBox = styled(Link)`
  width: 16rem;
  margin-bottom: 0.8rem;
  cursor: pointer;

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 14rem;
    margin-bottom: 0.3rem;
  }
`;

const Logo = styled.img`
  width: 16rem;

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 14rem;
  }
`;

const Title = styled.h1`
  color: #000000;
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 1.5rem;

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const Input = styled.input`
  border: solid 1px rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  width: 24rem;
  padding: 1rem 2rem;
  box-sizing: border-box;
  font-size: 1rem;
  outline: none;
  font-family: pretendard;

  &::placeholder {
    color: #a49f9f;
    font-size: 1rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 20rem;
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;

    &::placeholder {
      font-size: 0.9rem;
    }
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 16px;
  background-color: #00a8dd;
  color: #fff;
  font-weight: 600;
  width: 24rem;
  box-sizing: border-box;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  font-family: pretendard;
  cursor: pointer;
  margin-bottom: 0.8rem;

  &:hover {
    background-color: #4cb9e7;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 20rem;
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
`;

const SButton = styled(Link)`
  text-decoration: none;
  border: none;
  background-color: transparent;
  color: #607274;
  font-size: 1rem;
  font-family: pretendard;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 2rem;

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

function SignUp(props) {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [checkPW, setcheckPW] = useState('');

  const [loading, setLoading] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const register = async () => {
    try {
      setLoading(true);
      const credential = await createUserWithEmailAndPassword(appAuth, userEmail, password);
      const user = credential.user;
      const userDoc = doc(collection(appFireStore, 'users'));
      await setDoc(userDoc, {
        uid: user.uid,
        email: userEmail,
        nickname: nickname,
        profile_image: '',
        is_admin: false,
        created_at: new Date().toISOString(),
      });
      navigate('/');
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const validation = () => {
    if (userEmail.trim() !== '' && password.trim() !== '' && checkPW.trim() !== '' && nickname.trim() !== '') {
      if (password === checkPW) {
        let idCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i; //이메일 형식 테스트
        if (idCheck.test(userEmail)) {
          let pwCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-_])(?=.*[0-9]).{8,}$/; //특수문자 포함 8자리 이상
          if (pwCheck.test(password)) {
            register();
          } else {
            Toast.fire({
              icon: 'error',
              html: '영문, 숫자, 특수기호 조합으로 <br>8-20자리 이상 입력해주세요.',
            });
          }
        } else {
          Toast.fire({
            icon: 'error',
            html: '아이디는 이메일 형식으로<br> 작성해주세요.',
          });
        }
      } else {
        Toast.fire({
          icon: 'error',
          html: '입력하신 두 비밀번호가<br> 일치하지 않습니다.',
        });
      }
    } else {
      Toast.fire({
        icon: 'error',
        html: '모든 항목이 입력되어야 합니다.',
      });
    }
  };

  return (
    <Wrapper>
      <LogoBox to="/">
        <Logo src={logo} alt="logo" />
      </LogoBox>
      <Title>회원 가입</Title>
      <Input type="text" placeholder="아이디(이메일)" onChange={(e) => setUserEmail(e.target.value)} />
      <Input type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} />
      <Input type="password" placeholder="비밀번호 확인" onChange={(e) => setcheckPW(e.target.value)} />
      <Input type="text" placeholder="닉네임" onChange={(e) => setNickname(e.target.value)} />
      <Button onClick={validation}>회원 가입</Button>
      <SButton to="/">봄내음으로 돌아가기</SButton>
      {loading ? <Loading /> : <></>}
    </Wrapper>
  );
}
export default SignUp;
