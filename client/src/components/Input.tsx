import React from 'react';
import '../styles/Input.css';

interface propHandler{
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
    type: string,
    placeholder: string,
    errorMessage: string,
    required: boolean;
}

function Input(prop:propHandler){
    return(
        <div className={`inputField ${prop.value !==''?'field_not_empty':''}`}>
            <div className='fieldLabel'>
            <label htmlFor={prop.type}>{prop.placeholder.toLowerCase()}</label>
            <span className='err'>{prop.errorMessage}</span>
            </div>
            <input required={prop.required}className='fieldInput'id={prop.type} placeholder={prop.placeholder} type={prop.type} value={prop.value} onChange={prop.changeHandler}></input>
        </div>
    )
}

export default Input;