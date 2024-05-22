import React from 'react';
import styled from 'styled-components';

const Filter = styled.div`
  background-color: ${({ isActive }) => (isActive ? '#c4e4ff' : '#fff')};
  width: 4rem;
  height: 1.8rem;
  border-radius: 16px;
  border: 0.5px solid rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  padding: 0.4rem;
  cursor: pointer;

  /* 데스크탑 장치에서 hover 효과 적용 */
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: #c4e4ff;
    }
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 3.2rem;
    padding: 0.5rem 0.3rem;

    /* 모바일 장치에서 hover 효과 제거 */
    @media (hover: none) and (pointer: coarse) {
      &:hover {
        background-color: ${({ isActive }) => (isActive ? '#c4e4ff' : '#fff')};
      }
    }
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

function LikeFilter({ filter, setCurrentFilter, currentFilter }) {
  const handleFilter = () => {
    if (currentFilter.includes(filter)) setCurrentFilter(currentFilter.filter((item) => item !== filter));
    else setCurrentFilter([...currentFilter, filter]);
  };

  return (
    <>
      <Filter onClick={handleFilter} isActive={currentFilter.includes(filter)}>
        <Name>{filter}</Name>
      </Filter>
    </>
  );
}

export default LikeFilter;
