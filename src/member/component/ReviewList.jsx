import React from 'react';
import styled from 'styled-components';

const List = styled.div`
  background-color: #fff;
  width: 14rem;
  height: 15rem;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  box-sizing: border-box;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 11rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 10rem;
  }
`;

const Name = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 1rem;
  }
`;

const Time = styled.h3`
  font-size: 0.9rem;
  color: #838383;
  margin-bottom: 1vw;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.8rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 0.8rem;
  }
`;

const Review = styled.h3`
  font-size: 1rem;
  color: #838383;
  line-height: 1.5;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.9rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

function ReviewList({ reviewList }) {
  return (
    <>
      <List>
        <Name>{reviewList.place_name}</Name>
        <Time>{reviewList.createdAt}</Time>
        <Review>{reviewList.review}</Review>
      </List>
    </>
  );
}

export default ReviewList;
