import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import '../styles/Login.css';

function Login(){
    return(
        <body>
            <div className='content'>
                <h1>Login</h1>
                <form>
                    <Input type='text' placeholder='Username' error={false}/>
                    <Input type='password' placeholder='Password' error={false}/>
                    <div className='help'>
                        Forgot Password
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