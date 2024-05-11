import React, { useCallback, useEffect, useRef, useState } from 'react';
import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';

import PrintList from '../component/List';
import Swal from 'sweetalert2';
import { appFireStore } from '../../firebase/config';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f7f6f9;
  padding: 3vh 1vw;
  box-sizing: border-box;
  margin-left: 230px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    padding: 3vh 2vw;
    margin-left: 170px;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 100vw;
    margin-left: 0;
    padding: 2vh 0;
  }
`;

const ListContainer = styled.div`
  max-height: 70vh;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1rem;
  padding: 0 3rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  &.cafe {
    max-height: 80vh;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    padding: 0 1rem;
    gap: 0.8rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 24.5rem;
    gap: 1rem;
    padding: 0 1rem;
  }
`;

function Search(props) {
  const { search } = useParams();
  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const [restaurantLists, setRestaurantLists] = useState([]);
  const [key, setKey] = useState(null); //마지막 스냅샷
  const [noMore, setNoMore] = useState(false);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    const getFirstList = async () => {
      try {
        const q = query(
          collection(appFireStore, 'restaurants'),
          where('search', 'array-contains', search),
          orderBy('place_id'),
          limit(20)
        );
        const querySnapshot = await getDocs(q);
        const updatedList = querySnapshot.docs.map((doc) => doc.data());
        setRestaurantLists(updatedList);
        setKey(querySnapshot.docs[querySnapshot.docs.length - 1]);
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    };
    getFirstList();
  }, [search]);

  const loadMore = useCallback(async () => {
    if (key !== null) {
      try {
        const q = query(
          collection(appFireStore, 'restaurants'),
          where('search', 'array-contains', search),
          orderBy('place_id'),
          startAfter(key),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setNoMore(true);
        } else {
          const updatedList = querySnapshot.docs.map((doc) => doc.data());
          setKey(querySnapshot.docs[querySnapshot.docs.length - 1]);
          setRestaurantLists((prevList) => [...prevList, ...updatedList]);
        }
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    }
  }, [key]);

  const onIntersect = useCallback(
    async ([entry], observer) => {
      if (entry.isIntersecting && !noMore) {
        observer.unobserve(entry.target);
        await loadMore();
      }
    },
    [loadMore, noMore]
  );

  useEffect(() => {
    let observer;
    if (target && !noMore) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0 });
      observer.observe(target);
    }
    return () => {
      observer && observer.disconnect();
    };
  }, [target, onIntersect, noMore]);

  return (
    <>
      <Wrapper>
        <ListContainer>
          {restaurantLists.map((list) => {
            return <PrintList list={list} />;
          })}
          <div ref={setTarget}></div>
        </ListContainer>
      </Wrapper>
    </>
  );
}
export default Search;
