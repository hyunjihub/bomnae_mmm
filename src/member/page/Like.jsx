import React, { useEffect, useRef } from 'react';

import { GrFormPrevious } from 'react-icons/gr';
import LikeFilter from '../../list/component/ListFilter';
import LikeList from '../../list/component/List';
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
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100vw;
  height: 90vh;
  background-color: #f7f6f9;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 5vh 5vw;
  margin-left: 18rem;
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

const Title = styled.h1`
  color: #000000;
  font-size: 2.6rem;
  font-weight: 800;
  display: flex;
  align-items: center;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding-left: 3rem;
`;

const ListContainer = styled.div`
  height: 60vh;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 1rem;
  padding-left: 3rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Icon = styled(GrFormPrevious)`
  cursor: pointer;
`;

function Like(props) {
  const navigate = useNavigate();

  const filters = ['음식점', '카페', '놀거리'];

  const likeLists = [
    { placeId: 1, img: sample, place_name: '오야', location: '교동 149-12', liked: 1 },
    { placeId: 1, img: sample2, place_name: '교동부대찌개', location: '교동 156-27', liked: 1 },
    { placeId: 1, img: sample3, place_name: '레이아웃', location: '소양로4가 115-7', liked: 1 },
    { placeId: 1, img: sample4, place_name: '사이라', location: '퇴계동 396-22', liked: 1 },
    { placeId: 1, img: sample5, place_name: '한끼의 미학', location: '효자동 324', liked: 1 },
    { placeId: 1, img: sample6, place_name: '섬마을 후평점', location: '후평동 831-6', liked: 1 },
    { placeId: 1, img: sample7, place_name: '청미래 닭갈비', location: '효자3동 631-16', liked: 1 },
    { placeId: 1, img: sample8, place_name: '춘천돈가스', location: '후평동 692-12', liked: 1 },
    { placeId: 1, img: sample9, place_name: '원조숯불닭불고기집', location: '중앙로2가 66-2', liked: 1 },
    { placeId: 1, img: sample10, place_name: '어반스트릿 컨템포러리', location: '거두리 1113-6', liked: 1 },
    { placeId: 1, img: sample11, place_name: '콩사랑마을', location: '퇴계동 1136-2', liked: 1 },
  ];

  return (
    <Wrapper>
      <Title>
        <Icon onClick={() => navigate(-1)} size="50" />
        현현님이 좋아요한 장소
      </Title>
      <Filter>
        {filters.map((filter) => {
          return <LikeFilter filter={filter} />;
        })}
      </Filter>
      <ListContainer>
        {likeLists.map((list) => {
          return <LikeList list={list} />;
        })}
      </ListContainer>
    </Wrapper>
  );
}
export default Like;
