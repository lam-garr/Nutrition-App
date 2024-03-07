import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import NavComponent from './components/Nav';
import DiaryPage from './pages/Diary';
import UserDiary from './pages/UserDiary';
import AccountPage from './pages/Account';
import CollectionPage from './pages/Collection';
import Overlay from './components/Overlay';
import SideBar from './components/SideBar';
import Protected from './pages/Protected';
import Authed from './pages/Authed';
import './styles/App.css';

function App() {

  //handle overlay change
  const [ overlayOpen, setOverlayOpen ] = useState(false);

  const childClickChange = () => {
    setOverlayOpen(!overlayOpen);
  }

  //handle sidebar change
  const [ sidebarOpen, setSidebarOpen ] = useState(false);

  const sidebarChange = () => {
    setSidebarOpen(!sidebarOpen);
    setOverlayOpen(!overlayOpen)
  }

  return (
    <BrowserRouter>
    <NavComponent sidebarHandler={sidebarChange}/>
    <SideBar clickHandler={sidebarChange} closeHandler={sidebarChange} sideBarOpen={sidebarOpen}/>
    <Overlay isOpen={overlayOpen}/>
      <Routes>
        <Route element={<Protected/>}>
          <Route path='/user/collection' element={<CollectionPage overlayChange={childClickChange} overlayOpen={overlayOpen}/>}></Route>
          <Route path='/user/diary/:id' element={<UserDiary overlayChange={childClickChange} overlayOpen={overlayOpen}/>}></Route>
          <Route path='/user/account' element={<AccountPage/>}></Route>
        </Route>
        <Route element={<Authed/>}>
          <Route path='/diary' element={<DiaryPage overlayChange={childClickChange} overlayOpen={overlayOpen}/>}></Route>       
          <Route path='/sign-up' element={<SignupPage overlayChange={childClickChange} overlayOpen={overlayOpen}/>}></Route>
          <Route path='/log-in' element={<LoginPage overlayChange={childClickChange} overlayOpen={overlayOpen}/>}></Route>
        </Route>
        <Route path='/' element={<HomePage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
