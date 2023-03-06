import React from 'react';
import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function Protected(){

    //useState to handle validated token return
    const [ validated, setValidated ] = useState(false);

    useEffect(() => {
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
            
            if(resObj && resObj.message === 'success'){
                console.log('inside success')
                setValidated(true);
                console.log(validated)
            }
        }
    
        validate();
    },[])

    console.log(validated);
    return validated ? <Outlet/> : <Navigate to='/log-in'/>;
}

export default Protected;

