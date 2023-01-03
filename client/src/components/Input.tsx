import React from 'react';
import { useState } from 'react';
import '../styles/Input.css';

interface propHandler{
    type: string,
    placeholder: string,
    error: boolean;
}

function Input(prop:propHandler){

    const [input, setInput] = useState('');

    const changeInput = (e:any) =>{
        setInput(e.target.value)
    }

    return(
        <div className={`inputField ${input !==''?'field_not_empty':''}`}>
            <div className='fieldLabel'>
            <label htmlFor={prop.type}>{prop.placeholder.toLowerCase()}</label>
            <span className='err'>error</span>
            </div>
            <input className='fieldInput'id={prop.type} placeholder={prop.placeholder} type={prop.type} value={input} onChange={changeInput}></input>
        </div>
    )
}

export default Input;

//<input required type={prop.type} placeholder={prop.placeholder}></input>