import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import HelpModal from '../components/HelpModal';
import '../styles/Login.css';

interface propInterface{
    overlayChange: () => void,
    overlayOpen: boolean;
}

function Login(prop: propInterface){

    //login username input handling
    const [ loginInput, setLoginInput ] = useState('');

    const handleLoginChange = (e:any) => {
        setLoginInput(e.target.value);
    }

    //login username error handling
    const[ LoginErrorMessage, setLoginErrorMessage ]= useState('');

    const handleLoginError = (message:string) => {
        setLoginErrorMessage(message)
    }

    //password input handling
    const[ passwordInput, setPasswordInput ] = useState('');

    const handlePasswordChange = (e:any) => {
        setPasswordInput(e.target.value);
    }

    //password error handling
    const[ pwErrorMessage, setPwErrorMessage ]= useState('');

    const handlePwError = (message:string) => {
        setPwErrorMessage(message)
    }

    //onsubmit form handling
    const handleSubmit = (e:any) => {
        e.preventDefault();
        
        //sample validation(delete later)
        if(loginInput.length < 5){
            handleLoginError("username incorrect");
            return;
        }

        setLoginErrorMessage('');
        //sample validation(delete later)
        if(passwordInput.length < 5){
            handlePwError('password incorrect');
            return;
        }

        setPwErrorMessage('');

        //call login api (WIP)
        console.log("ok")
    }

    //open close modal
    const [modalOpen, setModalOpen] = useState(false);

    const changeModal = () => {
        setModalOpen(!modalOpen);
        prop.overlayChange();
    }

    return(
        <main>
            <HelpModal helpModalHandler={changeModal} helpModalIsOpen={modalOpen} closeModal={changeModal}/>
            <div className='content'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <Input changeHandler={handleLoginChange} value={loginInput} type='text' placeholder='Username' errorMessage={LoginErrorMessage} required={true}/>
                    <Input changeHandler={handlePasswordChange} value={passwordInput} type='password' placeholder='Password' errorMessage={pwErrorMessage} required={true}/>
                    <div className='help'>
                        <span className='forgot' onClick={changeModal}>Forgot Password?</span>
                    </div>
                    <button type='submit'>Log In</button>
                </form>
                <div className='members'>
                Not a member? <Link to='/sign-up'>Sign Up</Link>
                </div>
            </div>
        </main>
    )
}

export default Login;