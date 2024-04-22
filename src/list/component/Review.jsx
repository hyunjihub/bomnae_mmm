import React from 'react';
import styled from 'styled-components';

const Content = styled.h3`
  font-size: 0.9rem;
  line-height: 1.2;
  color: #607274;
`;

const Time = styled.h4`
  font-size: 0.8rem;
  color: #838383;
`;

const Name = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;
`;

const UserBox = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  margin-bottom: 0.3rem;
  gap: 0.5rem;
`;

const ReviewContainer = styled.div`
  height: 6.5rem;
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
