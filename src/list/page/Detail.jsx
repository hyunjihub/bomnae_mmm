import React, { startTransition, useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';

import Info from '../component/Info';
import { IoHeart } from 'react-icons/io5';
import Menu from '../component/Menu';
import NaverMapContainer from '../component/NaverMapContainer';
import { NavermapsProvider } from 'react-naver-maps';
import Review from '../component/Review';
import Swal from 'sweetalert2';
import { appFireStore } from '../../firebase/config';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100vw;
  height: 1100px;
  background-color: #f7f6f9;
  box-sizing: border-box;
  margin-left: 230px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 5vh 3vw;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 1024px) and (max-width: 1380px) {
    margin-left: 230px;
    height: 1400px;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 170px;
    height: 1400px;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    margin-left: 0;
    padding: 3vh 1vw;
    height: 1900px;
  }
`;

const Container = styled.div`
  display: grid;
  padding: 0.5vh 8vw;
  gap: 2rem;
  grid-template-columns: 1.8fr 1fr;
  grid-template-rows: 1fr 1.5fr;
  grid-template-areas:
    'd l'
    'd r';
  box-sizing: border-box;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1380px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 2fr 1fr;
    grid-template-areas:
      'd d'
      'l r';
    padding: 0 6vw;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 0.5fr 0.8fr;
    grid-template-areas:
      'd'
      'l'
      'r';
    padding: 0 6vw;
  }
`;

const DetailBox = styled.div`
  overflow-x: auto;
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

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1380px) {
    padding: 2rem 1rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    padding: 2rem 1rem;
  }
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
  display: flex;
  gap: 1rem;

  &.detail {
    width: 100%;
  }

  &.info {
    width: 60%;
    flex-direction: column;
    gap: 0.8rem;
  }

  &.menu {
    width: 40%;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Image = styled.div`
  width: 60%;
  height: 13rem;
  border-radius: 16px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.backgroundImg});
  margin-bottom: 1rem;

  &.second {
    width: 39%;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 50%;
    &.second {
      width: 48%;
    }
  }
`;

const TitleBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  &.menu {
    width: 100%;
  }
`;

const TitleDetail = styled.h3`
  font-size: 0.8rem;
  color: #9a95a3;
`;

const Name = styled.div`
  font-size: 2.4rem;
  font-weight: 800;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1380px) {
    font-size: 2.2rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 2rem;
  }
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
  width: 90%;
  color: #9a95a3;
  font-size: 1rem;
  line-height: 1.3;

  &.location {
    color: #222831;
    font-weight: 600;
    font-size: 1.1rem;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1380px) {
    font-size: 0.9rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 0.85rem;

    &.location {
      font-size: 1rem;
    }
  }
`;

const Divider = styled.hr`
  width: 90%;
  border: none;
  height: 1px;
  background-color: #ccc;

  &.review {
    width: 95%;
    margin: 1rem 0;
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 1rem;

  &.location {
    margin-bottom: 0.7rem;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1380px) {
    font-size: 1.5rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 1.4rem;
  }
`;

const InfoBox = styled.div`
  width: 90%;
  gap: 0.6rem;
`;

const ReviewContainer = styled.div`
  display: flex;
  height: 35vh;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  gap: 1rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1380px) {
    height: 12rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    height: 20rem;
  }
`;

const WriteContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Write = styled.textarea`
  width: 80%;
  height: 6rem;
  border: none;
  resize: none;
  outline: none;
  background-color: #f7f6f9;
  border-radius: 8px;
  padding: 0.6rem;
  box-sizing: border-box;
  font-size: 0.95rem;
  font-family: pretendard;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  &::placeholder {
    font-size: 0.9rem;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1380px) {
    &::placeholder {
      font-size: 0.8rem;
      color: #9a95a3;
    }
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
  }
`;

const Button = styled.button`
  width: 15%;
  background-color: #00a8dd;
  font-family: pretendard;
  border: none;
  font-size: 1rem;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
`;

const BlogBox = styled.div`
  width: 100%;
  height: 12rem;
  background-color: #000;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1380px) {
    height: 10rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
  }
`;

function Detail(props) {
  const { placeid } = useParams();

  const [place, setPlace] = useState({});
  const [menu, setMenu] = useState([]);
  const [info, setInfo] = useState({
    break_time: null,
    number: null,
    parking: null,
    service: null,
    time: null,
  });

  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  useEffect(() => {
    const getInfo = async () => {
      try {
        const q = query(collection(appFireStore, 'restaurants'), where('place_id', '==', Number(placeid)));
        const querySnapshot = await getDocs(q);

        await startTransition(() => {
          querySnapshot.docs.map((doc) => {
            setPlace(doc.data());
            setMenu(doc.data().menus);
            setInfo({
              break_time: doc.data().break_time,
              number: doc.data().number,
              parking: doc.data().parking,
              service: doc.data().service,
              time: doc.data().time,
            });
          });
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    };
    getInfo();
  }, [placeid]);

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
    <NavermapsProvider ncpClientId={process.env.REACT_APP_NCP_CLIENT_ID}>
      <Wrapper>
        <Container>
          <DetailBox>
            <Box>
              <Image backgroundImg={place.main_img} />
              <Image className="second" backgroundImg={place.other_img} />
            </Box>
            <TitleBox>
              <Name>{place.place_name}</Name>
              <Like>
                <IoHeart size="26" color="d80032" />
              </Like>
            </TitleBox>
            {place.intro ? <Intro>{place.intro}</Intro> : null}
            <Divider />
            <InfoBox>
              <Box className="detail">
                <Box className="info">
                  <Title>정보</Title>
                  <Info info={info} />
                </Box>
                <Box className="menu">
                  <TitleBox className="menu">
                    <Title>메뉴</Title>
                    <TitleDetail>실제 정보와 상이할 수 있습니다.</TitleDetail>
                  </TitleBox>
                  {menu.map((menu) => {
                    return <Menu menu={menu} />;
                  })}
                </Box>
              </Box>
            </InfoBox>
            <Divider />
            <InfoBox>
              <Title>블로그 리뷰</Title>
              <BlogBox></BlogBox>
            </InfoBox>
          </DetailBox>
          <LocationBox>
            <Title className="location">위치</Title>
            <NaverMapContainer address={place.address} />
            <Intro className="location">{place.address}</Intro>
            <TitleDetail>{place.address_detail}</TitleDetail>
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
              <Button>
                후기
                <br />
                등록
              </Button>
            </WriteContainer>
          </ReviewBox>
        </Container>
      </Wrapper>
    </NavermapsProvider>
  );
}
export default Detail;
