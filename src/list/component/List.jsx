import { Link, useNavigate } from 'react-router-dom';

import { IoHeart } from 'react-icons/io5';
import React from 'react';
import styled from 'styled-components';

const ListBox = styled.div`
  background-color: #fff;
  width: 16rem;
  height: 16rem;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  cursor: pointer;
  position: relative;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 12rem;
    height: 12rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 10rem;
    height: 10rem;
  }
`;

const Image = styled.div`
  width: 16rem;
  height: 11rem;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.backgroundImg});
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 12rem;
    height: 8rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 10rem;
    height: 6.5rem;
  }
`;

const Like = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: #fff;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 56px;
  position: absolute;
  top: 0.4rem;
  right: 0.5rem;
  border-radius: 50%;
  box-sizing: border-box;
  padding: 0.5rem;
  cursor: pointer;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 2rem;
    height: 2rem;
    padding: 0.3rem 0.25rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 1.5rem;
    height: 1.5rem;
    padding: 0.1rem;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 15rem;
  height: 4rem;
  box-sizing: border-box;
  padding: 1rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 12rem;
    height: 3rem;
    padding: 0.7rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 9rem;
    height: 2rem;
    padding: 0.5rem;
  }
`;

const Name = styled.h1`
  font-weight: 800;
  font-size: 1.4rem;
  color: #000;
  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.1rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 1.1rem;
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
  return (
    <>
      <ListBox onClick={() => navigate(`/place/${list.placeId}`)}>
        <Like>{list.liked ? <IoHeart size="24" color="d80032" /> : <IoHeart size="24" color="ccc" />}</Like>
        <Image backgroundImg={list.img}></Image>
        <InfoBox>
          <Name>{list.place_name}</Name>
          <Location>{list.location}</Location>
        </InfoBox>
      </ListBox>
    </>
  );
}

export default List;
