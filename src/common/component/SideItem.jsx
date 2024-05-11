import { Link, NavLink } from 'react-router-dom';

import { FaCoffee } from 'react-icons/fa';
import { LuPopcorn } from 'react-icons/lu';
import { MdOutlineRestaurant } from 'react-icons/md';
import React from 'react';
import styled from 'styled-components';

const Menu = styled(NavLink)`
  width: 11rem;
  height: 3rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  padding: 1rem 2rem;
  box-sizing: border-box;
  &:hover {
    background-color: #dff5ff;
    color: #00a3e0;
  }
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;
  font-family: insungit;
  text-decoration: none;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 11rem;
    height: 2.8rem;
    font-size: 1.1rem;
    padding: 1rem 2.5rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 9rem;
    height: 2.6rem;
    font-size: 1rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 479px) {
    font-size: 1rem;
    width: 9rem;
    height: 2.5rem;
  }
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

  const activeStyle = {
    color: '#00a3e0',
  };
  const deactiveStyle = {
    color: '#84828a',
  };

  return (
    <>
      <Menu
        to={menu.path}
        style={({ isActive }) => {
          return isActive ? activeStyle : deactiveStyle;
        }}
      >
        {icon && <span style={{ marginRight: '10px' }}>{icon}</span>}
        {menu.name}
      </Menu>
    </>
  );
}

export default SidebarItem;
