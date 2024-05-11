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

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.8rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: 0.8rem;
  }
`;

function Location({ filter, setCurrentLocation }) {
  return (
    <>
      <Name onClick={() => setCurrentLocation(filter)}>{filter}</Name>
    </>
  );
}

export default Location;
