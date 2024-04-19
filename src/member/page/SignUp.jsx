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
  margin-bottom: 3rem;

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 0.9rem;
  }
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
