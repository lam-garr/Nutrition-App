import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import '../styles/Login.css';

function Login(){

    //login username input handling
    const [ loginInput, setLoginInput ] = useState('');

    const handleLoginChange = (e:any) => {
        setLoginInput(e.target.value);
    }

    //password input handling
    const[ passwordInput, setPasswordInput ] = useState('');

    const handlePasswordChange = (e:any) => {
        setPasswordInput(e.target.value);
    }

    //onsubmit form handling
    const handleSubmit = (e:any) => {
        e.preventDefault();
    }

    return(
        <body>
            <div className='content'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <Input changeHandler={handleLoginChange} value={loginInput} type='text' placeholder='Username' error={false} errorMessage={'username not valid'} required={true}/>
                    <Input changeHandler={handlePasswordChange} value={passwordInput} type='password' placeholder='Password' error={false} errorMessage={''} required={true}/>
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