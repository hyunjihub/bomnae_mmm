import { CiLogin, CiLogout, CiSearch } from 'react-icons/ci';
import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';

import logo from '../resource/img/logo.png';
import profile from '../resource/img/profile.png';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 10vh;
  background-color: #fff;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const LogoBox = styled.div`
  width: 110px;
  height: 54px;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 60px;
  margin-right: 10%;
`;

const Logo = styled.img`
  width: 100px;
`;

const SearchBox = styled.div`
  width: 480px;
  height: 40px;
  background-color: #f7f6f9;
  border-radius: 8px;
  padding: 0px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-grow: 2;
  margin-right: 200px;
  box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
`;

const Search = styled.input`
  color: #a49f9f;
  font-size: 14px;
  outline: none;
  border: none;
  background-color: transparent;

  &::placeholder {
    color: #a49f9f;
  }
`;

const LoginBox = styled(Link)`
  width: 90px;
  color: #84828a;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  text-decoration: none;
`;

const Profile = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background-image: url(${profile});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-right: 60px;
  box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
  cursor: pointer;
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
        <LogoBox as={Link} to="/main">
          <Logo src={logo} alt="logo" />
        </LogoBox>
        <SearchBox>
          <CiSearch size="20" color="#a49f9f" />
          <Search type="text" placeholder="검색"></Search>
        </SearchBox>
        <LoginBox to="/login">
          {isLogin ? <CiLogin size="23" color="#84828a" /> : <CiLogout size="23" color="#84828a" />}
          {isLogin ? '로그아웃' : '로그인'}
        </LoginBox>
        <Profile></Profile>
      </Wrapper>
    </>
  );
}
export default Header;
