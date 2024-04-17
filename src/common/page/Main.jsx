import { Navigate, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';

import styled from 'styled-components';

function Main(props) {
  const navigate = useNavigate();
  return (
    <>
      <div>메인</div>
      <button onClick={() => navigate('/login')}>로그인 페이지</button>
    </>
  );
}
export default Main;
