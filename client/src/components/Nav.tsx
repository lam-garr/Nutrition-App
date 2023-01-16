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
                <button onClick={prop.sidebarHandler}>menu</button>
                <div className='nav-logo'>
                    <Link to={'/'}>
                        <h1>Title</h1>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Nav;