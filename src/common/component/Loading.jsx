import { MoonLoader } from 'react-spinners';
import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  width: 5%;
`;

function Loading(props) {
  return (
    <>
      <MoonLoader color="#00a8dd" size="30" />
    </>
  );
}

export default Loading;
