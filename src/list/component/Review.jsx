import React from 'react';
import styled from 'styled-components';

const Content = styled.h3`
  font-size: 0.9rem;
  line-height: 1.2;
  color: #607274;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (max-width: 1023px) {
    font-size: 0.85rem;
  }
`;

const Time = styled.h4`
  font-size: 0.8rem;
  color: #838383;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (max-width: 1023px) {
    font-size: 0.7rem;
  }
`;

const Name = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (max-width: 1023px) {
    font-size: 1rem;
  }
`;

const UserBox = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  margin-bottom: 0.3rem;
  gap: 0.5rem;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function Review({ review }) {
  return (
    <ReviewContainer>
      <UserBox>
        <Name>{review.nickname}</Name>
        <Time>{review.time}</Time>
      </UserBox>
      <Content>{review.review}</Content>
    </ReviewContainer>
  );
}

export default Review;
