import React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function Authed({children}: any){

    const [ validated, setValidated ] = useState(false);

    const validate = async () => {
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