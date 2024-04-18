import { Link } from 'react-router-dom';
import React from 'react';
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
  margin-bottom: 10px;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 260px;
`;

const Title = styled.h1`
  color: #000000;
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 20px;
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
  margin-bottom: 10px;

  &:hover {
    background-color: #4cb9e7;
  }
`;

const SButton = styled(Link)`
  text-decoration: none;
  border: none;
  background-color: transparent;
  color: #607274;
  font-size: 16px;
  font-family: pretendard;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 100px;
`;

function SignUp(props) {
  return (
    <Wrapper>
      <LogoBox to="/">
        <Logo src={logo} alt="logo" />
      </LogoBox>
      <Title>회원 가입</Title>
      <Input type="text" placeholder="아이디" />
      <Input type="password" placeholder="비밀번호" />
      <Input type="password" placeholder="비밀번호 확인" />
      <Input type="text" placeholder="이메일 주소 (bomnae@naver.com)" />
      <Button>회원 가입</Button>
      <SButton to="/">봄내음으로 돌아가기</SButton>
    </Wrapper>
  );
}
export default SignUp;
