import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';

import Swal from 'sweetalert2';
import { appFireStore } from '../../firebase/config';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ListBox = styled.div`
  background-color: #fff;
  width: 11rem;
  height: 13rem;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  cursor: pointer;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 8rem;
    height: 11rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 11rem;
    height: 10rem;
  }
`;

const Image = styled.div`
  width: 100%;
  height: 8rem;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.backgroundImg});
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    height: 7rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    height: 6.5rem;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 15rem;
  height: 4rem;
  box-sizing: border-box;
  padding: 1rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    padding: 0.9rem;
    width: 10rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 11rem;
    padding: 0.5rem 0.7rem;
  }
`;

const Name = styled.h1`
  font-weight: 800;
  font-size: 1.5rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.2rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 1.2rem;
  }
`;

const Location = styled.h3`
  font-size: 1rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.8rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 0.8rem;
  }
`;

function LikeList({ place_id = 1001 }) {
  const navigate = useNavigate();

  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const longName = (str, length = 10) => {
    let result = '';
    if (str.length > length) {
      result = str.substr(0, length - 1) + '...';
    } else {
      result = str;
    }
    return result;
  };

  const [placeInfo, setPlaceInfo] = useState({
    place_id: 0,
    img: '',
    place_name: '',
    address: '',
  });

  useEffect(() => {
    const fetchPlaceInfo = async () => {
      try {
        const restaurantRef = collection(appFireStore, 'restaurants');
        const q = query(restaurantRef, where('place_id', '==', place_id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            setPlaceInfo({
              place_id: data.place_id,
              img: data.main_img,
              place_name: data.place_name,
              address: data.address,
            });
          });
        } else {
          Toast.fire({
            icon: 'error',
            html: '상호가 존재하지 않습니다.',
          });
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    };

    fetchPlaceInfo();
  }, []);

  return (
    <>
      <ListBox onClick={() => navigate(`/place/${placeInfo.place_id}`)}>
        <Image backgroundImg={placeInfo.img}></Image>
        <InfoBox>
          <Name>{longName(placeInfo.place_name)}</Name>
          <Location>{placeInfo.address}</Location>
        </InfoBox>
      </ListBox>
    </>
  );
}

export default LikeList;
