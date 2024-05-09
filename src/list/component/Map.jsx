import { Container as MapDiv, Marker, NaverMap, useNavermaps } from 'react-naver-maps';
import React, { useEffect, useState } from 'react';

import axios from 'axios'; // axios 라이브러리 추가

const Map = ({ address }) => {
  const navermaps = useNavermaps();
  const [coordinates, setCoordinates] = useState(null);

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
          } else {
            console.error('No coordinates found for the address');
          }
        } else {
          console.error('Failed to fetch coordinates');
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    fetchCoordinates();
  }, [address, navermaps]);

  return (
    <>
      {coordinates && ( //coordinates가 null이 아닐 때 렌더링
        <NaverMap defaultCenter={coordinates} defaultZoom={17}>
          <Marker defaultPosition={coordinates} />
        </NaverMap>
      )}
    </>
  );
};

export default Map;
