import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '../components/Table';
import '../styles/Diary.css'

//sample iterface
interface iData{
    id: number,
    name: string;
}

function Diary(){

    const [ itemData, setItemData ] = useState<iData[]>([]);

    const deleteId = (id:number) => {
        setItemData(prev => {return prev.filter(item => item.id !== id)})
    }

    const addData = () => {
        const data = {id:Math.floor(Math.random() * 100), name:'world'}
        setItemData(prev => [...prev, data])
    }

    return(
        <main className='page-content'>
            <section className='food-diary-section-one'>
                <div className='section-one-content'>
                    <div className='date'>
                        <span>January</span>
                        <span className='date-day'>5</span>
                        <span>2023</span>
                    </div>
                    <div className='sec-one-right'>
                        <div className='sec-one-stats'>
                            <div>10</div>
                            <div>20</div>
                            <div>30</div>
                            <div>2000</div>
                        </div>
                        <div className='sec-one-buttons'>
                        <button>save</button>
                        <button onClick={addData}>add food</button>
                        </div>
                        <button className='content-btn'>?</button>
                    </div>
                </div>
            </section>
            <section className='food-diary-section-two'>
                <div className='section-two-content'>
                    <Table deleteHandler={deleteId} addHandler={addData} itemData={itemData}/>
                </div>
            </section>
        </main>
    )
}

export default Diary;