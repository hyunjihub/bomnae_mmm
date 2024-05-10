import Map from './Map';
import { Container as MapDiv } from 'react-naver-maps';
import React from 'react';

const NaverMapContainer = ({ address }) => {
  return (
    <MapDiv style={{ width: '100%', height: '70%', marginBottom: '1rem' }}>
      <Map address={address} />
    </MapDiv>
  );
};

export default NaverMapContainer;
