import React, { useState, useEffect, useRef } from 'react';
import '../styles/AddModal.css';

interface propInterface{
    addModalHandler: (event: React.MouseEvent<HTMLButtonElement>) => void,
    addModalIsOpen: boolean,
    closeModal: () => void,
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
    addHandler: (name: string) => void,
    fethcing: boolean,
    empty: boolean;
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

    //function will be called when form is submitted, passing the input field data to parent
    const addData = (e:any, name:string) => {
        e.preventDefault();
        prop.addHandler(name);
    }

    //create ref for input then when rendered will autofocus to it
    const inputRef = useRef<any>();

    useEffect(()=>{
        if(inputRef){
            inputRef.current.focus();
        }
    })

    const addBtnHandler = () => {
        if(!prop.fethcing){
            return 'Add'
        }else{
            return 'Waiting'
        }
    }

    return(
        <aside className={`addModal ${prop.addModalIsOpen?'active':''}`} ref={modalRef}>
            <div className='addModal-header'>
                <h3 className='addModal-title'>Add an Entry</h3>
                <button className='clse-btn' onClick={prop.addModalHandler}>{`\u00D7`}</button>
            </div>
            <div className='addModal-body'>
                    <form className='addForm'>
                        <div className='addFormInput'>
                            <label>Enter item name:</label>
                            <input required className='addInput' ref={inputRef} onChange={prop.changeHandler} value={prop.value}></input>
                            {prop.empty && <span className='add-empty'>Input is not valid, please try again!</span>}
                        </div>
                        <div>
                            <label>choose</label>
                            <select>
                                <option>select</option>
                                <option>lb</option>
                                <option>kg</option>
                            </select>
                        </div>
                        <hr/>
                        <div className='form-btns'>
                            <div></div>
                            <button type='submit' onClick={(e)=>{addData(e, prop.value)}} className='addBtn' disabled={prop.fethcing}>{addBtnHandler()}</button>
                        </div>
                    </form>
            </div>
        </aside>
    )
}

export default Modal;