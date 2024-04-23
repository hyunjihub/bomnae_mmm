import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const List = styled.div`
  background-color: #fff;
  height: 12rem;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  cursor: pointer;
  flex-grow: 1;
  max-width: 13rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 48%;
    height: 9rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 22%;
    min-width: 7rem;
    height: 9rem;
  }
`;

const Image = styled.div`
  width: 100%;
  height: 8rem;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.backgroundImg});
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    height: 5.5rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    height: 5.8rem;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  height: 4rem;
  box-sizing: border-box;
  padding: 0.8rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    padding: 0.8rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    padding: 0.5rem;
  }
`;

const Name = styled.h1`
  font-weight: 800;
  font-size: 1.1rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.8rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
  }
`;

const Location = styled.h3`
  font-size: 0.8rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.7rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    height: 9vh;
    gap: 1rem;
  }
`;

function UpdatedList({ list }) {
  const navigate = useNavigate();
  return (
    <>
      <List onClick={() => navigate(`/place/${list.placeId}`)}>
        <Image backgroundImg={list.img}></Image>
        <InfoBox>
          <Name>{list.place_name}</Name>
          <Location>{list.location}</Location>
        </InfoBox>
      </List>
    </>
  );
}

export default UpdatedList;
