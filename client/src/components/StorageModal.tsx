import React from 'react';
import '../styles/StorageModal.css';
import { useEffect, useRef } from 'react';

interface propInterface{
    modalHandler: (event: React.MouseEvent<HTMLButtonElement>) => void,
    modalIsOpen: boolean,
    closeModal: () => void,
    populate: () => void;
}

function StorageModal(prop:propInterface){

    return (
        <aside className={`store-modal ${prop.modalIsOpen?'active':''}`}>
            <div className='store-modal-header'>
                <div></div>
                <h3 className='store-modal-title'>Warning</h3>
                <button className='store-clse-btn'>&times;</button>
            </div>
            <div className='store-modal-body'>
                <span className='store-body-p1'>There seems to be stored data detected on this device, would you like to use this data for your diary?*</span>
                <span className='sotre-body-p2'>*Stored data will be cleared if used.</span>
                <div className='store-body-btns'>
                    <button className='store-btn-yes' onClick={prop.populate}>yes</button>
                    <button className='store-btn-no' onClick={prop.modalHandler}>no</button>
                </div>
            </div>
        </aside>
    )
}

export default StorageModal;