import './index.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Authentication from './member/page/Authentication';
import Error from './common/page/Error';
import Find from './member/page/Find';
import Header from './common/page/Header';
import LogIn from './member/page/LogIn';
import Main from './common/page/Main';
import React from 'react';
import ReactDOM from 'react-dom';
import Reset from './member/page/Reset';
import SignUp from './member/page/SignUp';

export default function App(props) {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/find" element={<Find />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
