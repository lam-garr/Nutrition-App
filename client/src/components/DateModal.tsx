import React, { useState, useEffect, useRef}from 'react';
import '../styles/DateModal.css';

interface propInterface{
    dateModalHandler: (event: React.MouseEvent<HTMLButtonElement>) => void,
    dateModalIsOpen: boolean,
    closeModal: () => void,
    changeMonth: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    changeDay: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    changeYear: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    month: string,
    day: number,
    year: number;
}

function DateModal(prop:propInterface){

    //get ref for modal, so when user clicks out of modal, the modal will close
    const modalRef = useRef<any>(null);

    useEffect(()=>{
        const handleEvent = (e:any) => {
            //checks to see if click event is outside of the ref component and that the modal is in fact open or value is true
            if((!modalRef.current.contains(e.target)) && prop.dateModalIsOpen){
                //close modal, reverse boolean value
                prop.closeModal();
            }
        }

        document.addEventListener('mousedown', handleEvent);

        return() => {
            document.removeEventListener('mousedown', handleEvent);
        }
    })

    //create date options for select
    const dateOptions = () => {
        const dateArr = [];

        for (let i = 1; i <= 31; i++){
            dateArr.push(<option key={i} value={i}>{i}</option>)
        }

        return dateArr
    }

    return(
        <aside className={`date-modal ${prop.dateModalIsOpen?'active':''}`} ref={modalRef}>
            <div className='date-modal-header'>
                <h3 className='date-modal-title'>Change the Date</h3>
                <button className='date-clse-btn' onClick={prop.dateModalHandler}>&times;</button>
            </div>
            <div className='date-modal-body'>
                <label htmlFor='change-month'>Change Month</label>
                <select className='date-month' id='change-month' onChange={(e) => prop.changeMonth(e)} value={prop.month}>
                    <option value='January'>January</option>
                    <option value='February'>February</option>
                </select>
                <label htmlFor='change-date'>Change Date</label>
                <select className='date-day' id='change-date' onChange={(e) => prop.changeDay(e)} value={prop.day}>
                    {dateOptions()}
                </select> 
            </div>
        </aside>
    )
}

export default DateModal;