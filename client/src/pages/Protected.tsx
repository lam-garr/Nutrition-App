import React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function Protected({children}:any){
    //check if accessToken is present and validate
    const data = window.localStorage.getItem('AccessToken');

    //useState to handle validated token return
    const [ validated, setValidated ] = useState(false);

    const validate = async () => {
        const response = await fetch('/api/validate', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data}`
            }
        });
        const resObj = await response.json();
        //console.log(resObj.message)
        //if response is error, set handler to false to redirect to log in
        if(resObj){
            setValidated(true);
        }
    }

    //validate();

    return validated ? children : <Navigate to='/log-in'/>;
}

export default Protected;

