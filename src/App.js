import './index.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import Authentication from './member/page/Authentication';
import Detail from './list/page/Detail';
import Error from './common/page/Error';
import Find from './member/page/Find';
import Header from './common/page/Header';
import Like from './member/page/Like';
import List from './list/page/List';
import LogIn from './member/page/LogIn';
import Main from './common/page/Main';
import MyPage from './member/page/MyPage';
import PrivateRoute from './member/component/PrivateRoute';
import React from 'react';
import ReactDOM from 'react-dom';
import Request from './list/page/Request';
import Reset from './member/page/Reset';
import Sidebar from './common/page/Sidebar';
import SignUp from './member/page/SignUp';
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
  return (
    <BrowserRouter>
      <Global />
      <Header />
      <Center>
        <Sidebar />
        <Routes>
          <Route index element={<Main />} />
          <Route path="/main" element={<Main />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/find" element={<Find />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/list/:type" element={<List />} />
          <Route path="/place/:placeid" element={<Detail />} />
          <Route element={<PrivateRoute />}>
            <Route path="/reset" element={<Reset />} />
            <Route path="/mypage/:memberid" element={<MyPage />} />
            <Route path="/mypage/:memberid/like" element={<Like />} />
            <Route path="/request/:isadmin" element={<Request />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Center>
    </BrowserRouter>
  );
}
