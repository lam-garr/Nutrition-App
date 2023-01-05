import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';

function Nav(){
    return(
        <nav className='nav-bar'>
            <div className='nav-container'>
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