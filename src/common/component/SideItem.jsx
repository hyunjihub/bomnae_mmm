import { FaCoffee } from 'react-icons/fa';
import { LuPopcorn } from 'react-icons/lu';
import { MdOutlineRestaurant } from 'react-icons/md';
import React from 'react';
import styled from 'styled-components';

const Menu = styled.p`
  width: 14rem;
  height: 3rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  padding: 1.8rem 1.5rem 1.5rem;
  box-sizing: border-box;
  &:hover {
    background-color: #dff5ff;
  }
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;
  font-family: insungit;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 11rem;
    height: 2.8rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 9rem;
    height: 2.6rem;
    font-size: 1rem;
  }
`;

const food_icon = styled(MdOutlineRestaurant)`
  color: #84828a;
  :hover {
    color: #00a3e0;
  }
`;

const coffee_icon = styled(FaCoffee)`
  ${food_icon};
`;

const popcorn_icon = styled(LuPopcorn)`
  ${food_icon};
`;

function SidebarItem({ menu }) {
  let icon;
  switch (menu.name) {
    case '음식점':
      icon = <MdOutlineRestaurant size="25" />;
      break;
    case '카페':
      icon = <FaCoffee size="25" />;
      break;
    case '놀거리':
      icon = <LuPopcorn size="25" />;
      break;
    default:
      icon = null;
      break;
  }

  return (
    <>
      <Menu>
        {icon && <span style={{ marginRight: '10px' }}>{icon}</span>}
        {menu.name}
      </Menu>
    </>
  );
}

export default SidebarItem;
