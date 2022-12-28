import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/Home';
import NavComponent from './components/Nav';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
    <NavComponent/>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
