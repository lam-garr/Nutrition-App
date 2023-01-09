import React, { useState, useEffect, useRef} from 'react';
import '../styles/tableModal.css';

interface propInterface{
    tableModalHandler: (event: React.MouseEvent<HTMLButtonElement>) => void,
    tableModalIsOpen: boolean;
    //tableModalClose: () => void;
}

function Modal(prop:propInterface){

    const modalRef = useRef<any>();

    //useEffect for if user clicks off of the modal, it will close
    /*useEffect(()=>{
        const handleEvent = (e:any) => {
            if(!modalRef.current.contains(e.target)){
                prop.tableModalClose();
            }
        }

        document.addEventListener('mousedown', handleEvent);

        return() => {
            document.removeEventListener('mousedown', handleEvent);
        }
    })*/

    return(
        <aside className={`modal ${prop.tableModalIsOpen?'active':''}`} ref={modalRef}>
            <div className='modal-header'>
                <h3 className='modal-title'>Hi</h3>
                <button className='clse-btn' onClick={prop.tableModalHandler}>&times;</button>
            </div>
            <div className='modal-body'>
                World World World World World World World World World World World World World World
                World World World World World World World World World World World World World World
                World World World World World World World World World World World World World World
                World World World World World World World World World World World World World World
                World World World World World World World World World World World World World World
                World World World World World World World World World World World World World World
                World World World World World World World World World World World World World World
                World World World World World World World World World World World World World World
                World World World World World World World World World World World World World World
                World World World World World World World World World World World World World World
                World World World World World World World World World World World World World World
                World World World World World World World World World World World World World World

                World World World World World World World World World World World World World World
                World World World World World World World World World World World World World World
                World World World World World World World World World World World World World World
            </div>
            <div className='modal-footer'>
                {/*add elements here (WIP) */}
            </div>
        </aside>
    )
}

export default Modal;