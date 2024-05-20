import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

const List = styled.div`
  background-color: #fff;
  width: 14rem;
  height: 21rem;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  box-sizing: border-box;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1380px) {
    width: 28rem;
    height: 10rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 22.8rem;
    height: 9rem;
    padding: 1rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 18rem;
    height: 9rem;
    padding: 1rem;
  }
`;

const Name = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  text-decoration: none;
  color: #000;

  &:hover {
    text-decoration: underline;
  }

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
  @media all and (max-width: 1023px) {
    font-size: 0.8rem;
  }
`;

const Review = styled.h3`
  max-width: 12.5rem;
  max-height: 14rem;
  overflow-y: hidden;
  font-size: 1rem;
  color: #838383;
  line-height: 1.5;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 1023px) and (max-width: 1380px) {
    max-width: 25rem;
    max-height: 17rem;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 480px) and (max-width: 1023px) {
    max-width: 25rem;
    max-height: 18rem;
    font-size: 0.9rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 479px) {
    max-width: 25rem;
    max-height: 15rem;
    font-size: 0.9rem;
  }
`;

function ReviewList({ reviewList }) {
  return (
    <>
      <List>
        <Name to={`/place/${reviewList.place_id}`}>{reviewList.place_name}</Name>
        <Time>{reviewList.created_at}</Time>
        <Review>{reviewList.content}</Review>
      </List>
    </>
  );
}

export default ReviewList;
