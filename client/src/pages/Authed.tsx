import React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function Authed({children}: any){

    const data = window.localStorage.getItem('AccessToken');

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
        
        if(resObj && resObj.message === 'success'){
            setValidated(true);
        }else{
            setValidated(false);
        }
    }

    validate();

    return validated ? <Navigate to='/user/collection'/> : children;
}

export default Authed;