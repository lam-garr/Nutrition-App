import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import NavComponent from './components/Nav';
import Diary from './pages/Diary';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
    <NavComponent/>
      <Routes>
        <Route path='/diary' element={<Diary/>}></Route>
        <Route path='/sign-up' element={<SignupPage/>}></Route>
        <Route path='/log-in' element={<LoginPage/>}></Route>
        <Route path='/' element={<HomePage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
