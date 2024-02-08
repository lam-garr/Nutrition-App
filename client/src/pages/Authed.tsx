import React from 'react';
import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function Authed(){

    //useState to handle validated token return
    const [ validated, setValidated ] = useState(false);

    //state to handle api await
    const [ fetching, setFetching ] = useState(true);

    useEffect(() => {
        /* const validate = async () => {
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
            
            if(resObj && resObj.message === 'success'){
                setValidated(true);
                setFetching(false);
            }else{
                setFetching(false);
            }
        }
    
        validate(); */

        if(window.localStorage.getItem("AccessToken")) {
            setValidated(true);
            setFetching(false);
        } else {
            setFetching(false);
        }

    },[])

    if(fetching){
        return null;
    }

    return validated ? <Navigate to='/nutrition-app/user/collection'/> : <Outlet/>;
}

export default Authed;