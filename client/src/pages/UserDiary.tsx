import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/UserDiary.css'

function UserDiary(){

    const param = useParams();
    //destructuring
    //const { id } : { id : string } = useparams();
    
    return(
        <main>{param.id}</main>
    )
}

export default UserDiary;