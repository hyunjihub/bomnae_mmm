import { FaCoffee } from 'react-icons/fa';
import { LuPopcorn } from 'react-icons/lu';
import { MdOutlineRestaurant } from 'react-icons/md';
import React from 'react';
import styled from 'styled-components';

const Menu = styled.p`
  width: 210px;
  height: 55px;
  border-radius: 8px;
  margin-bottom: 24px;
  padding: 20px;
  box-sizing: border-box;
  &:hover {
    background-color: #dff5ff;
  }
  display: flex;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  font-family: insungit;
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
