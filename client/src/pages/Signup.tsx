import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import '../styles/Signup.css';

function Signup(){

    //username input handling
    const [ usernameInput, setUsernameInput ] = useState('');

    const handleUsernameChange = (e:any) => {
        setUsernameInput(e.target.value);
    }

    //first and last name input handling
    const [ firstnameInput, setFirstnameInput ] = useState('');

    const handleFirstnameChange = (e:any) => {
        setFirstnameInput(e.target.value);
    }

    const [ lastnameInput, setLastnameInput ] = useState('');

    const handleLastnameChange = (e:any) => {
        setLastnameInput(e.target.value);
    }

    //password input handling
    const [ passwordInput, setPasswordInput ] = useState('');

    const handlePasswordChange = (e:any) => {
        setPasswordInput(e.target.value);
    }

    //password re-enter input handling
    const [ rePasswordInput, setRePasswordInput ] = useState('');

    const handleRePasswordChange = (e:any) => {
        setRePasswordInput(e.target.value);
    }

    //onsubmit form handling
    const handleSubmit = (e:any) => {
        e.preventDefault();
    }

    return(
        <body>
            <div className='content'>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <Input changeHandler={handleUsernameChange} value={usernameInput} type='text' placeholder='Username' error={false} errorMessage={''} required={true}/>
                    <Input changeHandler={handleFirstnameChange} value={firstnameInput} type='text' placeholder='First Name' error={false} errorMessage={''} required={true}/>
                    <Input changeHandler={handleLastnameChange} value={lastnameInput} type='text' placeholder='Last Name' error={false} errorMessage={''} required={true}/>
                    <Input changeHandler={handlePasswordChange} value={passwordInput} type='password' placeholder='Password' error={false} errorMessage={''} required={true}/>
                    <Input changeHandler={handleRePasswordChange} value={rePasswordInput} type='password' placeholder='Re-Enter Password' error={false} errorMessage={''} required={true}/>
                </form>
                <div className='terms'>
                    <label><input type='checkbox' id='checkbox'/>I agree to the terms and conditions.</label>
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

//<Input type='text' placeholder='Username' error={false} errorMessage={''} required={true}/>
  //                  <Input type='text' placeholder='First Name' error={false} errorMessage={''} required={true}/>
    //              <Input type='text' placeholder='Last Name' error={false} errorMessage={''} required={true}/>
     //               <Input type='password' placeholder='Password' error={false} errorMessage={''} required={true}/>
       //             <Input type='password' placeholder='Re-Enter Password' error={false} errorMessage={''} required={true}/>