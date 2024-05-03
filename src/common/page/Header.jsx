import { CiLogin, CiLogout, CiSearch } from 'react-icons/ci';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { setLogin, setMemberid, setProfileimg } from '../../redux/login';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import SidebarItem from '../component/SideItem';
import { appAuth } from '../../firebase/config';
import logo from '../resource/img/logo.png';
import menu from '../resource/img/menu.png';
import profile from '../resource/img/profile.png';
import { signOut } from 'firebase/auth';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 10vh;
  min-height: 70px;
  background-color: #fff;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 999;
  padding: 0 4vw;
  box-sizing: border-box;
  justify-content: space-between;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    gap: 1rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    height: 9vh;
    gap: 1rem;
  }
`;

const LogoBox = styled.div`
  width: 6rem;
  min-width: calc(4rem + 85px);
  height: 3rem;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 8vw;
  margin-right: 1vw;
  box-sizing: border-box;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    padding-right: 6vw;
    min-width: calc(4rem + 65px);
    width: 4rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    padding-right: 5vw;
    min-width: calc(4rem + 65px);
    padding-left: 0;
  }
`;

const Logo = styled.img`
  width: 6rem;
  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 5rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 5rem;
  }
`;

const SearchBox = styled.div`
  height: 2.5rem;
  background-color: #f7f6f9;
  border-radius: 8px;
  padding: 0rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-grow: 1;
  margin-right: 10rem;
  box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    margin-right: 0;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    display: none;
  }
`;

const Search = styled.input`
  color: #a49f9f;
  font-size: 0.9rem;
  outline: none;
  border: none;
  background-color: transparent;
  width: 80%;

  &::placeholder {
    color: #a49f9f;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    display: none;
  }
`;

const LoginBox = styled(Link)`
  width: 7rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  text-decoration: none;
  box-sizing: border-box;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 5rem;
  }
  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 5rem;
    font-size: 0.9rem;
  }
`;

const Logout = styled(CiLogout)`
  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    opacity: 0;
  }
`;

const Login = styled(CiLogin)`
  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    opacity: 0;
  }
`;

const Profile = styled(Link)`
  width: 4.3rem;
  height: 4.3rem;
  border-radius: 50%;
  background-image: url(${(props) => props.profile});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
  cursor: pointer;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 4rem;
    height: 4rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 3.5rem;
    height: 3.5rem;
  }
`;

const Menu = styled.div`
  width: 3rem;
  height: 3rem;
  background-image: url(${menu});
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  display: none;

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    display: inline;
  }
`;

const Box = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  position: relative;
  margin-left: 1rem;
`;

const SideMenu = styled.div`
  position: absolute;
  width: 10rem;
  height: 15rem;
  background-color: #fff;
  top: 3.5rem;
  right: 0rem;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  padding: 1.5vh 2vw;
  box-sizing: border-box;
`;

const SMenu = styled(Link)`
  color: #84828a;
  font-size: 0.8rem;
  margin-top: 0.8rem;
  margin-left: 4vh;
  cursor: pointer;
  text-decoration: none;
`;

const LogInButton = styled(Link)`
  font-family: pretendard;
  border: none;
  background-color: transparent;
  color: #84828a;
  font-size: 1rem;
  text-decoration: none;
`;

const LogOutButton = styled.button`
  font-family: pretendard;
  border: none;
  background-color: transparent;
  color: #84828a;
  font-size: 1rem;
`;

function Header(props) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const setLogIn = (isLogIn) => dispatch(setLogin(isLogIn));
  const setMemberId = (id) => dispatch(setMemberid(id));
  const setProfileImg = (profileImg) => dispatch(setProfileimg(profileImg));

  const { isLog, id, profileImg } = useSelector(
    (state) => ({
      isLog: state.login.isLogIn,
      id: state.login.memberId,
      profileImg: state.login.profileImg,
    }),
    shallowEqual
  );
  const menus = [
    { name: '음식점', path: '/list/restaurant' },
    { name: '카페', path: '/list/cafe' },
    { name: '놀거리', path: '/list/entertainment' },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    if (isOpen) setIsOpen(false);
    else setIsOpen(true);
  };
  const [isAdmin, setIsAdmin] = useState(false);
  const locationNow = useLocation();

  if (locationNow.pathname.match(/\/(login|reset|find|auth|signup)/)) {
    return null;
  }

  const handleLogOut = async () => {
    try {
      await signOut(appAuth);
      setLogIn(false);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Wrapper>
        <LogoBox as={Link} to="/">
          <Logo src={logo} alt="logo" />
        </LogoBox>
        <SearchBox>
          <CiSearch size="20" color="#a49f9f" />
          <Search type="text" placeholder="검색"></Search>
        </SearchBox>
        <Box>
          <LoginBox>
            {isLog ? <Login size="23" color="#84828a" /> : <Logout size="23" color="#84828a" />}
            {isLog ? (
              <LogOutButton onClick={handleLogOut}>로그아웃</LogOutButton>
            ) : (
              <LogInButton to="/login">로그인</LogInButton>
            )}
          </LoginBox>
          {isLog ? <Profile to="/mypage/1" profile={profileImg === '' ? profile : profileImg}></Profile> : <></>}
          <Menu onClick={handleOpen}>
            {isOpen ? (
              <SideMenu>
                {menus.map((menu) => {
                  return <SidebarItem menu={menu} />;
                })}
                {isAdmin ? (
                  <SMenu to="/request/admin">정보 등록 요청 확인</SMenu>
                ) : (
                  <SMenu to="/request/common">정보 추가 요청</SMenu>
                )}
              </SideMenu>
            ) : (
              <></>
            )}
          </Menu>
        </Box>
      </Wrapper>
    </>
  );
}
export default Header;
