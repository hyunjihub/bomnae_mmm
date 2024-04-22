import React, { useEffect, useRef, useState } from 'react';

import { FaCamera } from 'react-icons/fa';
import LikeList from '../component/LikeList';
import ReviewList from '../component/ReviewList';
import profile from '../../common/resource/img/profile.png';
import sample from '../../common/resource/img/sample.jpg';
import sample2 from '../../common/resource/img/sample2.jpg';
import sample3 from '../../common/resource/img/sample3.jpg';
import sample4 from '../../common/resource/img/sample4.jpg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100vw;
  height: 1100px;
  background-color: #f7f6f9;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 5vh 6vw;
  margin-left: 230px;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 170px;
    height: 950px;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    margin-left: 0;
    height: 1200px;
  }
`;

const PageContainer = styled.div`
  box-sizing: border-box;
  width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 35rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 28rem;
  }
`;

const PorfileBox = styled.div`
  box-sizing: border-box;
  width: 45rem;
  border-radius: 16px;
  padding: 5vh 7vw;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 35rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 25rem;
  }
`;

const ProfileContainer = styled.div`
  background-color: transparent;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    gap: 1.5rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    margin-left: 0;
  }
`;

const ImgBox = styled.div`
  position: relative;
`;

const ProfileImg = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 12rem;
    height: 12rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 11rem;
    height: 11rem;
  }
`;

const Upload = styled.button`
  width: 3rem;
  height: 3rem;
  background-color: #d9d9d9;
  border: none;
  border-radius: 50%;
  position: absolute;
  bottom: 2.5rem;
  right: 0.5rem;
  cursor: pointer;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    bottom: 1rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 2.5rem;
    height: 2.5rem;
    bottom: 1.2rem;
  }
`;

const InfoBox = styled.div`
  width: 15rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &.name {
    padding: 0;
    flex-direction: row;
    align-items: baseline;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    gap: 0.3rem;
  }
  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 13rem;
  }
`;

const Nickname = styled.h1`
  height: 3rem;
  font-size: 2.5rem;
  font-weight: 800;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 10rem;
    font-size: 2.2rem;
    height: 2.2rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 2rem;
    height: 2rem;
  }
`;

const Text = styled.p`
  font-size: 1rem;
  color: #838383;

  &.intro {
    color: #000;
    margin-bottom: 1rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  width: 18rem;
  background-color: #00a3e0;
  border-radius: 16px;
  padding: 0.9rem;
  box-sizing: border-box;
  color: #fff;
  border: none;
  font-size: 1.2rem;
  font-family: pretendard;
  cursor: pointer;

  &:hover {
    background-color: #4cb9e7;
  }

  &.reset {
    background-color: #c7c8cc;
    color: #000;

    &:hover {
      background-color: #d9d9d9;
    }
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.1rem;
    width: 15rem;
    padding: 0.7rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 13rem;
    font-size: 1rem;
    padding: 0.7rem;
  }
`;

const Withdraw = styled.button`
  background-color: transparent;
  border: none;
  color: #838383;
  font-size: 0.85rem;
  font-family: pretendard;
  cursor: pointer;
`;

const EditInput = styled.input`
  width: 10rem;
  height: 3rem;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #838383;
  outline: none;
  font-size: 2.5rem;
  font-weight: 800;
  font-family: pretendard;

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 2rem;
    height: 2rem;
    width: 9rem;
  }
`;

const Title = styled.h1`
  font-weight: 800;
  font-size: 2.3rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 2.1rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 2rem;
  }
`;

const Detail = styled.h3`
  font-size: 1.1rem;
  color: #838383;

  &.button {
    cursor: pointer;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    gap: 1rem;

    &.review {
      gap: 0.5rem;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 45rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 35rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 33rem;
  }
`;

function MyPage(props) {
  const navigate = useNavigate();
  const [isEdited, setIsEdited] = useState(false);
  const handleIsEdited = () => {
    setIsEdited(!isEdited);
  };

  const likeLists = [
    { placeId: 1, img: sample, place_name: '오야', location: '교동 149-12' },
    { placeId: 1, img: sample2, place_name: '교동부대찌개', location: '교동 156-27' },
    { placeId: 1, img: sample3, place_name: '레이아웃', location: '소양로4가 115-7' },
    { placeId: 1, img: sample4, place_name: '사이라', location: '퇴계동 396-22' },
  ];

  const reviewLists = [
    {
      place_name: '레이아웃',
      review: '정말 맛있고 사장님이 친절하세요. 정말 자주 가는 식당입니다. 항상 갈 때마다 만족해요!',
      createdAt: '2024년 4월 20일',
    },
    {
      place_name: '레이아웃',
      review: '정말 맛있고 사장님이 친절하세요. 정말 자주 가는 식당입니다. 항상 갈 때마다 만족해요!',
      createdAt: '2024년 4월 20일',
    },
    {
      place_name: '레이아웃',
      review: '정말 맛있고 사장님이 친절하세요. 정말 자주 가는 식당입니다. 항상 갈 때마다 만족해요!',
      createdAt: '2024년 4월 20일',
    },
  ];

  return (
    <Wrapper>
      <PageContainer>
        <PorfileBox>
          <ProfileContainer>
            <ImgBox>
              <ProfileImg src={profile} alt="profile" />
              {isEdited ? (
                <Upload>
                  <FaCamera size="25" color="#000" />
                </Upload>
              ) : (
                <></>
              )}
            </ImgBox>
            <InfoBox>
              <InfoBox className="name">
                {isEdited ? <EditInput type="text" value="현현" placeholder="닉네임" /> : <Nickname>현현</Nickname>}
              </InfoBox>
              <Text className="intro">현현(님)의 맛집 목록 계정 입니다.</Text>
              <Button onClick={handleIsEdited}>{isEdited ? '프로필 변경 적용' : '프로필 편집'}</Button>
              <Button className="reset" onClick={() => navigate('/auth')}>
                비밀번호 재설정
              </Button>
              <Withdraw>회원 탈퇴</Withdraw>
            </InfoBox>
          </ProfileContainer>
        </PorfileBox>
        <Container>
          <TitleBox>
            <Title>좋아요 목록</Title>
            <Detail className="button" onClick={() => navigate('like')}>
              더보기
            </Detail>
          </TitleBox>
          <Box>
            {likeLists.map((likeList) => {
              return <LikeList likeList={likeList} />;
            })}
          </Box>
        </Container>
        <Container>
          <TitleBox>
            <Title>최근 작성 후기</Title>
            <Detail>최대 3개까지만 확인 가능 합니다.</Detail>
          </TitleBox>
          <Box className="review">
            {reviewLists.map((reviewList) => {
              return <ReviewList reviewList={reviewList} />;
            })}
          </Box>
        </Container>
      </PageContainer>
    </Wrapper>
  );
}
export default MyPage;
