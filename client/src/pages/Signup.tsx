import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import HelpModal from '../components/HelpModal';
import '../styles/Signup.css';

interface propInterface{
    overlayChange: () => void,
    overlayOpen: boolean;
}

function Signup(prop: propInterface){

    //username input handling
    const [ usernameInput, setUsernameInput ] = useState('');

    const handleUsernameChange = (e:any) => {
        setUsernameInput(e.target.value);
    }

    //username error handling
    const[ usernameErrorMessage, setusernameErrorMessage ]= useState('');

    const handleUsernameError = (message:string) => {
        setusernameErrorMessage(message)
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

    //first name error handling
    const[ firstNameErrorMessage, setfirstNameErrorMessage ]= useState('');

    const handleFirstNameError = (message:string) => {
        setfirstNameErrorMessage(message)
    }

    //last name error handling
    const[ lastNameErrorMessage, setLastNameErrorMessage ]= useState('');

    const handleLastNameError = (message:string) => {
        setLastNameErrorMessage(message)
    }

    //password input handling
    const [ passwordInput, setPasswordInput ] = useState('');

    const handlePasswordChange = (e:any) => {
        setPasswordInput(e.target.value);
    }

     //password error handling
     const[ pwErrorMessage, setPwErrorMessage ]= useState('');

     const handlePwError = (message:string) => {
         setPwErrorMessage(message)
     }

    //password re-enter input handling
    const [ rePasswordInput, setRePasswordInput ] = useState('');

    const handleRePasswordChange = (e:any) => {
        setRePasswordInput(e.target.value);
    }

    //password re-enter error handling
    const[ rePwErrorMessage, setRePwErrorMessage ]= useState('');

    const handleRePwError = (message:string) => {
        setRePwErrorMessage(message)
    }

    //terms & conditions checkbox input handling
    const [ checked, setChecked ] = useState(false);

    const handleCheckBox = (e:any) => {
        setChecked(!checked);
    }

    //onsubmit form handling
    const handleSubmit = (e:any) => {
        e.preventDefault();

        //sample validation(delete later)
        if(usernameInput.length < 5){
            handleUsernameError("username not valid");
            return;
        }

        handleUsernameError("");

        //check if input is longer than 1 character
        if(firstnameInput.length < 2){
            handleFirstNameError("first name not valid");
            return;
        }

        alert(typeof firstnameInput)
        alert('hi')

        handleFirstNameError("");

        //check if input is longer than 1 character
        if(lastnameInput.length < 2){
            handleLastNameError("last name not valid");
            return;
        }

        handleLastNameError("");

        //check to see if pw is at least 5 characters
        if(passwordInput.length < 5){
            handlePwError("password not strong enough");
            return;
        }

        handlePwError("");

        //check to see if pw matches
        if(rePasswordInput !== passwordInput){
            handleRePwError("password does not match");
            return;
        }

        handleRePwError("");

        //alert user if checkbox is not checked
        if(!checked){
            alert("need to check box")
            return;
        }

        //call api
        console.log('ok');
    }

    //open close modal
    const [modalOpen, setModalOpen] = useState(false);

    const changeModal = () => {
        setModalOpen(!modalOpen);
        prop.overlayChange();
    }

    return(
        <main>
            <HelpModal helpModalHandler={changeModal} helpModalIsOpen={modalOpen} closeModal={changeModal} message={'Enter info at own risk, you are responsible for your own data.'}/>
            <div className='content'>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <Input changeHandler={handleUsernameChange} value={usernameInput} type='text' placeholder='Username' errorMessage={usernameErrorMessage} required={true}/>
                    <Input changeHandler={handleFirstnameChange} value={firstnameInput} type='text' placeholder='First Name' errorMessage={firstNameErrorMessage} required={true}/>
                    <Input changeHandler={handleLastnameChange} value={lastnameInput} type='text' placeholder='Last Name' errorMessage={lastNameErrorMessage} required={true}/>
                    <Input changeHandler={handlePasswordChange} value={passwordInput} type='password' placeholder='Password' errorMessage={pwErrorMessage} required={true}/>
                    <Input changeHandler={handleRePasswordChange} value={rePasswordInput} type='password' placeholder='Re-Enter Password' errorMessage={rePwErrorMessage} required={true}/>
                    <div className='terms'>
                    <label><input type='checkbox' id='checkbox' onChange={handleCheckBox}/>I agree to the </label><span className='term-serv-click' onClick={changeModal}>terms and conditions</span><span className='term-serv-end'>.</span>
                    </div>
                    <button className='signupBtn' type='submit'>Sign Up</button>
                </form>
                <div className='members'>
                    <p>Already a member?<Link to='/log-in'>Login Here</Link></p>
                </div>
            </div>
        </main>
    )
}

export default Signup;

//<Input type='text' placeholder='Username' error={false} errorMessage={''} required={true}/>
  //                  <Input type='text' placeholder='First Name' error={false} errorMessage={''} required={true}/>
    //              <Input type='text' placeholder='Last Name' error={false} errorMessage={''} required={true}/>
     //               <Input type='password' placeholder='Password' error={false} errorMessage={''} required={true}/>
       //             <Input type='password' placeholder='Re-Enter Password' error={false} errorMessage={''} required={true}/>