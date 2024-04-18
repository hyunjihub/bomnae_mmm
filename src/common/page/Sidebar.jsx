import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';

import SidebarItem from '../component/SideItem';
import styled from 'styled-components';

const Side = styled.div`
  width: 18vw;
  background-color: #fff;
`;

const Menu = styled.div`
  color: #84828a;
  font-size: 16px;
`;

const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
`;

const SMenu = styled.div`
  color: #84828a;
  font-size: 14px;
  margin-top: 10px;
  margin-left: 20%;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #84828a;
  font-size: 16px;
  font-weight: 500;

  &:hover {
    color: #00a3e0;
  }
`;

function Sidebar(props) {
  const locationNow = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  if (locationNow.pathname.match(/\/(login|reset|find|auth|signup)/)) {
    return null;
  }
  const menus = [
    { name: '음식점', path: '/' },
    { name: '카페', path: '/' },
    { name: '놀거리', path: '/' },
  ];

  return (
    <Side>
      <MenuBox>
        <Menu>
          {menus.map((menu, index) => {
            return (
              <StyledLink to={menu.path} key={index}>
                <SidebarItem menu={menu} />
              </StyledLink>
            );
          })}
        </Menu>
      </MenuBox>
      <SMenu>{isAdmin ? '정보 등록 요청 확인' : '정보 추가 요청'}</SMenu>
    </Side>
  );
}
export default Sidebar;
