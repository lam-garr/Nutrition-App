import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '../components/Table';
import TableModal from '../components/TableModal';
import AddModal from '../components/AddModal';
import '../styles/Diary.css'

//sample iterface
interface iData{
    id: number,
    name: string;
}

interface diaryProp{
    overlayChange: () => void,
    overlayOpen: boolean;
}

function Diary(prop:diaryProp){

    const [ itemData, setItemData ] = useState<iData[]>([]);

    const deleteId = (id:number) => {
        setItemData(prev => {return prev.filter(item => item.id !== id)})
    }

    const addData = () => {
        const data = {id:Math.floor(Math.random() * 100), name:'world'}
        setItemData(prev => [...prev, data])

        //close modal after adding item to array
        changeAddModal();
    }

    //change overlay from parent
    const changeOverlay = () => {
        prop.overlayChange();
    }

    const [ tableModalOpen, setTableModalOpen ] = useState(false);

    //open close table modal handler
    const changeTableModal = () => {
        setTableModalOpen(!tableModalOpen);
        prop.overlayChange();
    }

    //open close add modal handler
    const [ addModalOpen, setAddModalOpen ] = useState(false);

    const changeAddModal = () => {
        setAddModalOpen(!addModalOpen);
        prop.overlayChange();
    }

    //handle rendering the modal with item data
    const displayItem = (id:number) => {
        changeTableModal();
        setPropItem(itemData.find(el => el.id === id));
    }

    //this useState will be sued to pass info for rendering in the TableModal
    //change useState typing when finished later
    const [ propItem, setPropItem ] = useState<any>();

    return(
        <main className='page-content'>
            <AddModal addModalHandler={changeAddModal} addModalIsOpen={addModalOpen} addItem={addData}/>
            <TableModal tableModalHandler={changeTableModal} tableModalIsOpen={tableModalOpen} itemData={propItem}/>
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
                        <button onClick={()=>{changeOverlay(); changeAddModal()}}>add food</button>
                        </div>
                        <button className='content-btn'>?</button>
                    </div>
                </div>
            </section>
            <section className='food-diary-section-two'>
                <div className='section-two-content'>
                    <Table deleteHandler={deleteId} addHandler={addData} itemData={itemData} itemDataHandler={displayItem}/>
                </div>
            </section>
        </main>
    )
}

export default Diary;