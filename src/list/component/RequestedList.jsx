import React from 'react';
import styled from 'styled-components';

const List = styled.div`
  background-color: #fff;
  width: 95%;
  height: 3rem;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  padding: 0.8rem 1.5rem;
  position: relative;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    gap: 0.9rem 1.5rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    padding: 0.9rem 1.5rem;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    padding: 0.9rem 1.5rem;
  }
`;

const Status = styled.button`
  border: none;
  background-color: ${(props) => {
    switch (props.status) {
      case '취소':
        return '#c7c8cc';
      case '대기중':
        return '#f0dc50';
      case '완료':
      default:
        return '#00a3e0';
    }
  }};
  color: ${(props) => (props.status !== '완료' ? '#000' : '#fff')};
  border-radius: 8px;
  width: 4rem;
  height: 1.5rem;
  position: absolute;
  top: 0.8rem;
  right: 1rem;
  cursor: pointer;
`;

const Name = styled.h1`
  font-weight: 800;
  font-size: 1.3rem;

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: 1.2rem;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    font-size: 1.1rem;
  }
`;

function RequestedList({ list }) {
  return (
    <>
      <List>
        <InfoBox>
          <Status status={list.status}>{list.status}</Status>
          <Name>{list.place_name}</Name>
        </InfoBox>
      </List>
    </>
  );
}

export default RequestedList;
