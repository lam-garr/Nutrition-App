import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import NavComponent from './components/Nav';
import DiaryPage from './pages/Diary';
import AccountPage from './pages/Account';
import CollectionPage from './pages/Collection';
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
        <Route path='/account' element={<AccountPage/>}></Route>
        <Route path='/diary' element={<DiaryPage overlayChange={childClickChange} overlayOpen={overlayOpen}/>}></Route>
        <Route path='/collection' element={<CollectionPage/>}></Route>
        <Route path='/sign-up' element={<SignupPage/>}></Route>
        <Route path='/log-in' element={<LoginPage/>}></Route>
        <Route path='/' element={<HomePage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
