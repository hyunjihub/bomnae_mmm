import React from 'react';
import styled from 'styled-components';

const Content = styled.h3`
  font-size: 1rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.9rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 0.8rem;
  }
`;

const Bold = styled.strong`
  font-weight: 700;
`;

function Info({ info }) {
  return (
    <>
      <Content>
        <Bold>영업시간 : </Bold>
        {info.time}
      </Content>
      <Content>
        <Bold>브레이크 타임 : </Bold>
        {info.breaktime}
      </Content>
      <Content>
        <Bold>전화번호 : </Bold>
        {info.number}
      </Content>
      <Content>
        <Bold>편의시설 및 서비스 : </Bold>
        {info.service}
      </Content>
      <Content>
        <Bold>주차 : </Bold>
        {info.parking}
      </Content>
    </>
  );
}

export default Info;
