import React, {useEffect, useRef, useState}from 'react';
import { Link } from 'react-router-dom';
import '../styles/SideBar.css';

interface propInterface{
    clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void,
    closeHandler: () => void,
    sideBarOpen: boolean;
}

function SideBar(prop: propInterface){

    //useRef for sidebar, when click outside of it, sidebar will close
    const sidebarRef = useRef<any>(null);

    useEffect(() => {
        const handleEvent = (e:any) => {
            if((!sidebarRef.current.contains(e.target)) && prop.sideBarOpen){
                prop.closeHandler();
            }
        };

        document.addEventListener('mousedown', handleEvent);

        return() => {
            document.removeEventListener('mousedown', handleEvent);
        }
    })

    //setState for whether or not user is logged in
    const [ loggedIn, setLoggedIn ] = useState(false);

    //state for access token
    const [ accessToken, setAccessToken ] = useState(window.localStorage.getItem('AccessToken'));

    //check local storage to see if user is authenticated with access token
    useEffect(() => {

        /* console.log('inside useeffect')
        const data = window.localStorage.getItem('AccessToken');

        let dataToken: any;

        if(data && data.length){
            dataToken = JSON.parse(data);
            //setAccessToken(JSON.parse(data))
            console.log(data)
            setLoggedIn(true);
        }
        
        const validateTk = async () => {

            const response = await fetch('/api/validate', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${dataToken}`
                }
            });

            const resObj = await response.json();

            if(resObj && resObj.message === 'success'){
                setLoggedIn(true);
            }else{
                setLoggedIn(false);
            }
        }

        validateTk(); */

        const data = window.localStorage.getItem('AccessToken');
        if(data && data.length){
            setLoggedIn(true);
        }else{
            setLoggedIn(false);
        }

    },[prop.sideBarOpen])

    const signOut = () => {
        setLoggedIn(false);
        setAccessToken(null)
        window.localStorage.removeItem('AccessToken');
        prop.closeHandler();
    }

    return(
        <aside className={`sidebar ${prop.sideBarOpen?'active':'inactive'}`} ref={sidebarRef}>
            <div className='sidebar-header'>
                <div></div>
                <button className='sidebar-close' onClick={prop.clickHandler}>&times;</button>
            </div>
            <Link to={'/'}><button onClick={prop.closeHandler}>Home</button></Link>
            <Link to={'/diary'}><button onClick={prop.closeHandler}>Food Diary</button></Link>
            {loggedIn && <Link to={'/user/collection'}><button onClick={prop.closeHandler}>Diary Entries</button></Link>}
            {loggedIn && <Link to={'/user/account'}><button onClick={prop.closeHandler}>Account</button></Link>}
            {loggedIn ? (<Link to={'log-in'}><button onClick={signOut}>Sign Out</button></Link>)
             : (<Link to={'/log-in'}><button onClick={prop.closeHandler}>Log In</button></Link>)}
        </aside>
    )
}

export default SideBar;