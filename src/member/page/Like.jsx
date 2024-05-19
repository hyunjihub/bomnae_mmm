import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { shallowEqual, useSelector } from 'react-redux';

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
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: 1.8rem;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    font-size: 1.5rem;
  }
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (max-width: 1023px) {
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
  font-size: 2.8rem;

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    font-size: 2rem;
  }
`;

const EmptyList = styled.div`
  font-size: 2rem;
  font-weight: 600;
  height: 50rem;
  display: flex;
  align-items: center;
  justify-content: center;

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 1.5rem;
  }
`;

function Like(props) {
  const navigate = useNavigate();

  const { id, name } = useSelector(
    (state) => ({
      id: state.login.memberId,
      name: state.login.nickname,
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

  const filters = ['음식점', '카페'];

  const [likeLists, setLikeLists] = useState([]);
  const [restaurantLists, setRestaurantLists] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('*');

  useEffect(() => {
    const getLike = async () => {
      try {
        const likeq = query(collection(appFireStore, 'likes'), where('uid', '==', id));
        const likeSnapshot = await getDocs(likeq);

        likeSnapshot.forEach((doc) => {
          const data = doc.data().likedRestaurants;
          setLikeLists(data);
        });
      } catch (error) {
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    };
    getLike();
  }, []);

  useEffect(() => {
    const getList = async () => {
      try {
        const listq = query(collection(appFireStore, 'restaurants'), where('place_id', 'in', likeLists));
        const listSnapshot = await getDocs(listq);
        listSnapshot.forEach((doc) => {
          setRestaurantLists((prevList) => [...prevList, doc.data()]);
        });
      } catch (error) {
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    };
    if (likeLists.length !== 0) {
      getList();
    }
  }, [likeLists]);

  useEffect(() => {
    const changeFilter = async (filter) => {
      try {
        let q;

        if (filter === '카페') {
          q = query(
            collection(appFireStore, 'restaurants'),
            where('place_id', 'in', likeLists),
            where('category', '==', '카페')
          );
        } else if (filter === '음식점') {
          q = query(
            collection(appFireStore, 'restaurants'),
            where('place_id', 'in', likeLists),
            where('category', '!=', '카페')
          );
        }
        const querySnapshot = await getDocs(q);

        const updatedList = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          updatedList.push(data);
        });
        setRestaurantLists(updatedList);
      } catch (error) {
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    };
    if (currentFilter !== '*' && likeLists.length !== 0) changeFilter(currentFilter);
  }, [currentFilter]);

  return (
    <Wrapper>
      <Title>
        <Icon onClick={() => navigate(-1)} />
        {name}님이 좋아요한 장소
      </Title>
      <Filter>
        {filters.map((filter) => {
          return <LikeFilter filter={filter} setCurrentFilter={setCurrentFilter} currentFilter={currentFilter} />;
        })}
      </Filter>
      {restaurantLists.length !== 0 ? (
        <ListContainer>
          {restaurantLists.map((list) => {
            return <LikeList list={list} />;
          })}
        </ListContainer>
      ) : (
        <EmptyList>좋아요한 장소가 없습니다.</EmptyList>
      )}
    </Wrapper>
  );
}
export default Like;
