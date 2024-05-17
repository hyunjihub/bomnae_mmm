import { Container as MapDiv, Marker, NaverMap, useNavermaps } from 'react-naver-maps';
import React, { useEffect, useState } from 'react';

import Swal from 'sweetalert2';
import axios from 'axios';

const Map = ({ address }) => {
  const navermaps = useNavermaps();
  const [coordinates, setCoordinates] = useState(null);

  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURI(
            address
          )}`,
          {
            headers: {
              'X-NCP-APIGW-API-KEY-ID': process.env.REACT_APP_NCP_CLIENT_ID,
              'X-NCP-APIGW-API-KEY': process.env.REACT_APP_CLIENT_SECRECT,
            },
          }
        );
        if (response.status === 200) {
          const data = response.data;
          const firstResult = data.addresses[0];
          if (firstResult) {
            const { x, y } = firstResult;
            setCoordinates(new navermaps.LatLng(y, x));
          }
        } else {
          Toast.fire({
            icon: 'error',
            html: '위치 정보를 불러오는 데 실패했습니다.',
          });
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    };

    fetchCoordinates();
  }, [address, navermaps]);

  const test = () => {
    console.log(coordinates);
  };

  return (
    <>
      {coordinates && ( //coordinates가 null이 아닐 때 렌더링
        <NaverMap defaultCenter={coordinates} defaultZoom={17}>
          <Marker position={coordinates} />
        </NaverMap>
      )}
    </>
  );
};

export default Map;
