import React from 'react';
import styled from 'styled-components';

const List = styled.div`
  background-color: #fff;
  width: 95%;
  height: 5rem;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    height: 8rem;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 4rem;
  box-sizing: border-box;
  padding: 2rem 1.5rem;
  position: relative;

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    padding: 1.3rem 1rem;
  }
`;

const Cancel = styled.button`
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
  font-size: 1.5rem;
`;

function RequestedList({ list }) {
  return (
    <>
      <List>
        <InfoBox>
          <Cancel status={list.status}>{list.status}</Cancel>
          <Name>{list.place_name}</Name>
        </InfoBox>
      </List>
    </>
  );
}

export default RequestedList;
