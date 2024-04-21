import { Link, useLocation } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';

import EmblaCarousel from '../component/EmblaCarousel';
import UpdatedList from '../component/UpdatedList';
import sample from '../resource/img/sample.jpg';
import sample2 from '../resource/img/sample2.jpg';
import sample3 from '../resource/img/sample3.jpg';
import sample4 from '../resource/img/sample4.jpg';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #f7f6f9;
  width: 100vw;
  height: 120vh;
  padding: 5vh 5vw;
  box-sizing: border-box;
  margin-left: 18rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 13rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    margin-left: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3rem 7rem;
  box-sizing: border-box;
`;

const MenuBox = styled.div`
  width: 34rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
`;

const More = styled(Link)`
  font-size: 1rem;
  color: #838383;
  text-decoration: none;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Box = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

function Main(props) {
  const navigate = useNavigate();
  const OPTIONS = { dragFree: true, loop: true };
  const SLIDE_COUNT = 3;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  const restaurants = [
    { img: sample, place_name: '오야', location: '교동 149-12' },
    { img: sample2, place_name: '교동부대찌개', location: '교동 156-27' },
    { img: sample3, place_name: '레이아웃', location: '소양로4가 115-7' },
    { img: sample4, place_name: '사이라', location: '퇴계동 396-22' },
  ];

  return (
    <Wrapper>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      <Container>
        <MenuBox>
          <TitleBox>
            <Title>최근 추가된 맛집</Title>
            <More to="/list/restaurant">더보기</More>
          </TitleBox>
          <Box>
            {restaurants.map((restaurant) => {
              return <UpdatedList list={restaurant} />;
            })}
          </Box>
        </MenuBox>
        <MenuBox>
          <TitleBox>
            <Title>최근 추가된 카페</Title>
            <More to="/list/cafe">더보기</More>
          </TitleBox>
          <Box>
            {restaurants.map((restaurant) => {
              return <UpdatedList list={restaurant} />;
            })}
          </Box>
        </MenuBox>
      </Container>
    </Wrapper>
  );
}
export default Main;
