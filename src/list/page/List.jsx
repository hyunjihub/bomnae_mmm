import React, { useEffect, useRef } from 'react';

import ListFilter from '../component/ListFilter';
import Location from '../component/Location';
import { MdLocationOn } from 'react-icons/md';
import PrintList from '../component/List';
import sample from '../../common/resource/img/sample.jpg';
import sample10 from '../../common/resource/img/sample10.jpg';
import sample11 from '../../common/resource/img/sample11.jpg';
import sample2 from '../../common/resource/img/sample2.jpg';
import sample3 from '../../common/resource/img/sample3.jpg';
import sample4 from '../../common/resource/img/sample4.jpg';
import sample5 from '../../common/resource/img/sample5.jpg';
import sample6 from '../../common/resource/img/sample6.jpg';
import sample7 from '../../common/resource/img/sample7.jpg';
import sample8 from '../../common/resource/img/sample8.jpg';
import sample9 from '../../common/resource/img/sample9.jpg';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100vw;
  height: 600px;
  background-color: #f7f6f9;
  padding: 5vh 5vw;
  box-sizing: border-box;
  margin-left: 230px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    padding: 3vh 2vw;
    margin-left: 170px;
    height: 650px;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
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
  height: 70vh;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 1rem;
  padding-left: 3rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  &.cafe {
    height: 80vh;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    padding-left: 1rem;
    gap: 0.8rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    padding-left: 1rem;
  }
`;

const NotAvailable = styled.h1`
  font-size: 3rem;
  font-weight: 800;

  &.detail {
    font-weight: 500;
    font-size: 1.2rem;
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

  const restaurantLists = [
    { placeId: 1, img: sample, place_name: '오야', location: '교동 149-12', liked: 1 },
    { placeId: 1, img: sample2, place_name: '교동부대찌개', location: '교동 156-27', liked: 1 },
    { placeId: 1, img: sample3, place_name: '레이아웃', location: '소양로4가 115-7', liked: 1 },
    { placeId: 1, img: sample4, place_name: '사이라', location: '퇴계동 396-22', liked: 0 },
    { placeId: 1, img: sample5, place_name: '한끼의 미학', location: '효자동 324', liked: 1 },
    { placeId: 1, img: sample6, place_name: '섬마을 후평점', location: '후평동 831-6', liked: 0 },
    { placeId: 1, img: sample7, place_name: '청미래 닭갈비', location: '효자3동 631-16', liked: 1 },
    { placeId: 1, img: sample8, place_name: '춘천돈가스', location: '후평동 692-12', liked: 1 },
    { placeId: 1, img: sample9, place_name: '원조숯불닭불고기집', location: '중앙로2가 66-2', liked: 1 },
    { placeId: 1, img: sample10, place_name: '어반스트릿 컨템포러리', location: '거두리 1113-6', liked: 0 },
    { placeId: 1, img: sample11, place_name: '콩사랑마을', location: '퇴계동 1136-2', liked: 0 },
  ];
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
            {restaurantLists.map((list) => {
              return <PrintList list={list} />;
            })}
          </ListContainer>
        </Wrapper>
      ) : (
        <Wrapper>
          <Container>
            <NotAvailable>놀거리는 현재 데이터 수집 중입니다!</NotAvailable>
            <NotAvailable className="detail">다양한 정보를 수집할 때까지 조금만 기다려주세요 ㅠㅠ</NotAvailable>
          </Container>
        </Wrapper>
      )}
    </>
  );
}
export default List;
