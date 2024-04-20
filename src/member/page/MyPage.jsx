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
  height: 125vh;
  background-color: #f7f6f9;
  padding: 6vh 5vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  margin-left: 20rem;
`;

const PorfileBox = styled.div`
  width: 62rem;
  border-radius: 16px;
  padding: 2rem 15rem;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
`;

const ProfileContainer = styled.div`
  background-color: transparent;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2.5rem;
`;

const ImgBox = styled.div`
  position: relative;
`;

const ProfileImg = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
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
`;

const InfoBox = styled.div`
  width: 18rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 2rem;

  &.name {
    padding: 0;
    flex-direction: row;
    align-items: baseline;
  }
`;

const Nickname = styled.h1`
  height: 3rem;
  font-size: 2.6rem;
  font-weight: 800;
`;

const Text = styled.p`
  font-size: 1rem;
  color: #838383;

  &.intro {
    color: #000;
    margin-bottom: 1rem;
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
`;

const Withdraw = styled.button`
  background-color: transparent;
  border: none;
  color: #838383;
  font-size: 0.85rem;
  font-family: pretendard;
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
`;

const Title = styled.h1`
  font-weight: 800;
  font-size: 2.3rem;
`;

const Detail = styled.h3`
  font-size: 1.1rem;
  color: #838383;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Box = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: flex-start;

  &.review {
    gap: 3rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 62rem;
`;

function MyPage(props) {
  const navigate = useNavigate();
  const [isEdited, setIsEdited] = useState(false);
  const handleIsEdited = () => {
    setIsEdited(!isEdited);
  };

  const likeLists = [
    { img: sample, place_name: '오야', location: '교동 149-12' },
    { img: sample2, place_name: '교동부대찌개', location: '교동 156-27' },
    { img: sample3, place_name: '레이아웃', location: '소양로4가 115-7' },
    { img: sample4, place_name: '사이라', location: '퇴계동 396-22' },
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
      <PorfileBox>
        <ProfileContainer>
          <ImgBox>
            <ProfileImg src={profile} alt="profile" />
            {isEdited ? (
              <Upload>
                <FaCamera size="28" color="#000" />
              </Upload>
            ) : (
              <></>
            )}
          </ImgBox>
          <InfoBox>
            <InfoBox className="name">
              {isEdited ? <EditInput type="text" value="현현" placeholder="닉네임" /> : <Nickname>현현</Nickname>}
              <Text>syub98774</Text>
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
          <Detail onClick={() => navigate('like')}>더보기</Detail>
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
    </Wrapper>
  );
}
export default MyPage;
