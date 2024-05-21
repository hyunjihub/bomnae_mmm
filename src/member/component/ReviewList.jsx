import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';

import { Link } from 'react-router-dom';
import React from 'react';
import Swal from 'sweetalert2';
import { appFireStore } from '../../firebase/config';
import styled from 'styled-components';

const List = styled.div`
  background-color: #fff;
  width: 14rem;
  height: 21rem;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  box-sizing: border-box;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1380px) {
    width: 28rem;
    height: 10rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 22.8rem;
    height: 9rem;
    padding: 1rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 18rem;
    height: 9rem;
    padding: 1rem;
  }
`;

const Name = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  text-decoration: none;
  color: #000;

  &:hover {
    text-decoration: underline;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 1rem;
  }
`;

const Time = styled.h3`
  font-size: 0.9rem;
  color: #838383;
  margin-bottom: 0.6vh;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (max-width: 1023px) {
    font-size: 0.8rem;
  }
`;

const Review = styled.h3`
  max-width: 12.5rem;
  max-height: 14rem;
  overflow-y: hidden;
  font-size: 1rem;
  color: #838383;
  line-height: 1.5;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 1023px) and (max-width: 1380px) {
    max-width: 25rem;
    max-height: 17rem;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 480px) and (max-width: 1023px) {
    max-width: 25rem;
    max-height: 18rem;
    font-size: 0.9rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 479px) {
    max-width: 25rem;
    max-height: 15rem;
    font-size: 0.9rem;
  }
`;

const Delete = styled.h4`
  font-size: 1rem;
  color: #00a8dd;
  font-weight: 500;
  cursor: pointer;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (max-width: 1023px) {
    font-size: 0.9rem;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function ReviewList({ reviewList, setIsDelete }) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const handleDelete = async () => {
    Swal.fire({
      title: '정말 삭제하시겠습니까?',
      html: '삭제하면 복구할 수 없습니다.',
      showDenyButton: true,
      confirmButtonText: '삭제',
      denyButtonText: `취소`,
      confirmButtonColor: '#00a3e0',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const usersCollection = collection(appFireStore, 'reviews');
          const q = query(usersCollection, where('review_id', '==', reviewList.review_id));
          const querySnapshot = await getDocs(q);
          const userDocRef = querySnapshot.docs[0].ref;
          await deleteDoc(userDocRef);
          setIsDelete(true);
          Toast.fire({
            icon: 'success',
            html: '삭제 완료',
          });
        } catch (error) {
          console.log(error);
          Toast.fire({
            icon: 'error',
            html: '오류가 발생했습니다.',
          });
        }
      }
    });
  };

  return (
    <>
      <List>
        <Name to={`/place/${reviewList.place_id}`}>{reviewList.place_name}</Name>
        <Box>
          <Time>{reviewList.created_at}</Time>
          <Delete onClick={handleDelete}>삭제</Delete>
        </Box>
        <Review>{reviewList.content}</Review>
      </List>
    </>
  );
}

export default ReviewList;
