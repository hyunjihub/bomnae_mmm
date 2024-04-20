import React from 'react';
import styled from 'styled-components';

const List = styled.div`
  background-color: #fff;
  width: 19.2rem;
  height: 15rem;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  box-sizing: border-box;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Name = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
`;

const Time = styled.h3`
  font-size: 0.9rem;
  color: #838383;
  margin-bottom: 1vw;
`;

const Review = styled.h3`
  font-size: 1rem;
  color: #838383;
  line-height: 1.5;
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
