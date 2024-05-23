import './index.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import Detail from './list/page/Detail';
import Error from './common/page/Error';
import Find from './member/page/Find';
import Header from './common/page/Header';
import Like from './member/page/Like';
import List from './list/page/List';
import LogIn from './member/page/LogIn';
import Main from './common/page/Main';
import MyPage from './member/page/MyPage';
import { NavermapsProvider } from 'react-naver-maps';
import PrivateRoute from './member/component/PrivateRoute';
import React from 'react';
import Request from './list/page/Request';
import Requested from './list/page/Requested';
import Reset from './member/page/Reset';
import Search from './list/page/Search';
import Sidebar from './common/page/Sidebar';
import SignUp from './member/page/SignUp';
import TopScroll from './common/component/TopScroll';
import { reset } from 'styled-reset';

const Global = createGlobalStyle`
  ${reset}
  body{
    font-family: Pretendard;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function App(props) {
  const pathname = window.location.pathname;
  const isExternalPage = pathname === '/requested';

  return (
    <NavermapsProvider ncpClientId={process.env.REACT_APP_NCP_CLIENT_ID}>
      <BrowserRouter>
        <Global />
        <TopScroll />
        {!isExternalPage && <Header />}
        <Center>
          {!isExternalPage && <Sidebar />}
          <Routes>
            <Route index element={<Main />} />
            <Route path="/main" element={<Main />} />
            <Route path="/find" element={<Find />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/list/:type" element={<List />} />
            <Route path="/place/:placeid" element={<Detail />} />
            <Route path="/search/:search" element={<Search />} />
            <Route element={<PrivateRoute />}>
              <Route path="/reset" element={<Reset />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/mypage/like" element={<Like />} />
              <Route path="/request/:isadmin" element={<Request />} />
              <Route path="/requested" element={<Requested />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </Center>
      </BrowserRouter>
    </NavermapsProvider>
  );
}
