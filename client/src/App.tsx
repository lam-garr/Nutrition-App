import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import NavComponent from './components/Nav';
import Diary from './pages/Diary';
import Overlay from './components/Overlay';
import './styles/App.css';

function App() {

  //handle overlay change
  const [ overlayOpen, setOverlayOpen ] = useState(false);

  const childClickChange = () => {
    setOverlayOpen(!overlayOpen);
  }

  return (
    <BrowserRouter>
    <NavComponent/>
    <Overlay isOpen={overlayOpen}/>
      <Routes>
        <Route path='/diary' element={<Diary overlayChange={childClickChange} overlayOpen={overlayOpen}/>}></Route>
        <Route path='/sign-up' element={<SignupPage/>}></Route>
        <Route path='/log-in' element={<LoginPage/>}></Route>
        <Route path='/' element={<HomePage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
