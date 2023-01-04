import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import '../styles/Signup.css';

function Signup(){
    return(
        <body>
            <div className='content'>
                <h1>Sign Up</h1>
                <form action='/api/sign-up' method='post'>
                    <Input type='text' placeholder='Username' error={false} errorMessage={''} required={true}/>
                    <Input type='text' placeholder='First Name' error={false} errorMessage={''} required={true}/>
                    <Input type='text' placeholder='Last Name' error={false} errorMessage={''} required={true}/>
                    <Input type='password' placeholder='Password' error={false} errorMessage={''} required={true}/>
                    <Input type='password' placeholder='Re-Enter Password' error={false} errorMessage={''} required={true}/>
                </form>
                <div className='terms'>
                    <label><input type='checkbox' id='checkbox'/>I agree to the term and conditions.</label>
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