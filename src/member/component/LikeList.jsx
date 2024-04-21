import React from 'react';
import styled from 'styled-components';

const List = styled.div`
  background-color: #fff;
  width: 14rem;
  height: 16rem;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  cursor: pointer;
`;

const Image = styled.div`
  width: 14rem;
  height: 11rem;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.backgroundImg});
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 15rem;
  height: 4rem;
  box-sizing: border-box;
  padding: 1rem;
`;

const Name = styled.h1`
  font-weight: 800;
  font-size: 1.5rem;
`;

const Location = styled.h3`
  font-size: 1rem;
`;

function LikeList({ likeList }) {
  return (
    <>
      <List>
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
