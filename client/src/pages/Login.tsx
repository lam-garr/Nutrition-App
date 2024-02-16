import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    const [ pwErrorMessage, setPwErrorMessage ] = useState('');

    const handlePwError = (message:string) => {
        setPwErrorMessage(message)
    }

    //login error handling
    const [ apiErrMsg, setApiErrMsg ] = useState(false);

    const navigate = useNavigate();

    //disable login button during api call
    const [ fetching, setFetching ] = useState(false);

    //onsubmit form handling
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        
        //check if input is valid
        if(loginInput.length <= 1){
            handleLoginError("username invalid");
            return;
        }

        setLoginErrorMessage('');

        //check if password is valid
        if(passwordInput.length <= 1){
            handlePwError('password invalid');
            return;
        }

        setPwErrorMessage('');

        setFetching(true);

        //call login api 
        const loginData = await fetch(`https://cottony-satin-eagle.glitch.me/log-in`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: loginInput, password: passwordInput})
        })

        const dataObj = await loginData.json();

        if(dataObj && dataObj.message === 'Login Error'){
            //const errData = await loginData.json();
            setLoginInput('');
            setPasswordInput('');
            setApiErrMsg(true);
        }else{
            setApiErrMsg(false);
            //set token returned from api to local storage
            window.localStorage.setItem('AccessToken', JSON.stringify(dataObj.accessToken))
            setFetching(false);
            //navigate to collection page
            navigate('/nutrition-app/user/collection');
        }
    }

    //open close modal
    const [modalOpen, setModalOpen] = useState(false);

    const changeModal = () => {
        setModalOpen(!modalOpen);
        prop.overlayChange();
    }

    const handleLoading = () => {
        if(fetching){
            return 'Loading';
        }else{
            return 'Log In';
        }
    }

    return(
        <main>
            <HelpModal helpModalHandler={changeModal} helpModalIsOpen={modalOpen} closeModal={changeModal} message={'Error, please try again later.'}/>
            <div className='content'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <Input changeHandler={handleLoginChange} value={loginInput} type='text' placeholder='Username' errorMessage={LoginErrorMessage} required={true}/>
                    <Input changeHandler={handlePasswordChange} value={passwordInput} type='password' placeholder='Password' errorMessage={pwErrorMessage} required={true}/>
                    <div className='help'>
                        <span className='forgot' onClick={changeModal}>Forgot Password?</span>
                    </div>
                    <div className='submit'>
                    {apiErrMsg && <span className='apiErr'>Error logging in, please try again</span>}
                    <button className='submitBtn' type='submit' disabled={fetching}>{handleLoading()}</button>
                    </div>
                </form>
                <div className='members'>
                Not a member? <Link to='/nutrition-app/sign-up'>Sign Up</Link>
                </div>
            </div>
        </main>
    )
}

export default Login;