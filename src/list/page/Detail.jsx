import React, { startTransition, useEffect, useState } from 'react';
import { Timestamp, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { shallowEqual, useSelector } from 'react-redux';

import Blog from '../component/Blog';
import Info from '../component/Info';
import Like from '../../member/component/Like';
import { MdLocationOn } from 'react-icons/md';
import Menu from '../component/Menu';
import NaverMapContainer from '../component/NaverMapContainer';
import { NavermapsProvider } from 'react-naver-maps';
import Review from '../component/Review';
import Swal from 'sweetalert2';
import { appFireStore } from '../../firebase/config';
import axios from 'axios';
import naver from '../resoucre/img/naver.png';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

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
  @media all and (min-width: 480px) and (max-width: 767px) {
    margin-left: 0;
    padding: 3vh 1vw;
    height: 1900px;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    margin-left: 0;
    padding: 2vh 1vw;
    height: 2100px;
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
  @media all and (min-width: 1024px) and (max-width: 1380px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 2fr 1fr;
    grid-template-areas:
      'd d'
      'l r';
    padding: 0 6vw;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 0.5fr 0.5fr;
    grid-template-areas:
      'd'
      'l'
      'r';
    padding: 0 6vw;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 0.5fr 0.5fr;
    grid-template-areas:
      'd'
      'l'
      'r';
    padding: 0 6vw;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 0.4fr 0.4fr;
    grid-template-areas:
      'd'
      'l'
      'r';
    padding: 0 2vw;
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
  @media all and (min-width: 480px) and (max-width: 767px) {
    padding: 2rem 1rem;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    padding: 1rem 0.5rem;
  }
`;

const LocationBox = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-sizing: border-box;
  grid-area: l;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    padding: 1.2rem;
  }
`;

const ReviewBox = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-sizing: border-box;
  grid-area: r;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    padding: 1.2rem;
  }
`;

const Box = styled.div`
  width: 90%;
  display: flex;
  gap: 1rem;

  &.detail {
    width: 100%;
  }

  &.info {
    width: 55%;
    flex-direction: column;
    gap: 0.8rem;
  }

  &.menu {
    width: 45%;
    flex-direction: column;
    gap: 0.5rem;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    flex-direction: column;

    &.info {
      width: 100%;
    }

    &.menu {
      width: 100%;
    }
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
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 50%;
    &.second {
      width: 48%;
    }
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 100%;
    height: 11rem;
    margin-bottom: 0.3rem;
    &.second {
      display: none;
    }
  }
`;

const TitleBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  box-sizing: border-box;
  position: relative;

  &.menu {
    width: 100%;
  }
`;

const TitleDetail = styled.h3`
  font-size: 0.8rem;
  color: #9a95a3;

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 1380px) {
    &.menu {
      display: none;
    }
  }
`;

const Name = styled.div`
  font-size: 2.4rem;
  font-weight: 800;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1380px) {
    font-size: 2.2rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: 2rem;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    font-size: 1.8rem;
  }
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
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: 1.4rem;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    font-size: 1.5rem;
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
  margin-top: 1.5rem;
  box-sizing: border-box;

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
  @media all and (min-width: 480px) and (max-width: 767px) {
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
  height: 17rem;
  padding-top: 0.8rem;
  box-sizing: border-box;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1380px) {
    height: 10rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
  }
`;

const Naver = styled.div`
  background-image: url(${naver});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 1.8rem;
  height: 1.8rem;
  margin-bottom: 1rem;
  border-radius: 8px;
`;

const Location = styled(MdLocationOn)`
  font-size: 2.1rem;
  margin-bottom: 1rem;
  /* 테블릿 가로, 테블릿 세로*/
  @media all and (max-width: 1023px) {
    display: none;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function Detail(props) {
  const { placeid } = useParams();

  const { id, name, isLog } = useSelector(
    (state) => ({
      isLog: state.login.isLogIn,
      id: state.login.memberId,
      name: state.login.nickname,
    }),
    shallowEqual
  );

  const [place, setPlace] = useState({});
  const [menu, setMenu] = useState([]);
  const [info, setInfo] = useState({
    break_time: null,
    number: null,
    parking: null,
    service: null,
    time: null,
    insta: null,
    category: null,
  });
  const [reviewList, setReviewList] = useState([]);
  const [isDelete, setIsDelete] = useState(true);

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

        startTransition(() => {
          querySnapshot.docs.map((doc) => {
            setPlace(doc.data());
            setMenu(doc.data().menus);
            setInfo({
              break_time: doc.data().break_time,
              number: doc.data().number,
              parking: doc.data().parking,
              service: doc.data().service,
              time: doc.data().time,
              insta: doc.data().instagram,
              category: doc.data().category,
            });
          });
        });
      } catch (error) {
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    };
    getInfo();
  }, [placeid]);

  useEffect(() => {
    const getReview = async () => {
      try {
        const q = query(collection(appFireStore, 'reviews'), where('place_id', '==', Number(placeid)));
        const querySnapshot = await getDocs(q);

        const reviews = [];
        querySnapshot.forEach((doc) => {
          let review = {
            uid: doc.data().uid,
            review_id: doc.data().review_id,
            writer: doc.data().writer,
            content: doc.data().content,
            created_at: doc.data().created_at.toDate().toISOString().substring(0, 10),
          };
          reviews.push(review);
        });
        setReviewList(reviews);
      } catch (error) {
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    };
    if (isDelete) {
      getReview();
      setIsDelete(false);
    }
  }, [isDelete]);

  let search =
    place.category === '카페'
      ? `춘천 ${place.dong} 카페 ${place.place_name}`
      : `춘천 ${place.dong} 맛집 ${place.place_name}`;
  const [blogReviews, setBlogReviews] = useState([]);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/blog.json?query=${encodeURI(
            search
          )}`,
          {
            headers: {
              'X-Naver-Client-Id': process.env.REACT_APP_NAVER_CLIENT_ID,
              'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_CLIENT_SECRECT,
            },
          }
        );
        if (response.status === 200) {
          const selectedItems = response.data.items.slice(0, 3); // 처음 3개 아이템 선택
          setBlogReviews(selectedItems);
        } else {
          Toast.fire({
            icon: 'error',
            html: '검색 결과를 불러오지 못했습니다.',
          });
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    };
    if (place.place_name !== undefined) getBlog();
  }, [place.place_name, search]);

  const [review, setReview] = useState('');
  const handleReview = async () => {
    if (isLog) {
      try {
        let userDoc = doc(collection(appFireStore, 'reviews'));
        let reviewId = uuidv4();
        await setDoc(userDoc, {
          review_id: reviewId,
          uid: id,
          writer: name,
          place_id: place.place_id,
          content: review,
          created_at: Timestamp.fromDate(new Date()),
          place_name: place.place_name,
        });
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);
        let newReview = {
          review_id: reviewId,
          uid: id,
          writer: name,
          content: review,
          created_at: formattedDate,
        };
        setReviewList([newReview, ...reviewList]);
        Toast.fire({
          icon: 'success',
          html: '후기가 등록되었습니다.',
        });
      } catch (error) {
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      } finally {
        setReview('');
      }
    } else {
      Toast.fire({
        icon: 'error',
        html: '로그인 후 작성가능합니다.',
      });
    }
  };

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
              <Like place_id={place.place_id} type="detail" />
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
                    <TitleDetail className="menu">실제 정보와 상이할 수 있습니다.</TitleDetail>
                  </TitleBox>
                  {menu.map((menu) => {
                    return <Menu menu={menu} />;
                  })}
                </Box>
              </Box>
            </InfoBox>
            <Divider />
            <InfoBox>
              <TitleContainer>
                <Title>블로그 리뷰</Title>
                <Naver />
              </TitleContainer>

              <BlogBox>
                {blogReviews.map((blog) => {
                  return <Blog blog={blog} />;
                })}
              </BlogBox>
            </InfoBox>
          </DetailBox>
          <LocationBox>
            <TitleContainer>
              <Title className="location">위치</Title>
              <Location color="#00a8dd" />
            </TitleContainer>
            <NaverMapContainer address={place.address} />
            <Intro className="location">{place.address}</Intro>
            <TitleDetail>{place.address_detail}</TitleDetail>
          </LocationBox>
          <ReviewBox>
            <Title>후기</Title>
            <ReviewContainer>
              {reviewList.length === 0 ? (
                <p>작성된 후기가 없습니다.</p>
              ) : (
                reviewList.map((review) => {
                  return <Review review={review} setIsDelete={setIsDelete} />;
                })
              )}
            </ReviewContainer>
            <Divider className="review" />
            <WriteContainer>
              <Write
                value={review || ''}
                placeholder="후기를 입력해주세요. 후기는 최대 150자까지 작성 가능합니다."
                onChange={(e) => setReview(e.target.value)}
                rows={4}
                cols={50}
              ></Write>
              <Button onClick={handleReview}>
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
