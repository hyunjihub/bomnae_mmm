import { CiLogin, CiLogout, CiSearch } from 'react-icons/ci';
import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';

import logo from '../resource/img/logo.png';
import profile from '../resource/img/profile.png';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 10vh;
  min-height: 70px;
  background-color: #fff;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 999;
  padding: 0 4vw;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    gap: 1rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    height: 9vh;
    gap: 1rem;
  }
`;

const LogoBox = styled.div`
  width: 6rem;
  min-width: calc(4rem + 85px);
  height: 3rem;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 8vw;
  margin-right: 1vw;
  box-sizing: border-box;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    padding-right: 6vw;
    min-width: calc(4rem + 65px);
    width: 4rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    padding-right: 5vw;
    min-width: calc(4rem + 65px);
    padding-left: 0;
  }
`;

const Logo = styled.img`
  width: 6rem;
  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 5rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 5rem;
  }
`;

const SearchBox = styled.div`
  height: 2.5rem;
  background-color: #f7f6f9;
  border-radius: 8px;
  padding: 0rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-grow: 1;
  margin-right: 10rem;
  box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    margin-right: 0;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    display: none;
  }
`;

const Search = styled.input`
  color: #a49f9f;
  font-size: 0.9rem;
  outline: none;
  border: none;
  background-color: transparent;
  width: 80%;

  &::placeholder {
    color: #a49f9f;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    display: none;
  }
`;

const LoginBox = styled(Link)`
  width: 6rem;
  color: #84828a;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  text-decoration: none;
  box-sizing: border-box;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 5rem;
  }
  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 5rem;
    font-size: 0.9rem;
  }
`;

const Logout = styled(CiLogout)`
  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    opacity: 0;
  }
`;

const Login = styled(CiLogin)`
  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    opacity: 0;
  }
`;

const Profile = styled(Link)`
  width: 4.3rem;
  height: 4.3rem;
  border-radius: 50%;
  background-image: url(${profile});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
  cursor: pointer;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 4rem;
    height: 4rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 3.5rem;
    height: 3.5rem;
  }
`;

function Header(props) {
  const [isLogin, setIsLogin] = useState(false);
  const hanldeLogin = () => {
    if (isLogin) setIsLogin(false);
    else setIsLogin(true);
  };
  const locationNow = useLocation();

  if (locationNow.pathname.match(/\/(login|reset|find|auth|signup)/)) {
    return null;
  }
  return (
    <>
      <Wrapper>
        <LogoBox as={Link} to="/">
          <Logo src={logo} alt="logo" />
        </LogoBox>
        <SearchBox>
          <CiSearch size="20" color="#a49f9f" />
          <Search type="text" placeholder="검색"></Search>
        </SearchBox>
        <LoginBox to="/login">
          {isLogin ? <Login size="23" color="#84828a" /> : <Logout size="23" color="#84828a" />}
          {isLogin ? '로그아웃' : '로그인'}
        </LoginBox>
        <Profile to="/mypage/1"></Profile>
      </Wrapper>
    </>
  );
}
export default Header;
