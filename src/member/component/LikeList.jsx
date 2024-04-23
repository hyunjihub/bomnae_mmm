import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const List = styled.div`
  background-color: #fff;
  width: 11rem;
  height: 13rem;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  cursor: pointer;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 8rem;
    height: 11rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 11rem;
    height: 10rem;
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
    height: 7rem;
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
  width: 15rem;
  height: 4rem;
  box-sizing: border-box;
  padding: 1rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    padding: 0.9rem;
    width: 10rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 11rem;
    padding: 0.5rem 0.7rem;
  }
`;

const Name = styled.h1`
  font-weight: 800;
  font-size: 1.5rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.2rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 1.2rem;
  }
`;

const Location = styled.h3`
  font-size: 1rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.8rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 0.8rem;
  }
`;

function LikeList({ likeList }) {
  const navigate = useNavigate();
  return (
    <>
      <List onClick={() => navigate(`/place/${likeList.placeId}`)}>
        <Image backgroundImg={likeList.img}></Image>
        <InfoBox>
          <Name>{likeList.place_name}</Name>
          <Location>{likeList.location}</Location>
        </InfoBox>
      </List>
    </>
  );
}

export default LikeList;
