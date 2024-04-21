import React, { useEffect, useRef } from 'react';

import RequestList from '../component/RequestList';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100vw;
  height: 90vh;
  background-color: #f7f6f9;
  padding: 5vh 5vw;
  box-sizing: border-box;
  margin-left: 18rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 13rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    margin-left: 0;
  }
`;

const Title = styled.h1`
  color: #000000;
  font-size: 2.6rem;
  font-weight: 800;
  margin-bottom: 0.8rem;

  &.request {
    font-size: 1.7rem;
    margin-bottom: 2rem;
  }
`;

const Detail = styled.h3`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #607274;
  line-height: 1.5;
`;

const Strong = styled.strong`
  display: block;
  font-weight: 600;
  color: #000;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const RequstBox = styled.div`
  width: 47vw;
  height: 50vh;
  background-color: #fff;
  border-radius: 16px;
  box-sizing: border-box;
  padding: 2.5rem 3rem;
  margin-bottom: 5vh;
`;

const Label = styled.label`
  font-size: 1rem;
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  background-color: transparent;
  padding: 0.5rem 0;
  width: 40vw;
  border: none;
  border-bottom: 1px solid #d9d9d9;
  font-family: pretendard;
  margin-bottom: 3vh;
  outline: none;
  display: block;
  font-size: 1rem;

  &::placeholder {
    color: #a49f9f;
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 16px;
  background-color: #00a8dd;
  color: #fff;
  font-weight: 600;
  width: 50rem;
  box-sizing: border-box;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  font-family: pretendard;
  cursor: pointer;
  margin-top: 2vh;

  &:hover {
    background-color: #4cb9e7;
  }
`;

const RequestContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 70rem;
  background-color: transparent;
  gap: 2rem;
`;

function Request(props) {
  const { isadmin } = useParams();

  const requestLists = [
    { place_name: '오야', location: '교동 149-12', category: '일식' },
    { place_name: '교동부대찌개', location: '교동 156-27', category: '한식' },
    { place_name: '레이아웃', location: '소양로4가 115-7', category: '양식' },
    { place_name: '사이라', location: '퇴계동 396-22', category: null },
    { place_name: '오야', location: '교동 149-12', category: '일식' },
    { place_name: '교동부대찌개', location: '교동 156-27', category: '한식' },
    { place_name: '레이아웃', location: '소양로4가 115-7', category: '양식' },
    { place_name: '사이라', location: '퇴계동 396-22', category: null },
  ];

  return (
    <>
      {isadmin === 'common' ? (
        <Wrapper>
          <Title>맛집 등록 요청</Title>
          <Detail>봄내음에 추가됐으면 하는 여러분들의 맛집/놀거리를 추천해주세요!</Detail>
          <RequstBox>
            <Title className="request">맛집 등록 요청</Title>
            <Label>상호명 (필수)</Label>
            <Input type="text" placeholder="상호명을 입력해주세요." />
            <Label>위치 (필수)</Label>
            <Input
              type="text"
              placeholder="위치를 입력해주세요. (중복된 상호가 있을 수 있으므로 정확한 입력을 부탁드립니다.)"
            />
            <Label>카테고리 (선택)</Label>
            <Input type="text" placeholder="한식/중식/일식/카페 등 자유롭게 작성해주세요." />
            <Button>맛집 등록 요청</Button>
          </RequstBox>
          <Detail>
            <Strong>※ 신청 시 꼭 읽어주세요!</Strong>
            무분별, 중복된 등록을 방지하기 위해 신청 즉시 등록되지 않습니다. 관리자의 확인 후, 순차적으로 업로드 될
            예정입니다.
            <br />
            모든 신청이 반영되지 않을 수 있습니다. 위치 상 춘천이 아닌 곳, 홀을 운영하지 않는 배달 전용 음식점 등 목적과
            맞지 않는 경우 반영되지 않습니다.
            <br />
            봄내음은 광고성 사이트가 아닙니다. 광고, 홍보를 일절 받지 않습니다.
          </Detail>
        </Wrapper>
      ) : (
        <Wrapper>
          <Title>맛집 등록 요청</Title>
          <Detail>
            사용자의 등록 요청입니다. 업로드된 요청은 X 버튼을 눌러 제거해주세요.
            <br />
            목적에 맞지 않거나 등록 요청을 진행하지 않을 시에도 X 버튼을 눌러주세요. 모든 요청은 요청된 순으로
            제공됩니다.
          </Detail>
          <RequestContainer>
            {requestLists.map((requestList) => {
              return <RequestList list={requestList} />;
            })}
          </RequestContainer>
        </Wrapper>
      )}
    </>
  );
}
export default Request;
