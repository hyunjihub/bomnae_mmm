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
`;

const Name = styled.h1`
  font-size: 0.9rem;
  color: #222831;
  text-align: center;
`;

function LikeFilter({ filter }) {
  return (
    <>
      <Filter>
        <Name>{filter}</Name>
      </Filter>
    </>
  );
}

export default LikeFilter;
