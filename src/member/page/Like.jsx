import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { GrFormPrevious } from 'react-icons/gr';
import LikeFilter from '../../list/component/ListFilter';
import LikeList from '../../list/component/List';
import Swal from 'sweetalert2';
import { appFireStore } from '../../firebase/config';
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

  const { id } = useSelector(
    (state) => ({
      id: state.login.memberId,
    }),
    shallowEqual
  );

  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const filters = ['음식점', '카페', '놀거리'];

  const [likeLists, setLikeLists] = useState([]);
  const [restaurantLists, setRestaurantLists] = useState([]);
  useEffect(() => {
    const getLike = async () => {
      try {
        const likeq = query(collection(appFireStore, 'likes'), where('uid', '==', id));
        const likeSnapshot = await getDocs(likeq);

        likeSnapshot.forEach((doc) => {
          const data = doc.data().likedRestaurants;
          setLikeLists(data);
        });

        console.log(likeLists);

        if (likeLists.length !== 0) {
          const listq = query(collection(appFireStore, 'restaurants'), where('place_id', 'in', likeLists));
          const listSnapshot = await getDocs(listq);
          const matchedRestaurants = [];
          listSnapshot.forEach((doc) => {
            matchedRestaurants.push(doc.data());
          });
          setRestaurantLists(matchedRestaurants);
          if (likeLists.length !== 0) {
            getList();
          }
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    };
    getLike();
  });

  const getList = async () => {
    try {
      const listq = query(collection(appFireStore, 'restaurants'), where('place_id', 'in', likeLists));
      const listSnapshot = await getDocs(listq);
      const matchedRestaurants = [];
      listSnapshot.forEach((doc) => {
        matchedRestaurants.push(doc.data());
      });
      setRestaurantLists(matchedRestaurants);
    } catch (error) {
      Toast.fire({
        icon: 'error',
        html: '오류가 발생했습니다.',
      });
    }
  };

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
        {restaurantLists.map((list) => {
          return <LikeList list={list} />;
        })}
      </ListContainer>
    </Wrapper>
  );
}
export default Like;
