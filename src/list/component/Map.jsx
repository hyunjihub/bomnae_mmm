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
      const fullAddress = `춘천시 ${address}`;
      try {
        const response = await axios.get(`https://us-central1-bomnae-mmm.cloudfunctions.net/api/getCoordinates`, {
          params: { address: fullAddress },
        });
        if (response.status === 200) {
          const { x, y } = response.data;
          setCoordinates(new navermaps.LatLng(y, x));
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

    if (address !== undefined && navermaps) fetchCoordinates();
  }, [address, navermaps]);

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
