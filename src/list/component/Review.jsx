import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { shallowEqual, useSelector } from 'react-redux';

import React from 'react';
import Swal from 'sweetalert2';
import { appFireStore } from '../../firebase/config';
import styled from 'styled-components';

const Content = styled.h3`
  font-size: 0.9rem;
  line-height: 1.2;
  color: #607274;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (max-width: 1023px) {
    font-size: 0.85rem;
  }
`;

const Time = styled.h4`
  font-size: 0.8rem;
  color: #838383;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (max-width: 1023px) {
    font-size: 0.7rem;
  }
`;

const Delete = styled.h4`
  font-size: 0.8rem;
  color: #00a8dd;
  font-weight: 500;
  cursor: pointer;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (max-width: 1023px) {
    font-size: 0.7rem;
  }
`;

const Name = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (max-width: 1023px) {
    font-size: 1rem;
  }
`;

const UserBox = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  margin-bottom: 0.3rem;
  gap: 0.5rem;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function Review({ review, setIsDelete }) {
  const { isAdmin } = useSelector(
    (state) => ({
      isAdmin: state.login.isAdmin,
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

  const handleDelete = async () => {
    if (isAdmin) {
      try {
        const usersCollection = collection(appFireStore, 'reviews');
        const q = query(usersCollection, where('review_id', '==', review.review_id));
        const querySnapshot = await getDocs(q);
        const userDocRef = querySnapshot.docs[0].ref;
        await deleteDoc(userDocRef);
        setIsDelete(true);
        Toast.fire({
          icon: 'success',
          html: '삭제 완료',
        });
      } catch (error) {
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    }
  };

  return (
    <ReviewContainer>
      <UserBox>
        <Name>{review.writer}</Name>
        <Time>{review.created_at}</Time>
        {isAdmin ? <Delete onClick={handleDelete}>삭제</Delete> : null}
      </UserBox>
      <Content>{review.content}</Content>
    </ReviewContainer>
  );
}

export default Review;
