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

    const addData = () => {
        prop.addItem();
    }

    return(
        <aside className={`modal ${prop.addModalIsOpen?'active':''}`} ref={modalRef}>
            <div className='modal-header'>
                <h3 className='modal-title'>Hi</h3>
                <button className='clse-btn' onClick={prop.addModalHandler}>&times;</button>
            </div>
            <div className='modal-body'>
                World
            </div>
            <div className='modal-footer'>
                <div></div>
                <div className='ftr-btns'>
                    <button onClick={addData}>add</button>
                </div>
            </div>
        </aside>
    )
}

export default Modal;