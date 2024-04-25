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
  height: 1000px;
  padding: 4vh 3vw;
  box-sizing: border-box;
  margin-left: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    padding: 2vh 1vw;
    margin-left: 170px;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    margin-left: 0;
    padding: 2vh 2vw;
  }
`;

const Container = styled.div`
  width: 65vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  box-sizing: border-box;
  gap: 2rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 65vw;
    flex-wrap: nowrap;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 80vw;
    flex-wrap: nowrap;
  }
`;

const MenuBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.8rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 1.8rem;
  }
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
  height: 12rem;
  gap: 1rem;
  justify-content: flex-start;
  flex-wrap: nowrap;
  overflow-y: hidden;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-bottom: 1rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    height: 9rem;
    gap: 0.5rem;
    margin-bottom: 0;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    gap: 1rem;
    margin-bottom: 0;
    height: 9rem;
  }
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
