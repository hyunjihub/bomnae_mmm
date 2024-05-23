import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const List = styled.div`
  background-color: #fff;
  min-width: 11.5rem;
  height: 12rem;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  cursor: pointer;

  @media all and (min-width: 1024px) and (max-width: 1310px) {
    min-width: 9rem;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    min-width: 8rem;
    height: 9rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    min-width: 7rem;
    height: 9rem;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    min-width: 8rem;
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
  @media all and (min-width: 480px) and (max-width: 767px) {
    height: 5.8rem;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    height: 6rem;
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
  @media all and (min-width: 480px) and (max-width: 767px) {
    padding: 0.5rem;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    padding: 0.4rem;
  }
`;

const Name = styled.h1`
  font-weight: 800;
  font-size: 1.1rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (max-width: 1023px) {
    font-size: 0.9rem;
  }
`;

const Location = styled.h3`
  font-size: 0.8rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (max-width: 1023px) {
    font-size: 0.7rem;
  }
`;

function UpdatedList({ list }) {
  const navigate = useNavigate();

  const longName = (str, length = 8) => {
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
      <List onClick={() => navigate(`/place/${list.place_id}`)}>
        <Image backgroundImg={list.main_img}></Image>
        <InfoBox>
          <Name>{longName(list.place_name)}</Name>
          <Location>{list.address}</Location>
        </InfoBox>
      </List>
    </>
  );
}

export default UpdatedList;
