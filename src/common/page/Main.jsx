import { Navigate, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #f7f6f9;
  width: 100vw;
`;

function Main(props) {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div>메인</div>
      <button onClick={() => navigate('/auth')}>본인인증 페이지</button>
      <button onClick={() => navigate('/reset')}>재설정 페이지</button>
    </Wrapper>
  );
}
export default Main;
