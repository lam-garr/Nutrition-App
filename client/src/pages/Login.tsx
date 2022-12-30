import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

function Login(){
    return(
        <body>
            <div className='content'>
                <h1>Login</h1>
                <form>
                    <input required type='text' placeholder='Username'/>
                    <input required type='password' placeholder='Password'/>
                    <div className='help'>
                        Forgot Pawword
                    </div>
                </form>
                <button>Log In</button>
                <div className='members'>
                Not a member? <Link to='/sign-up'>Sign Up</Link>
                </div>
            </div>
        </body>
    )
}

export default Login;