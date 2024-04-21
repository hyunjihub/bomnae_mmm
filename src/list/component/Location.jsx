import React from 'react';
import styled from 'styled-components';

const Name = styled.h1`
  font-size: 0.9rem;
  color: #838383;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: #31363f;
    font-weight: 600;
  }
`;

function Location({ filter }) {
  return (
    <>
      <Name>{filter}</Name>
    </>
  );
}

export default Location;
