import React, { useEffect, useRef } from 'react';

import { IoHeart } from 'react-icons/io5';
import sample from '../../common/resource/img/sample.jpg';
import sample2 from '../../common/resource/img/sample12.jpg';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 110vh;
  background-color: #f7f6f9;
  padding: 5vh 5vw;
  box-sizing: border-box;
  margin-left: 18rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

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
  height: 100vh;
  display: grid;
  gap: 2rem;
  grid-template-columns: 1.8fr 1fr;
  grid-template-rows: 1.5fr 2fr 0.5fr;
  grid-template-areas:
    'd l'
    'd r'
    'd r';
`;

const DetailBox = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 2rem 1rem;
  box-sizing: border-box;
  grid-area: d;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const LocationBox = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 1rem;
  box-sizing: border-box;
  grid-area: l;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
`;

const ReviewBox = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 1rem;
  box-sizing: border-box;
  grid-area: r;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
`;

const Box = styled.div`
  width: 50rem;
  height: 15rem;
  display: flex;
  gap: 1rem;

  &.info {
    width: 27rem;
    height: 13rem;
    flex-direction: column;
  }

  &.menu {
    width: 20rem;
    height: 13rem;
    flex-direction: column;
  }
`;

const Image = styled.div`
  width: 30rem;
  height: 15rem;
  border-radius: 16px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.backgroundImg});

  &.second {
    width: 20rem;
  }
`;

const TitleBox = styled.div`
  width: 50rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0rem 1rem;

  &.menu {
    width: 20rem;
    padding: 0rem;
  }
`;

const TitleDetail = styled.h3`
  font-size: 0.8rem;
  color: #9a95a3;
`;

const Name = styled.div`
  font-size: 2.2rem;
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
  width: 48rem;
  color: #9a95a3;
  font-size: 1rem;
  line-height: 1.3;
`;

const Divider = styled.hr`
  width: 50rem;
  border: none;
  height: 1px;
  background-color: #ccc;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
`;

const Content = styled.h3`
  font-size: 1rem;
`;

const Bold = styled.strong`
  font-weight: 700;
`;

const InfoBox = styled.div`
  width: 48rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.6rem;
`;

const Price = styled.h3`
  color: #9a95a3;
  font-size: 0.9rem;
`;

const MenuBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Detail(props) {
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
                <Content>
                  <Bold>영업시간 : </Bold>11:30 ~ 22:00 (일요일 휴무){' '}
                </Content>
                <Content>
                  <Bold>브레이크 타임 : </Bold>15:00 ~ 17:00{' '}
                </Content>
                <Content>
                  <Bold>전화번호 : </Bold>0507-1434-5877
                </Content>
                <Content>
                  <Bold>편의시설 및 서비스 : </Bold>포장, 단체 이용 가능, 예약, 무선 인터넷
                </Content>
                <Content>
                  <Bold>주차 : </Bold>주차 가능 (무료)
                </Content>
              </Box>
              <Box className="menu">
                <TitleBox className="menu">
                  <Title>메뉴</Title>
                  <TitleDetail>기재된 가격은 매장과 상이할 수 있습니다.</TitleDetail>
                </TitleBox>
                <MenuBox>
                  <Content>오야 초밥(10pcs)</Content>
                  <Price>13,000원</Price>
                </MenuBox>
                <MenuBox>
                  <Content>오야동</Content>
                  <Price>14,000원</Price>
                </MenuBox>
                <MenuBox>
                  <Content>오야 특초밥 (12pcs)</Content>
                  <Price>16,000원</Price>
                </MenuBox>
                <MenuBox>
                  <Content>카이센동</Content>
                  <Price>15,000원</Price>
                </MenuBox>
                <MenuBox>
                  <Content>연어덮밥</Content>
                  <Price>13,000원</Price>
                </MenuBox>
                <MenuBox>
                  <Content>가라아게동</Content>
                  <Price>10,000원</Price>
                </MenuBox>
              </Box>
            </Box>
          </InfoBox>
          <Divider />
          <Title>블로그 리뷰</Title>
        </DetailBox>
        <LocationBox></LocationBox>
        <ReviewBox></ReviewBox>
      </Container>
    </Wrapper>
  );
}
export default Detail;
