import React, { useEffect, useState } from 'react';

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
    padding: 4vh 1vw;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    margin-left: 0;
    padding: 3vh 1vw;
  }
`;

const Title = styled.h1`
  color: #000000;
  font-size: 2.3rem;
  font-weight: 800;
  display: flex;
  align-items: center;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 2rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 1.8rem;
  }
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0 3rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    padding: 0 1rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    padding: 0 1rem;
  }
`;

const ListContainer = styled.div`
  height: 60vh;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem 1rem;
  padding: 0 1rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    padding: 0 0.5rem;
    gap: 1rem 0.5rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    padding: 0 0.8rem;
    gap: 1rem 0.8rem;
  }
`;

const Icon = styled(GrFormPrevious)`
  cursor: pointer;
`;

function Like(props) {
  const navigate = useNavigate();

  const filters = ['음식점', '카페', '놀거리'];

  const [likeLists, setLikeLists] = useState([]);

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
