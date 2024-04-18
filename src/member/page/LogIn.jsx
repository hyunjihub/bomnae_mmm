import React, { useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';
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
  gap: 15px;
`;

const LogoBox = styled(Link)`
  width: 260px;
  margin-bottom: 30px;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 260px;
`;

const Input = styled.input`
  border: solid 1px rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  width: 380px;
  padding: 16px 32px;
  box-sizing: border-box;
  font-size: 16px;
  outline: none;
  font-family: pretendard;

  &::placeholder {
    color: #a49f9f;
    font-size: 16px;
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 16px;
  background-color: #00a8dd;
  color: #fff;
  font-weight: 600;
  width: 380px;
  box-sizing: border-box;
  padding: 10px 32px;
  font-size: 18px;
  font-family: pretendard;
  cursor: pointer;

  &:hover {
    background-color: #4cb9e7;
  }
`;

const SButton = styled(Link)`
  text-decoration: none;
  border: none;
  background-color: transparent;
  color: #607274;
  font-size: 15px;
  font-family: pretendard;
  cursor: pointer;
  margin-bottom: 200px;
`;

const ButtonBox = styled.div`
  width: 380px;
  display: flex;
  padding: 0px 10px;
  box-sizing: border-box;
  justify-content: space-between;
`;

function LogIn(props) {
  return (
    <Wrapper>
      <LogoBox to="/">
        <Logo src={logo} alt="logo" />
      </LogoBox>
      <Input type="text" placeholder="아이디" />
      <Input type="password" placeholder="비밀번호" />
      <Button>로그인</Button>
      <ButtonBox>
        <SButton to="/signup">회원가입</SButton>
        <SButton to="/find">아이디/비밀번호 찾기</SButton>
      </ButtonBox>
    </Wrapper>
  );
}
export default LogIn;
