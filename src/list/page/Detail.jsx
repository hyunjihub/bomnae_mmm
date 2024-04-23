import React, { useEffect, useRef } from 'react';

import Info from '../component/Info';
import { IoHeart } from 'react-icons/io5';
import Menu from '../component/Menu';
import Review from '../component/Review';
import sample from '../../common/resource/img/sample.jpg';
import sample2 from '../../common/resource/img/sample12.jpg';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 110vh;
  background-color: #f7f6f9;
  padding: 5vh 1vw;
  box-sizing: border-box;
  margin-left: 230px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 170px;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    margin-left: 0;
  }
`;

const Container = styled.div`
  height: 100vh;
  display: grid;
  padding: 1vh 10vw;
  gap: 2rem;
  grid-template-columns: 1.8fr 1fr;
  grid-template-rows: 2fr 2fr 0.5fr;
  grid-template-areas:
    'd l'
    'd r'
    'd r';
  box-sizing: border-box;
`;

const DetailBox = styled.div`
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 16px;
  padding: 2rem 1.5rem;
  grid-area: d;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;

const LocationBox = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-sizing: border-box;
  grid-area: l;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
`;

const ReviewBox = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-sizing: border-box;
  grid-area: r;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
`;

const Box = styled.div`
  width: 90%;
  height: 12rem;
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;

  &.info {
    width: 80%;
    height: 13rem;
    flex-direction: column;
  }

  &.menu {
    width: 80%;
    height: 13rem;
    flex-direction: column;
  }
`;

const Image = styled.div`
  width: 65%;
  height: 12rem;
  border-radius: 16px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.backgroundImg});

  &.second {
    width: 30%;
  }
`;

const TitleBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0rem 1rem;
  margin-top: 0.5rem;

  &.menu {
    width: 90%;
    padding: 0rem;
  }
`;

const TitleDetail = styled.h3`
  font-size: 0.8rem;
  color: #9a95a3;
`;

const Name = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
`;

const Like = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: #fff;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 56px;
  border-radius: 50%;
  box-sizing: border-box;
  padding: 0.5rem 0.46rem;
  cursor: pointer;
`;

const Intro = styled.h2`
  width: 86%;
  color: #9a95a3;
  font-size: 1rem;
  line-height: 1.3;

  &.location {
    width: 15rem;
    color: #222831;
  }
`;

const Divider = styled.hr`
  width: 90%;
  border: none;
  height: 1px;
  background-color: #ccc;

  &.review {
    width: 10rem;
    margin-bottom: 0.8rem;
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 1rem;
`;

const InfoBox = styled.div`
  width: 86%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.6rem;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 19rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const WriteContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Write = styled.textarea`
  width: 10rem;
  height: 6.5rem;
  border: none;
  resize: none;
  outline: none;
  background-color: #f7f6f9;
  border-radius: 8px;
  padding: 0.6rem;
  box-sizing: border-box;
  font-size: 1rem;
  font-family: pretendard;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  &::placeholder {
    font-size: 0.9rem;
    color: #9a95a3;
  }
`;

const Button = styled.button`
  width: 3rem;
  height: 6.5rem;
  background-color: #00a8dd;
  font-family: pretendard;
  border: none;
  font-size: 1rem;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
`;

function Detail(props) {
  const information = {
    time: '11:30 ~ 22:00 (일요일 휴무)',
    breaktime: '15:00 ~ 17:00',
    number: '0507-1434-5877',
    service: '포장, 단체 이용 가능, 예약',
    parking: '주차 가능 (무료)',
  };

  const menus = [
    { menu: '오야 초밥(10pcs)', price: '13,000원' },
    { menu: '오야동', price: '14,000원' },
    { menu: '오야 특초밥(12pcs)', price: '16,000원' },
    { menu: '카이센동', price: '15,000원' },
    { menu: '연어덮밥', price: '13,000원' },
    { menu: '가라아게동', price: '10,000원' },
  ];

  const reviews = [
    {
      nickname: '닉네임',
      time: '2024-04-22',
      review:
        '후기가 입력될 자리 후기가 입력될 자리 후기가 입력될 자리 후기가 입력 될 자리 후기가 입력될 자리 후기가 입력될 자리 후기가 입력될 자리 후기가 입력될 자리 후기가 입력 될 자리 후기가 입력될 자리 후기가 입력될 자리 후기가 입력될 자리 후기가 입력될 자리',
    },
    {
      nickname: '닉네임',
      time: '2024-04-22',
      review:
        '후기가 입력될 자리 후기가 입력될 자리 후기가 입력될 자리 후기가 입력 될 자리 후기가 입력될 자리 후기가 입력될 자리 후기가 입력될 자리 후기가 입력될 자리 후기가 입력 될 자리 후기가 입력될 자리 후기가 입력될 자리 후기가 입력될 자리 후기가 입력될 자리',
    },
    {
      nickname: '닉네임',
      time: '2024-04-22',
      review:
        '후기가 입력될 자리 후기가 입력될 자리 후기가 입력될 자리 후기가 입력 될 자리 후기가 입력될 자리 후기가 입력될 자리 후기가 입력될 자리 후기가 입력될 자리 후기가 입력 될 자리 후기가 입력될 자리 후기가 입력될 자리 후기가 입력될 자리 후기가 입력될 자리',
    },
  ];

  return (
    <Wrapper>
      <Container>
        <DetailBox>
          <Box>
            <Image backgroundImg={sample} />
            <Image className="second" backgroundImg={sample2} />
          </Box>
          <TitleBox>
            <Name>오야</Name>
            <Like>
              <IoHeart size="26" color="d80032" />
            </Like>
          </TitleBox>
          <Intro>특색 있는 공간 그리고 음악과 함께 따뜻한 식전 계란찜과 맛있는 초밥과 사시미를 제공합니다.</Intro>
          <Divider />
          <InfoBox>
            <Box>
              <Box className="info">
                <Title>정보</Title>
                <Info info={information} />
              </Box>
              <Box className="menu">
                <TitleBox className="menu">
                  <Title>메뉴</Title>
                </TitleBox>
                {menus.map((menu) => {
                  return <Menu menu={menu} />;
                })}
              </Box>
            </Box>
          </InfoBox>
          <Divider />
          <InfoBox>
            <Title>블로그 리뷰</Title>
          </InfoBox>
        </DetailBox>
        <LocationBox>
          <Title>위치</Title>
          <Intro className="location">교동 149-12</Intro>
          <TitleDetail>한림대학교 정문에서 향교 방면으로 도보 200M 내려오시면 좌측에 있습니다.</TitleDetail>
        </LocationBox>
        <ReviewBox>
          <Title>후기</Title>
          <ReviewContainer>
            {reviews.map((review) => {
              return <Review review={review} />;
            })}
          </ReviewContainer>
          <Divider className="review" />
          <WriteContainer>
            <Write placeholder="후기를 입력해주세요. 후기는 최대 150자까지 작성 가능합니다."></Write>
            <Button>후기등록</Button>
          </WriteContainer>
        </ReviewBox>
      </Container>
    </Wrapper>
  );
}
export default Detail;
