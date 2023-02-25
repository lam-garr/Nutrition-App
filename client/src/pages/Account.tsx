import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/Account.css';

function Account(){

    const [ user, setUser ] = useState('');

    const [ arr, setArr ] = useState<any[]>([]);

    useEffect(() => {

        const fetchData = async () => {
            const data = window.localStorage.getItem('AccessToken');

            let dataToken;

            if(data){
                dataToken = JSON.parse(data);
            }

            const response = await fetch('/api/testing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${dataToken}`
                }
            });

            const resObj = await response.json();

            if(resObj){
                setUser(resObj.user.username);
                //console.log(`resObj.user : ${resObj.user}`);
                //console.log(`resObj.user._id : ${resObj.user._id}`);
                //console.log(`resObj.user.username : ${resObj.user.username}`)
                console.log(resObj.user.myData)
                console.log(resObj.user.myData[0].id)
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
                    {arr}
                </div>
                <button className='acc-dltBtn' disabled={true}>Delete account</button>
            </div>
        </main>
    )
}

export default Account;