import React from 'react';
import styled from 'styled-components';

const Filter = styled.div`
  background-color: #fff;
  width: 4rem;
  height: 1.8rem;
  border-radius: 16px;
  border: 0.5px solid rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  padding: 0.4rem;
  cursor: pointer;

  &:hover {
    background-color: #c4e4ff;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 3.2rem;
    padding: 0.5rem 0.3rem;
  }
`;

const Name = styled.h1`
  font-size: 0.9rem;
  color: #222831;
  text-align: center;

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    font-size: 0.8rem;
  }
`;

function LikeFilter({ filter, setCurrentFilter }) {
  return (
    <>
      <Filter onClick={() => setCurrentFilter(filter)}>
        <Name>{filter}</Name>
      </Filter>
    </>
  );
}

export default LikeFilter;
