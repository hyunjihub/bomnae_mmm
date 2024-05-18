import React, { useCallback, useEffect, useState } from 'react';
import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';

import ListFilter from '../component/ListFilter';
import Location from '../component/Location';
import { MdLocationOn } from 'react-icons/md';
import PrintList from '../component/List';
import Swal from 'sweetalert2';
import { appFireStore } from '../../firebase/config';
import styled from 'styled-components';
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
  align-items: center;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    padding: 3vh 2vw;
    margin-left: 170px;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 100vw;
    margin-left: 0;
    padding: 2vh 0;
  }
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    gap: 0.5rem;
  }
`;

const LocationBox = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  width: 38rem;
  height: 2rem;
  box-sizing: border-box;
  padding: 0.2rem 1.5rem;
  justify-content: space-between;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  flex-wrap: wrap;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 30rem;
    gap: 0.1rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 24rem;
    gap: 0.3rem 1.5rem;
    height: 3rem;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 18rem;
    gap: 0.2rem 1.5rem;
    height: 5rem;
  }
`;

const Icon = styled(MdLocationOn)`
  /* 테블릿 가로, 테블릿 세로*/
  @media all and (max-width: 1023px) {
    display: none;
  }
`;

const ListContainer = styled.div`
  width: 90%;
  max-height: 70vh;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1rem;
  padding: 0 3rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  justify-content: flex-start;

  &.cafe {
    max-height: 75vh;
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

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 18rem;
    padding: 0.2rem;
  }
`;

const NotAvailable = styled.h1`
  font-size: 3rem;
  font-weight: 800;

  &.detail {
    font-weight: 500;
    font-size: 1.2rem;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 2rem;

    &.detail {
      font-size: 1rem;
    }
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: 1.5rem;

    &.detail {
      font-size: 0.9rem;
    }
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    font-size: 1.2rem;

    &.detail {
      font-size: 0.8rem;
    }
  }
`;

const Container = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Target = styled.div`
  width: 10rem;
`;

