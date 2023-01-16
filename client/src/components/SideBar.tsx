import React, {useRef}from 'react';
import { Link } from 'react-router-dom';
import '../styles/SideBar.css';

interface propInterface{
    clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void,
    closeHandler: () => void,
    sideBarOpen: boolean;
}

function SideBar(prop: propInterface){

    //check local storage to see if user is authenticated with access token
    const loggenIn = false;

    return(
        <aside className={`sidebar ${prop.sideBarOpen?'active':'inactive'}`}>
            <button className='sidebar-close' onClick={prop.clickHandler}>o</button>
            <Link to={'/'}><button onClick={prop.closeHandler}>Home</button></Link>
            <Link to={'/diary'}><button onClick={prop.closeHandler}>Food Diary</button></Link>
            {loggenIn && <Link to={'/user/collection'}><button onClick={prop.closeHandler}>Diary Entries</button></Link>}
            {loggenIn && <Link to={'/user/account'}><button onClick={prop.closeHandler}>Account</button></Link>}
        </aside>
    )
}

export default SideBar;