import React from 'react';
import insta from '../resoucre/img/instagram.png';
import styled from 'styled-components';

const Content = styled.h3`
  font-size: 1rem;

  &.sns {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.9rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 0.85rem;
  }
`;

const Bold = styled.strong`
  font-weight: 700;
`;

const Insta = styled.a``;

const InstaIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

function Info({ info }) {
  return (
    <>
      <Content>
        <Bold>영업시간 : </Bold>
        {info.time ? info.time : '정보 없음'}
      </Content>
      {info.category !== '카페' ? (
        <Content>
          <Bold>브레이크 타임 : </Bold>
          {info.break_time ? info.break_time : '없음'}
        </Content>
      ) : null}
      <Content>
        <Bold>전화번호 : </Bold>
        {info.number ? info.number : '정보없음'}
      </Content>
      <Content>
        <Bold>편의시설 및 서비스 : </Bold>
        {info.service ? info.service : '없음'}
      </Content>
      <Content>
        <Bold>주차 : </Bold>
        {info.parking ? info.parking : '정보 없음'}
      </Content>
      {info.category === '카페' ? (
        <Content className="sns">
          <Bold>인스타그램 : </Bold>
          {info.insta ? (
            <Insta href={info.insta} target="_blank">
              <InstaIcon src={insta} alt="instagram" />
            </Insta>
          ) : (
            '없음'
          )}
        </Content>
      ) : null}
    </>
  );
}

export default Info;
