import React, { useEffect, useState } from 'react';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { IoHeart } from 'react-icons/io5';
import Swal from 'sweetalert2';
import { appFireStore } from '../../firebase/config';
import styled from 'styled-components';

const Heart = styled(IoHeart)`
  font-size: 1.5rem;
  transition: color 0.2s ease-in-out;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.4rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 1.1rem;
  }
`;

const LikeBox = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: #fff;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 56px;
  position: absolute;
  top: 0.4rem;
  right: 0.5rem;
  border-radius: 50%;
  box-sizing: border-box;
  padding: 0.5rem;
  cursor: pointer;
  z-index: 10;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 2rem;
    height: 2rem;
    padding: 0.3rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 1.5rem;
    height: 1.5rem;
    padding: 0.2rem 0.15rem;
  }
`;

function Like({ place_id }) {
  const { id, isLogIn } = useSelector(
    (state) => ({
      isLogIn: state.login.isLogIn,
      id: state.login.memberId,
    }),
    shallowEqual
  );
  const [isLiked, setIsLiked] = useState(false);
  const [list, setList] = useState([]);

  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  useEffect(() => {
    const getLikeList = async () => {
      try {
        const userDocs = await getDocs(query(collection(appFireStore, 'likes'), where('uid', '==', id)));
        if (!userDocs.empty) {
          const userData = userDocs.docs[0].data();
          setList(userData.likedRestaurants || []);
          setIsLiked(userData.likedRestaurants.includes(place_id));
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    };
    if (isLogIn) getLikeList();
  }, []);

  const handleLike = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(appFireStore, 'likes'), where('uid', '==', id)));

      if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0];
        const docRef = doc(appFireStore, 'likes', docSnapshot.id);

        const userData = docSnapshot.data();
        const updatedList = isLiked
          ? userData.likedRestaurants.filter((place) => place !== place_id)
          : [...userData.likedRestaurants, place_id];

        await updateDoc(docRef, { likedRestaurants: updatedList });
        setIsLiked(!isLiked);
      } else {
        Toast.fire({
          icon: 'error',
          html: '사용자 정보가 없습니다.',
        });
      }
    } catch (error) {
      Toast.fire({
        icon: 'error',
        html: '오류가 발생했습니다.',
      });
    }
  };

  return (
    <LikeBox onClick={handleLike}>
      <Heart color={isLiked ? '#d80032' : '#ccc'} />
    </LikeBox>
  );
}

export default Like;
