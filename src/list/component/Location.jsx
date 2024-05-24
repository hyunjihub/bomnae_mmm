import React from 'react';
import styled from 'styled-components';

const Name = styled.h1`
  font-size: 0.9rem;
  color: ${({ isActive }) => (isActive ? '#31363f' : '#838383')};
  font-weight: ${({ isActive }) => (isActive ? '600' : 'normal')};
  text-align: center;
  cursor: pointer;

  /* 데스크탑 장치에서 hover 효과 적용 */
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: #31363f;
      font-weight: 600;
    }
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (max-width: 1023px) {
    font-size: 0.8rem;
  }
`;

function Location({ filter, setCurrentLocation, currentLocation }) {
  const handleFilter = () => {
    if (currentLocation.includes(filter)) setCurrentLocation(currentLocation.filter((item) => item !== filter));
    else setCurrentLocation([...currentLocation, filter]);
  };

  return (
    <>
      <Name onClick={handleFilter} isActive={currentLocation.includes(filter)}>
        {filter}
      </Name>
    </>
  );
}

export default Location;
