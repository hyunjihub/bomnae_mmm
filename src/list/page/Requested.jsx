import React, { useEffect, useState } from 'react';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { shallowEqual, useSelector } from 'react-redux';

import RequestedList from '../component/RequestedList';
import Swal from 'sweetalert2';
import { appFireStore } from '../../firebase/config';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f7f6f9;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 0 3vw;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;

  &.detail {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.2;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 2.5rem;

    &.detail {
      font-size: 0.9rem;
    }
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: 2rem;

    &.detail {
      font-size: 0.9rem;
    }
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    font-size: 2rem;

    &.detail {
      font-size: 0.8rem;
    }
  }
`;

const Box = styled.div`
  width: 40rem;
  height: 40rem;
  background-color: #fff;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 35rem;
    height: 35rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 30rem;
    height: 30rem;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 19rem;
    height: 30rem;
  }
`;

function Requested(props) {
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

  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        let q;
        q = query(collection(appFireStore, 'requests'), where('uid', '==', id));
        const querySnapshot = await getDocs(q);
        const updatedList = querySnapshot.docs.map((doc) => doc.data());
        setRequestList(updatedList);
      } catch (error) {
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    };
    getList();
  }, []);

  return (
    <Wrapper>
      <Title>{name}님의 요청 기록</Title>
      <Title className="detail">
        대기중 : 현재 등록 대기중, 완료 : 등록 완료, 취소 : 등록 반려
        <br />
        춘천이 아닌 곳, 배달 전용 음식점 등 목적과 맞지 않는 경우 반영되지 않습니다.
      </Title>
      <Box>
        {requestList.map((requestList) => {
          return <RequestedList list={requestList} />;
        })}
      </Box>
    </Wrapper>
  );
}
export default Requested;
