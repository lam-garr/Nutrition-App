import React from 'react';
import { Navigate } from 'react-router-dom';

function Protected({children}:any){
    //check if accessToken is present and validate
    const data = window.localStorage.getItem('AccessToken');

    const validate = async () => {
        const response = await fetch('/api/validate', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data}`
            }
        });
        console.log(response);
        //if response is error, set handler to false to redirect to log in
    }

    validate()

    return data ? children : <Navigate to='/log-in'/>;
}

export default Protected;

