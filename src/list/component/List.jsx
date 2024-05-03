import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import Like from '../../member/component/Like';
import styled from 'styled-components';

const ListBox = styled.div`
  background-color: #fff;
  width: 14.4rem;
  height: 13.8rem;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  cursor: pointer;
  position: relative;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 10.6rem;
    height: 12rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 11.7rem;
    height: 10rem;
  }
`;

const Image = styled.div`
  width: 100%;
  height: 9rem;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.backgroundImg});
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  &:hover {
    filter: brightness(65%);
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    height: 8rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    height: 6.5rem;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 14rem;
  height: 4rem;
  box-sizing: border-box;
  padding: 1rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 10.5rem;
    height: 3rem;
    padding: 0.7rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 11rem;
    height: 2rem;
    padding: 0.6rem;
  }
`;

const Name = styled.h1`
  font-weight: 800;
  font-size: 1.3rem;
  color: #000;
  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 1rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 1rem;
  }
`;

const Location = styled.h3`
  font-size: 1rem;
  color: #000;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.9rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 0.8rem;
  }
`;

function List({ list }) {
  const navigate = useNavigate();

  const { isLogIn } = useSelector(
    (state) => ({
      isLogIn: state.login.isLogIn,
    }),
    shallowEqual
  );

  const longName = (str, length = 10) => {
    let result = '';
    if (str.length > length) {
      result = str.substr(0, length - 1) + '...';
    } else {
      result = str;
    }
    return result;
  };

  return (
    <>
      <ListBox>
        {isLogIn && <Like place_id={list.place_id} />}
        <Image backgroundImg={list.main_img} onClick={() => navigate(`/place/${list.place_id}`)}></Image>
        <InfoBox onClick={() => navigate(`/place/${list.place_id}`)}>
          <Name>{longName(list.place_name)}</Name>
          <Location>{list.address}</Location>
        </InfoBox>
      </ListBox>
    </>
  );
}

export default List;
