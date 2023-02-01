import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Account.css';

function Account(){

    const navigate = useNavigate();

    //check to see if user is logged in
    useEffect(() => {
        const data = window.localStorage.getItem('AccessToken');
        console.log(data)
        if(!data){
            navigate('/log-in')
        }
    })

    return(
        <main>
            <div className='acc-content'>
                <h1>Account</h1>
                <div>
                    {/*sample id, change after login api implementation*/}
                    <span>id: 123456789</span>
                </div>
                <button className='acc-dltBtn'>Delete account</button>
            </div>
        </main>
    )
}

export default Account;