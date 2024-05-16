import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { appAuth, appFireStore } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { setAdmin, setLogin, setMemberid, setName, setProfileimg } from '../../redux/login';

import Loading from '../../common/component/Loading';
import Swal from 'sweetalert2';
import logo from '../../common/resource/img/logo.png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

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
  margin-bottom: 2rem;
  cursor: pointer;

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 14rem;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 13rem;
  }
`;

const Logo = styled.img`
  width: 16rem;

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 14rem;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 13rem;
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
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 20rem;
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;

    &::placeholder {
      font-size: 0.9rem;
    }
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 17rem;
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

  &:hover {
    background-color: #4cb9e7;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 20rem;
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 17rem;
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
  }
`;

const SButton = styled(Link)`
  text-decoration: none;
  border: none;
  background-color: transparent;
  color: #607274;
  font-size: 0.9rem;
  font-family: pretendard;
  cursor: pointer;
  margin-bottom: 5rem;

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

const ButtonBox = styled.div`
  width: 24rem;
  display: flex;
  padding: 0rem 0.1rem;
  box-sizing: border-box;
  justify-content: space-between;

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 20rem;
    padding: 0rem 0.2rem;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 16.5rem;
  }
`;

const Caps = styled.h3`
  font-size: 0.9rem;
  color: #e72929;
  font-weight: 600;
`;

function LogIn(props) {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const setLogIn = (isLogIn) => dispatch(setLogin(isLogIn));
  const setMemberId = (id) => dispatch(setMemberid(id));
  const setProfileImg = (profileImg) => dispatch(setProfileimg(profileImg));
  const setIsAdmin = (isAdmin) => dispatch(setAdmin(isAdmin));
  const setNickname = (name) => dispatch(setName(name));

  const [loading, setLoading] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(appAuth, userEmail, password);
      console.log(user);
      const user_docs = await getDocs(query(collection(appFireStore, 'users'), where('email', '==', user.user.email)));
      user_docs.forEach((u) => {
        setProfileImg(u.data().profile_image);
        setIsAdmin(u.data().is_admin);
        setMemberId(u.data().uid);
        setNickname(u.data().nickname);
      });
      setLogIn(true);
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Toast.fire({
          icon: 'error',
          html: '이메일과 비밀번호를<br>다시 확인해주세요.',
        });
      }
      if (error.code === 'auth/too-many-requests') {
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.<br>다시 시도해주세요.',
        });
      }
      if (error.code === 'auth/internal-error') {
        Toast.fire({
          icon: 'error',
          html: '잘못된 요청입니다.',
        });
      }
      if (error.code === 'auth/network-request-failed') {
        Toast.fire({
          icon: 'error',
          html: '인터넷 연결을 확인해주세요.',
        });
      }
      if (error.code === 'auth/invalid-credential') {
        Toast.fire({
          icon: 'error',
          html: '가입되지 않은 계정입니다.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const validation = () => {
    setLoading(true);
    if (userEmail.trim() !== '' && password.trim() !== '') {
      let idCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i; //이메일 형식 테스트
      if (idCheck.test(userEmail)) {
        login();
      } else {
        setLoading(false);
        Toast.fire({
          icon: 'error',
          html: '이메일 주소로 입력해주세요.',
        });
      }
    } else {
      setLoading(false);
      Toast.fire({
        icon: 'error',
        html: '아이디와 비밀번호를 모두<br> 입력해주세요.',
      });
    }
  };

  const [capsLockFlag, setCapsLockFlag] = useState(false);
  const checkKeyUp = (e) => {
    if (e.key === 'Enter') {
      validation();
    } else if (e.key === 'CapsLock') {
      setCapsLockFlag(e.getModifierState('CapsLock'));
    }
  };

  return (
    <Wrapper>
      <LogoBox to="/">
        <Logo src={logo} alt="logo" />
      </LogoBox>
      <Input type="text" placeholder="아이디(이메일)" onChange={(e) => setUserEmail(e.target.value)} />
      <Input
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
        onKeyUp={(e) => checkKeyUp(e)}
      />
      {capsLockFlag && <Caps>Caps Lock이 켜져 있습니다.</Caps>}
      <Button onClick={validation}>로그인</Button>
      <ButtonBox>
        <SButton to="/signup">회원가입</SButton>
        <SButton to="/find">비밀번호 찾기</SButton>
      </ButtonBox>
      {loading ? <Loading /> : <></>}
    </Wrapper>
  );
}
export default LogIn;
