import React, { useState, useEffect, useRef } from 'react';
import '../styles/AddModal.css';

interface propInterface{
    addModalHandler: (event: React.MouseEvent<HTMLButtonElement>) => void,
    addModalIsOpen: boolean,
    addItem: () => void,
    closeModal: () => void;
}

function Modal(prop:propInterface){

    //get ref for modal, so when user clicks out of modal, the modal will close
    const modalRef = useRef<any>(null);

    useEffect(()=>{
        const handleEvent = (e:any) => {
            //checks to see if click event is outside of the ref component and that the modal is in fact open or value is true
            if((!modalRef.current.contains(e.target)) && prop.addModalIsOpen){
                //close modal, reverse boolean value
                prop.closeModal();
            }
        }

        document.addEventListener('mousedown', handleEvent);

        return() => {
            document.removeEventListener('mousedown', handleEvent);
        }
    })

    const addData = (e:any) => {
        e.preventDefault();
        prop.addItem();
    }

    //create ref for input then when rendered will autofocus to it
    const inputRef = useRef<any>();

    useEffect(()=>{
        if(inputRef){
            inputRef.current.focus();
        }
    })

    return(
        <aside className={`addModal ${prop.addModalIsOpen?'active':''}`} ref={modalRef}>
            <div className='addModal-header'>
                <h3 className='addModal-title'>Add an Entry</h3>
                <button className='clse-btn' onClick={prop.addModalHandler}>&times;</button>
            </div>
            <div className='addModal-body'>
                    <input ref={inputRef}></input>
            </div>
            <div className='addModal-footer'>
                <div></div>
                <div className='ftr-btns'>
                    <button onClick={addData}>add</button>
                </div>
            </div>
        </aside>
    )
}

export default Modal;