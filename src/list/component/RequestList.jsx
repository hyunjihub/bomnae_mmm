import React, { useState } from 'react';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';

import Swal from 'sweetalert2';
import { appFireStore } from '../../firebase/config';
import styled from 'styled-components';

const List = styled.div`
  background-color: #fff;
  width: 16rem;
  height: 10rem;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    height: 8rem;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 15rem;
  height: 4rem;
  box-sizing: border-box;
  padding: 2rem 1.5rem;
  position: relative;

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    padding: 1.3rem 1rem;
  }
`;

const Select = styled.select`
  border: none;
  background-color: #00a3e0;
  color: #fff;
  border-radius: 8px;
  width: 4rem;
  height: 2rem;
  position: absolute;
  top: 0.8rem;
  right: 0;
  padding: 0.2rem;
  cursor: pointer;
`;

const Name = styled.h1`
  font-weight: 800;
  font-size: 1.5rem;
`;

const Location = styled.h3`
  font-size: 1rem;

  &.category {
    color: #838383;
  }
`;

function RequestList({ list, setIsDelete }) {
  const [selectedOption, setSelectedOption] = useState('');

  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const handleOptionChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    if (selectedValue === 'complete') {
      await handleUpdate();
    } else if (selectedValue === 'cancel') {
      await handleDelete();
    }
  };

  const handleDelete = async () => {
    try {
      const usersCollection = collection(appFireStore, 'requests');
      const q = query(usersCollection, where('request_id', '==', list.request_id));
      const querySnapshot = await getDocs(q);
      const userDocRef = querySnapshot.docs[0].ref;
      await updateDoc(userDocRef, {
        status: '취소',
      });
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
  };

  const handleUpdate = async () => {
    try {
      const usersCollection = collection(appFireStore, 'requests');
      const q = query(usersCollection, where('request_id', '==', list.request_id));
      const querySnapshot = await getDocs(q);
      const userDocRef = querySnapshot.docs[0].ref;
      await updateDoc(userDocRef, {
        status: '완료',
      });
      setIsDelete(true);
      Toast.fire({
        icon: 'success',
        html: '등록 완료',
      });
    } catch (error) {
      Toast.fire({
        icon: 'error',
        html: '오류가 발생했습니다.',
      });
    }
  };

  return (
    <>
      <List>
        <InfoBox>
          <Select value={selectedOption} onChange={handleOptionChange}>
            <option value="">선택</option>
            <option value="complete">등록</option>
            <option value="cancel">취소</option>
          </Select>
          <Name>{list.place_name}</Name>
          <Location className="category">{list.category !== null ? list.category : '카테고리 미기재'}</Location>
          <Location>{list.address}</Location>
        </InfoBox>
      </List>
    </>
  );
}

export default RequestList;
