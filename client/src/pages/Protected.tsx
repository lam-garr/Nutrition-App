import React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function Protected({children}:any){

    //useState to handle validated token return
    const [ validated, setValidated ] = useState(false);

    const validate = async () => {
        //check if accessToken is present and validate
        const data = window.localStorage.getItem('AccessToken');

        let dataToken;

        if(data){
            dataToken = JSON.parse(data);
        }

        const response = await fetch('/api/validate', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${dataToken}`
            }
        });
        const resObj = await response.json();
        console.log(resObj.message)
        
        if(resObj && resObj === 'success'){
            setValidated(true);
        }
    }

    validate();

    return validated ? children : <Navigate to='/log-in'/>;
}

export default Protected;

