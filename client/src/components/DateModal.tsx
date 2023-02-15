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
    year: number,
    create?: () => void;
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
                <div></div>
                <h3 className='date-modal-title'>Select the Date</h3>
                <button className='date-clse-btn' onClick={prop.dateModalHandler}>&times;</button>
            </div>
            <div className='date-modal-body'>
                <label htmlFor='change-month'>Select Month</label>
                <select className='date-month-sel' id='change-month' onChange={(e) => prop.changeMonth(e)} value={prop.month}>
                    <option value='January'>January</option>
                    <option value='February'>February</option>
                    <option value='March'>March</option>
                    <option value='April'>April</option>
                    <option value='May'>May</option>
                    <option value='June'>June</option>
                    <option value='July'>July</option>
                    <option value='August'>August</option>
                    <option value='September'>September</option>
                    <option value='October'>October</option>
                    <option value='November'>November</option>
                    <option value='December'>December</option>
                </select>
                <label htmlFor='change-date'>Select Date</label>
                <select className='date-day-sel' id='change-date' onChange={(e) => prop.changeDay(e)} value={prop.day}>
                    {dateOptions()}
                </select> 
                <button className='date-btn' onClick={prop.create}>OK</button>
            </div>
        </aside>
    )
}

export default DateModal;