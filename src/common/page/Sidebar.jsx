import { Link, NavLink, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { setLogin, setMemberid, setProfileimg } from '../../redux/login';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import SidebarItem from '../component/SideItem';
import styled from 'styled-components';

const Side = styled.div`
  width: 230px;
  background-color: #fff;
  position: fixed;
  left: 0;
  top: 0;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 170px;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    display: none;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    display: none;
  }
  padding-top: 6rem;
  box-sizing: border-box;
`;

const Menu = styled.div`
  color: #84828a;
`;

const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const SMenu = styled(Link)`
  color: #84828a;
  font-size: 0.8rem;
  margin-top: 0.8rem;
  margin-left: 4vw;
  cursor: pointer;
  text-decoration: none;
`;

function Sidebar(props) {
  const dispatch = useDispatch();
  const setLogIn = (isLogIn) => dispatch(setLogin(isLogIn));
  const setMemberId = (id) => dispatch(setMemberid(id));
  const setProfileImg = (profileImg) => dispatch(setProfileimg(profileImg));

  const { isAdmin } = useSelector(
    (state) => ({
      isAdmin: state.login.isAdmin,
    }),
    shallowEqual
  );

  const locationNow = useLocation();
  if (locationNow.pathname.match(/\/(login|reset|find|auth|signup)/)) {
    return null;
  }
  const menus = [
    { name: '음식점', path: '/list/restaurant' },
    { name: '카페', path: '/list/cafe' },
    { name: '놀거리', path: '/list/entertainment' },
  ];

  return (
    <Side>
      <MenuBox>
        <Menu>
          {menus.map((menu, index) => {
            return <SidebarItem menu={menu} />;
          })}
        </Menu>
      </MenuBox>
      {isAdmin ? (
        <SMenu to="/request/admin">정보 등록 요청 확인</SMenu>
      ) : (
        <SMenu to="/request/common">정보 추가 요청</SMenu>
      )}
    </Side>
  );
}
export default Sidebar;
