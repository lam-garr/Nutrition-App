import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/Account.css';

function Account(){

    const [ user, setUser ] = useState('');

    useEffect(() => {

        const data = window.localStorage.getItem('AccessToken');

        const fetchData = async () => {
            const response = await fetch('/api/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data}`
                }
            });

            const resObj = await response.json();

            if(resObj && resObj.user != null){
                setUser(resObj.user);
            }
        }

        fetchData();
    })

    return(
        <main>
            <div className='acc-content'>
                <h1>Account</h1>
                <div>
                    <span>{`id: ${user}`}</span>
                </div>
                <button className='acc-dltBtn' disabled={true}>Delete account</button>
            </div>
        </main>
    )
}

export default Account;