import React, { useState, useEffect} from 'react';
import '../styles/AddModal.css';

interface propInterface{
    addModalHandler: (event: React.MouseEvent<HTMLButtonElement>) => void,
    addModalIsOpen: boolean,
    addItem: () => void;
    //tableModalClose: () => void;
}

function Modal(prop:propInterface){

    const addData = () => {
        prop.addItem();
    }

    return(
        <aside className={`modal ${prop.addModalIsOpen?'active':''}`}>
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