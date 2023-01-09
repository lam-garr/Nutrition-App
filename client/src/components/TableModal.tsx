import React from 'react';
import '../styles/tableModal.css';

interface propInterface{
    tableModalHandler: (event: React.MouseEvent<HTMLButtonElement>) => void,
    tModalIsOpen: boolean;
}

function Modal(prop:propInterface){

    return(
        <aside className={`modal ${prop.tModalIsOpen?'active':''}`}>
            <div className='modal-header'>
                <h3 className='modal-title'>Hi</h3>
                <button className='clse-btn' onClick={prop.tableModalHandler}>&times;</button>
            </div>
            <div className='modal-body'>
                World
            </div>
            <div className='modal-footer'>
                {/*add elements here (WIP) */}
            </div>
        </aside>
    )
}

export default Modal;