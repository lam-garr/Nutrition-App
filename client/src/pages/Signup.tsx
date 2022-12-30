import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Signup.css';

function Signup(){
    return(
        <body>
            <div className='content'>
                <h1>Sign Up</h1>
                <form action='/api/sign-up' method='post'>
                    <input required type='text' placeholder='Username'/>
                    <input type='text' placeholder='First Name'/>
                    <input type='text' placeholder='Last Name'/>
                    <input required type='password' placeholder='Password'/>
                    <input required type='password' placeholder='Re-Enter Password'/>
                </form>
                <div className='terms'>
                    <label><input type='checkbox' id='checkbox'/>I agree</label>
                </div>
                <button>Sign Up</button>
                <div className='members'>
                    <p>Already a member?<Link to='/log-in'>Login Here</Link></p>
                </div>
            </div>
        </body>
    )
}

export default Signup;