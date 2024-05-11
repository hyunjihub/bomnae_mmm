import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';

import EmblaCarousel from '../component/EmblaCarousel';
import Swal from 'sweetalert2';
import UpdatedList from '../component/UpdatedList';
import { appFireStore } from '../../firebase/config';
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
  @media all and (min-width: 480px) and (max-width: 767px) {
    margin-left: 0;
    padding: 2vh 2vw;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    margin-left: 0;
    padding: 1vh 1vw;
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
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 80vw;
    flex-wrap: nowrap;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
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
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: 1.8rem;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    font-size: 1.6rem;
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
  justify-content: space-between;
  flex-wrap: nowrap;

  overflow-y: hidden;
  overflow-x: auto;
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
  @media all and (min-width: 480px) and (max-width: 767px) {
    gap: 1rem;
    margin-bottom: 0;
    height: 9rem;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
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

  const [restaurants, setRestaurants] = useState([]);

  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  useEffect(() => {
    const getList = async () => {
      try {
        const q = query(
          collection(appFireStore, 'restaurants'),
          orderBy('created_at', 'desc'), // created_at 필드를 내림차순으로 정렬
          limit(6)
        );
        const querySnapshot = await getDocs(q);

        const updatedList = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          updatedList.push(data);
        });
        setRestaurants(updatedList);
      } catch (error) {
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    };
    getList();
  }, []);

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
