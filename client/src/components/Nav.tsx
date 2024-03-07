import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';

interface propInterface{
    sidebarHandler: () => void;
}

function Nav(prop: propInterface){
    return(
        <nav className='nav-bar'>
            <div className='nav-container'>
                <button className='menu-btn' onClick={prop.sidebarHandler}>
                    <div className='menu-div'></div>
                    <div className='menu-div'></div>
                    <div className='menu-div'></div>
                </button> 
                <div className='nav-logo'>
                    <Link to={'/'}>
                        <h1>NutriLog</h1>
                    </Link>
                </div>
                <div></div>
            </div>
        </nav>
    )
}

export default Nav;

