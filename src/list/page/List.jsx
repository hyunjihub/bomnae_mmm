import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';

import ListFilter from '../component/ListFilter';
import Location from '../component/Location';
import { MdLocationOn } from 'react-icons/md';
import PrintList from '../component/List';
import Swal from 'sweetalert2';
import { appFireStore } from '../../firebase/config';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f7f6f9;
  padding: 3vh 1vw;
  box-sizing: border-box;
  margin-left: 230px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    padding: 3vh 2vw;
    margin-left: 170px;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 100vw;
    margin-left: 0;
    padding: 2vh 0;
  }
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding-left: 3rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    padding-left: 1rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    padding-left: 1rem;
  }
`;

const LocationBox = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  width: 38rem;
  height: 2rem;
  box-sizing: border-box;
  padding: 0.2rem 1.5rem;
  justify-content: space-between;
  border-radius: 16px;
  margin-left: 3rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  flex-wrap: wrap;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 30rem;
    gap: 0.1rem;
    margin-left: 1rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    margin-left: 1rem;
    width: 24rem;
    gap: 0.3rem 2rem;
    height: 3rem;
  }
`;

const Icon = styled(MdLocationOn)`
  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    display: none;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    display: none;
  }
`;

const ListContainer = styled.div`
  max-height: 70vh;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1rem;
  padding: 0 3rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  &.cafe {
    max-height: 80vh;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    padding: 0 1rem;
    gap: 0.8rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 24.5rem;
    gap: 1rem;
    padding: 0 1rem;
  }
`;

const NotAvailable = styled.h1`
  font-size: 3rem;
  font-weight: 800;

  &.detail {
    font-weight: 500;
    font-size: 1.2rem;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 2rem;

    &.detail {
      font-weight: 500;
      font-size: 1rem;
    }
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 1.5rem;

    &.detail {
      font-weight: 500;
      font-size: 0.9rem;
    }
  }
`;

const Container = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

function List(props) {
  const { type } = useParams();

  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const filters = ['한식', '중식', '양식', '일식', '기타'];
  const locations = [
    '퇴계동',
    '석사동',
    '후평동',
    '효자동 ',
    '강남동',
    '동내면',
    '조운동',
    '소양동',
    '근화동',
    '약사명동',
  ];
  const restaurantLists2 = [];
  const [restaurantLists, setRestaurantLists] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const q = query(collection(appFireStore, 'restaurants'), where('place_id', '<', 2000));
        const querySnapshot = await getDocs(q);

        const updatedList = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          updatedList.push(data);
        });
        setRestaurantLists(updatedList);
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
    <>
      {type === 'restaurant' ? (
        <Wrapper>
          <LocationBox>
            <Icon size="25" color="#00a8dd" />
            {locations.map((filter) => {
              return <Location filter={filter} />;
            })}
          </LocationBox>
          <Filter>
            {filters.map((filter) => {
              return <ListFilter filter={filter} />;
            })}
          </Filter>
          <ListContainer>
            {restaurantLists.map((list) => {
              return <PrintList list={list} />;
            })}
          </ListContainer>
        </Wrapper>
      ) : type === 'cafe' ? (
        <Wrapper>
          <LocationBox>
            <Icon size="25" color="#00a8dd" />
            {locations.map((filter) => {
              return <Location filter={filter} />;
            })}
          </LocationBox>
          <ListContainer className="cafe">
            {restaurantLists2.map((list) => {
              return <PrintList list={list} />;
            })}
          </ListContainer>
        </Wrapper>
      ) : (
        <Wrapper>
          <Container>
            <NotAvailable>현재 데이터 수집 중입니다!</NotAvailable>
            <NotAvailable className="detail">다양한 정보를 수집할 때까지 조금만 기다려주세요 ㅠㅠ</NotAvailable>
          </Container>
        </Wrapper>
      )}
    </>
  );
}
export default List;
