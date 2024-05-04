import { Link, useNavigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';

import Swal from 'sweetalert2';
import { appAuth } from '../../firebase/config';
import logo from '../../common/resource/img/logo.png';
import { sendPasswordResetEmail } from 'firebase/auth';
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

  &:hover {
    background-color: #4cb9e7;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
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
  @media all and (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

const Detail = styled.h3`
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: #607274;
  text-align: center;
  line-height: 1.5;

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }
`;

function Find(props) {
  const [userEmail, setUserEmail] = useState('');

  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const handleFind = async () => {
    if (userEmail.trim() !== '') {
      let idCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i; //이메일 형식 테스트
      if (idCheck.test(userEmail)) {
        try {
          await sendPasswordResetEmail(appAuth, userEmail);
          Toast.fire({
            icon: 'success',
            html: '이메일이 전송됐습니다.<br>이메일을 확인해주세요.',
          });
        } catch (error) {
          if (error.code === 'auth/invalid-email') {
            Toast.fire({
              icon: 'error',
              html: '잘못된 이메일 주소입니다.',
            });
          }
          if (error.code === 'auth/network-request-failed') {
            Toast.fire({
              icon: 'error',
              html: '인터넷 연결을 확인해주세요.',
            });
          }
          console.log(error);
        }
      } else {
        Toast.fire({
          icon: 'error',
          html: '잘못된 이메일 주소입니다.',
        });
      }
    } else {
      Toast.fire({
        icon: 'error',
        html: '이메일을 입력해주세요.',
      });
    }
  };

  return (
    <Wrapper>
      <LogoBox to="/">
        <Logo src={logo} alt="logo" />
      </LogoBox>
      <Title>비밀번호 찾기</Title>
      <Detail>
        비밀번호 찾기는 비밀번호를 재설정하는 방식으로 진행되며, 이메일로 재설정 링크가 전송됩니다.
        <br />
        가입되어있지 않은 이메일 주소를 입력할 경우 메일이 제대로 전송되지 않습니다.
      </Detail>
      <Input
        type="text"
        placeholder="아이디(이메일) (bomnae@naver.com)"
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <Button onClick={handleFind}>비밀번호 재설정</Button>
      <SButton to="/">봄내음으로 돌아가기</SButton>
    </Wrapper>
  );
}
export default Find;
