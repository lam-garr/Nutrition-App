import React, { useState, useEffect, useRef} from 'react';
import '../styles/tableModal.css';

interface propInterface{
    tableModalHandler: (event: React.MouseEvent<HTMLButtonElement>) => void,
    tableModalIsOpen: boolean,
    itemData: {id: number, name: string},
    closeModal: () => void;
    //tableModalClose: () => void;
}

function Modal(prop:propInterface){

    const modalRef = useRef<any>();

    useEffect(()=>{
        const handleEvent = (e:any) => {
            if((!modalRef.current.contains(e.target)) && prop.tableModalIsOpen){
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
        <aside className={`modal ${prop.tableModalIsOpen?'active':''}`} ref={modalRef}>
            <div className='modal-header'>
                <h3 className='modal-title'>{prop.itemData?prop.itemData.id:''}</h3>
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