import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { appAuth, appFireStore } from '../../firebase/config';
import { setLogin, setMemberid, setProfileimg } from '../../redux/login';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { signOut, updatePassword } from 'firebase/auth';

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
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 14rem;
    margin-bottom: 0.3rem;
  }
`;

const Logo = styled.img`
  width: 16rem;

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 14rem;
  }
`;

const Title = styled.h1`
  color: #000000;
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 1.5rem;

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
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
  @media all and (min-width: 480px) and (max-width: 767px) {
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
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 20rem;
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
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
  margin-bottom: 5rem;

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

function Reset(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setLogIn = (isLogIn) => dispatch(setLogin(isLogIn));
  const setMemberId = (id) => dispatch(setMemberid(id));
  const setProfileImg = (profileImg) => dispatch(setProfileimg(profileImg));

  const { isAdmin, id } = useSelector(
    (state) => ({
      isAdmin: state.login.isAdmin,
      id: state.login.memberId,
    }),
    shallowEqual
  );

  const [password, setPassword] = useState('');
  const [checkPW, setcheckPW] = useState('');

  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const handleReset = async () => {
    try {
      const user = appAuth.currentUser;
      const res = await updatePassword(user, password);
      await handleLogOut();
      Toast.fire({
        icon: 'success',
        html: '비밀번호가 재설정됐습니다.<br>재로그인해주세요.',
      });
    } catch (error) {
      Toast.fire({
        icon: 'error',
        html: '오류가 발생했습니다.',
      });
    } finally {
    }
  };

  const validation = () => {
    if (password.trim() !== '' && checkPW.trim() !== '') {
      if (password !== checkPW) {
        let pwCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-_])(?=.*[0-9]).{8,}$/; //특수문자 포함 8자리 이상
        if (pwCheck.test(password)) {
          handleReset();
        } else {
          Toast.fire({
            icon: 'error',
            html: '영문, 숫자, 특수기호 조합으로 <br>8-20자리 이상 입력해주세요.',
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
        html: '입력되지 않은 항목이 있습니다.',
      });
    }
  };

  const handleLogOut = async () => {
    try {
      await signOut(appAuth);
      setLogIn(false);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <LogoBox to="/">
        <Logo src={logo} alt="logo" />
      </LogoBox>
      <Title>비밀번호 재설정</Title>
      <Input type="password" placeholder="새로운 비밀번호" onChange={(e) => setPassword(e.target.value)} />
      <Input type="password" placeholder="비밀번호 확인" onChange={(e) => setcheckPW(e.target.value)} />
      <Button onClick={validation}>비밀번호 재설정</Button>
      <SButton to="/">봄내음으로 돌아가기</SButton>
    </Wrapper>
  );
}
export default Reset;
