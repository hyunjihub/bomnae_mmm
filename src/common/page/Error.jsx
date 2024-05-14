import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 90vh;
  background-color: #f7f6f9;
  box-sizing: border-box;
  margin-left: 230px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 0 3vw;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 1024px) and (max-width: 1380px) {
    margin-left: 230px;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 170px;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    margin-left: 0;
  }
`;

const ErrorTxt = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;

  &.detail {
    font-size: 1rem;
    font-weight: 500;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 2rem;
  }
`;

function Error(props) {
  return (
    <Wrapper>
      <ErrorTxt>페이지가 존재하지 않습니다.</ErrorTxt>
      <ErrorTxt className="detail">입력하신 주소가 올바른지 확인해주세요.</ErrorTxt>
    </Wrapper>
  );
}
export default Error;
