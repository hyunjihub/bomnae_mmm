import React from 'react';
import styled from 'styled-components';

const List = styled.div`
  background-color: #fff;
  width: 16rem;
  height: 10rem;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    height: 8rem;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 15rem;
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
  background-color: #00a3e0;
  color: #fff;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 0.8rem;
  right: 0;
  padding-top: 0.1rem;
  cursor: pointer;

  &:hover {
    background-color: #4cb9e7;
  }
`;

const Name = styled.h1`
  font-weight: 800;
  font-size: 1.5rem;
`;

const Location = styled.h3`
  font-size: 1rem;

  &.category {
    color: #838383;
  }
`;

function RequestList({ list }) {
  return (
    <>
      <List>
        <InfoBox>
          <Cancel>X</Cancel>
          <Name>{list.place_name}</Name>
          <Location className="category">{list.category !== null ? list.category : '카테고리 미기재'}</Location>
          <Location>{list.location}</Location>
        </InfoBox>
      </List>
    </>
  );
}

export default RequestList;
