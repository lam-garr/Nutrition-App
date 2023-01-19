import React, { useState, useEffect, useRef}from 'react';
import '../styles/HelpModal.css';

interface propInterface{
    helpModalHandler: (event: React.MouseEvent<HTMLButtonElement>) => void,
    helpModalIsOpen: boolean,
    closeModal: () => void,
    message: string;
}

function HelpModal(prop:propInterface){

    //get ref for modal, so when user clicks out of modal, the modal will close
    const modalRef = useRef<any>(null);

    useEffect(()=>{
        const handleEvent = (e:any) => {
            //checks to see if click event is outside of the ref component and that the modal is in fact open or value is true
            if((!modalRef.current.contains(e.target)) && prop.helpModalIsOpen){
                //close modal, reverse boolean value
                prop.closeModal();
            }
        }

        document.addEventListener('mousedown', handleEvent);

        return() => {
            document.removeEventListener('mousedown', handleEvent);
        }
    })

    return(
        <aside className={`help-modal ${prop.helpModalIsOpen?'active':''}`} ref={modalRef}>
            <div className='help-modal-header'>
                <h3 className='help-modal-title'>Help</h3>
                <button className='help-clse-btn' onClick={prop.helpModalHandler}>&times;</button>
            </div>
            <div className='help-modal-body'>
                {prop.message}
            </div>
        </aside>
    )
}

export default HelpModal;