function List(props) {
  const { type } = useParams();

  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const filters = ['한식', '중식', '양식', '일식', '기타'];
  const [currentFilter, setCurrentFilter] = useState('*');
  const [currentLocation, setCurrentLocation] = useState('*');
  const locations = [
    '퇴계동',
    '석사동',
    '후평동',
    '효자동',
    '강남동',
    '동내면',
    '조운동',
    '소양동',
    '근화동',
    '약사명동',
    '교동',
  ];
  const [restaurantLists, setRestaurantLists] = useState([]);
  const [cafeLists, setCafeLists] = useState([]);
  const [key, setKey] = useState(null); //마지막 스냅샷
  const [noMore, setNoMore] = useState(false);
  const [target, setTarget] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (type === 'cafe') setCurrentFilter('카페');
    else if (type === 'restaurant') setCurrentFilter('*');
    setKey(null);
    setCurrentLocation('*');
    setNoMore(false);
    setIsFirstRender(true);
    const getFirstList = async () => {
      try {
        let q;
        if (type === 'restaurant') {
          q = query(
            collection(appFireStore, 'restaurants'),
            where('place_id', '<', 2000),
            orderBy('place_id'),
            limit(29)
          );
        } else if (type === 'cafe') {
          q = query(
            collection(appFireStore, 'restaurants'),
            where('place_id', '>', 2000),
            orderBy('place_id'),
            limit(29)
          );
        }
        const querySnapshot = await getDocs(q);
        const updatedList = querySnapshot.docs.map((doc) => doc.data());
        if (type === 'cafe') setCafeLists(updatedList);
        if (type === 'restaurant') setRestaurantLists(updatedList);

        setKey(querySnapshot.docs[querySnapshot.docs.length - 1]);
      } catch (error) {
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    };

    if (type !== 'entertainment') getFirstList();
  }, [type]);

  useEffect(() => {
    return () => {
      setKey(null);
      setCurrentLocation('*');
      setCurrentFilter('*');
    };
  }, []);

  const loadMore = useCallback(async () => {
    let q;
    if (type === 'restaurant') {
      if (currentFilter === '*' && currentLocation === '*' && key !== null) {
        q = query(
          collection(appFireStore, 'restaurants'),
          where('place_id', '<', 2000),
          orderBy('place_id'),
          startAfter(key),
          limit(14)
        );
        try {
          const querySnapshot = await getDocs(q);
          if (querySnapshot.empty) {
            setNoMore(true);
          } else {
            const updatedList = querySnapshot.docs.map((doc) => doc.data());
            setKey(querySnapshot.docs[querySnapshot.docs.length - 1]);
            setRestaurantLists((prevList) => [...prevList, ...updatedList]);
          }
        } catch (error) {
          Toast.fire({
            icon: 'error',
            html: '오류가 발생했습니다.',
          });
        }
      }
    } else if (type === 'cafe') {
      if (cafeLists.length !== 0) {
        if (currentFilter === '카페' && currentLocation === '*' && key !== null) {
          q = query(
            collection(appFireStore, 'restaurants'),
            where('place_id', '>', 2000),
            orderBy('place_id'),
            startAfter(key),
            limit(10)
          );
          try {
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
              setNoMore(true);
            } else {
              const updatedList = querySnapshot.docs.map((doc) => doc.data());
              setKey(querySnapshot.docs[querySnapshot.docs.length - 1]);
              setCafeLists((prevList) => [...prevList, ...updatedList]);
            }
          } catch (error) {
            Toast.fire({
              icon: 'error',
              html: '오류가 발생했습니다.',
            });
          }
        }
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

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return; // 첫 렌더링 시 아무것도 하지 않음
    }

    const changeFilter = async (filter) => {
      try {
        let q;
        if (currentLocation === '*') {
          if (filter === '*') {
            q = query(collection(appFireStore, 'restaurants'), where('place_id', '<', 2000));
          } else {
            q = query(collection(appFireStore, 'restaurants'), where('category', '==', filter));
          }
        } else {
          if (filter === '*') {
            q = query(
              collection(appFireStore, 'restaurants'),
              where('place_id', '<', 2000),
              where('dong', '==', currentLocation)
            );
          } else {
            q = query(
              collection(appFireStore, 'restaurants'),
              where('category', '==', filter),
              where('dong', '==', currentLocation)
            );
          }
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
    if (currentFilter !== '카페') changeFilter(currentFilter);
  }, [currentFilter]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return; // 첫 렌더링 시 아무것도 하지 않음
    }

    const changeLocation = async (filter) => {
      try {
        let q;
        if (type === 'restaurant') {
          if (currentLocation === '*') {
            if (currentFilter === '*') {
              q = query(collection(appFireStore, 'restaurants'), where('place_id', '<', 2000));
            } else {
              q = query(collection(appFireStore, 'restaurants'), where('category', '==', currentFilter));
            }
          } else {
            if (currentFilter === '*') {
              q = query(
                collection(appFireStore, 'restaurants'),
                where('place_id', '<', 2000),
                where('dong', '==', filter)
              );
            } else {
              q = query(
                collection(appFireStore, 'restaurants'),
                where('category', '==', currentFilter),
                where('dong', '==', filter)
              );
            }
          }
        } else if (type === 'cafe') {
          if (currentLocation === '*') {
            q = query(collection(appFireStore, 'restaurants'), where('category', '==', currentFilter));
          } else {
            q = query(
              collection(appFireStore, 'restaurants'),
              where('category', '==', currentFilter),
              where('dong', '==', filter)
            );
          }
        }
        const querySnapshot = await getDocs(q);

        const updatedList = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          updatedList.push(data);
        });
        if (type === 'restaurant') setRestaurantLists(updatedList);
        if (type === 'cafe') setCafeLists(updatedList);
      } catch (error) {
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    };
    changeLocation(currentLocation);
  }, [currentLocation]);

  return (
    <>
      {type === 'restaurant' ? (
        <Wrapper>
          <LocationBox>
            <Icon size="25" color="#00a8dd" />
            {locations.map((filter) => {
              return (
                <Location filter={filter} setCurrentLocation={setCurrentLocation} currentLocation={currentLocation} />
              );
            })}
          </LocationBox>
          <Filter>
            {filters.map((filter) => {
              return <ListFilter filter={filter} setCurrentFilter={setCurrentFilter} currentFilter={currentFilter} />;
            })}
          </Filter>
          <ListContainer>
            {restaurantLists.map((list) => {
              return <PrintList list={list} />;
            })}
            <Target ref={setTarget}></Target>
          </ListContainer>
        </Wrapper>
      ) : type === 'cafe' ? (
        <Wrapper>
          <LocationBox>
            <Icon size="25" color="#00a8dd" />
            {locations.map((filter) => {
              return (
                <Location filter={filter} setCurrentLocation={setCurrentLocation} currentLocation={currentLocation} />
              );
            })}
          </LocationBox>
          <ListContainer className="cafe">
            {cafeLists.map((list) => {
              return <PrintList list={list} />;
            })}
            <Target ref={setTarget}></Target>
          </ListContainer>
        </Wrapper>
      ) : (
        <Wrapper>
          <Container>
            <NotAvailable>현재 데이터 수집 중입니다!</NotAvailable>
            <NotAvailable className="detail">다양한 정보를 수집할 때까지 조금만 기다려주세요 ㅠㅠ</NotAvailable>
          </Container>
        </Wrapper>
      )}
    </>
  );
}
export default List;
