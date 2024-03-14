import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/Account.css';

function Account(){

    const [ username, setUsername ] = useState('');

    const [ fetching, setFetching ] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            const data = window.localStorage.getItem('AccessToken');

            let dataToken;

            if(data){
                dataToken = JSON.parse(data);
            }

            const response = await fetch('http://localhost:5000/api/account', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${dataToken}`
                }
            });

            const resObj = await response.json();

            if(resObj){
                setUsername(resObj.username);
                setFetching(false);
            }
        }

        fetchData();
    })

    return(
        <main>
            <div className='acc-content'>
                <h1>Account</h1>
                <div>
                    {fetching !== true && <span>{username}</span>}
                </div>
                <button className='acc-dltBtn' disabled={true}>Delete account</button>
            </div>
        </main>
    )
}

export default Account;