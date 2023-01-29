import React, { useState, useEffect, useRef} from 'react';
import { objInterface } from '../interface';
import '../styles/tableModal.css';

interface propInterface{
    tableModalHandler: (event: React.MouseEvent<HTMLButtonElement>) => void,
    tableModalIsOpen: boolean,
    itemData: objInterface,
    closeModal: () => void;
    //tableModalClose: () => void;
}

function Modal(prop:propInterface){

    //testing
    if(prop.itemData){
        Object.entries(prop.itemData).forEach(([key, value])=>{
            console.log(`${key}:${value}`)
        })
    }

    const modalRef = useRef<any>(null);

    useEffect(()=>{
        const handleEvent = (e:any) => {
            //checks to see if click event is outside of the ref component and that the modal is in fact open or value is true
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

    //create ref for modal component that scrolls
    const modalBodyRef = useRef<any>(null);

    useEffect(()=>{
        //component will scroll to the top when rendered
        if(modalBodyRef){
            modalBodyRef.current.scrollTo(0, 0);
        }
    })

    return(
        <aside className={`modal ${prop.tableModalIsOpen?'active':''}`} ref={modalRef}>
            <div className='modal-header'>
                <h3 className='modal-title'>{prop.itemData?prop.itemData.id:''}</h3>
                <button className='clse-btn' onClick={prop.tableModalHandler}>&times;</button>
            </div>
            <div className='modal-body' ref={modalBodyRef}>
               <table>
                   <tbody>
                       <tr>
                           <th>Name</th>
                           <th>Quantity</th>
                       </tr>
                       {prop.itemData && Object.entries(prop.itemData).map(item => {
                           console.log(item[0],item[1]);
                           return(
                               <tr>
                                   <td>{item[1].label}</td>
                                   <td>{item[1].quantity} {item[1].unit}</td>
                               </tr>
                           )
                       })}
                   </tbody>
               </table>
            </div>
            <div className='modal-footer'>
                {/*add elements here (WIP) */}
            </div>
        </aside>
    )
}

export default Modal;