import React from 'react';
import '../styles/Account.css';

function Account(){
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