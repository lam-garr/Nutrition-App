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

    //delete item by id
    const deleteId = (id:number) => {
        setItemData(prev => {return prev.filter(item => item.id !== id)});
    }

    //add item
    const addData = (name:string) => {
        const data = {id:Math.floor(Math.random() * 100), name:name};
        setItemData(prev => [...prev, data]);

        //clear input data
        setAddInput('');

        //close modal after adding item to array
        changeAddModal();
    }

    //useEffect to check if there is data stored in localStorage
    //if so, then set stored data to array. Basically populates array with the stored data
    useEffect(() => {
        const data = window.localStorage.getItem('GUEST_DATA');
        if(data !== null && (JSON.parse(data)).length){
            setItemData(JSON.parse(data));
        }
    },[])

    //useEffect to update array whenever itemData state is changed
    useEffect(() => {
        window.localStorage.setItem('GUEST_DATA', JSON.stringify(itemData));    
    },[itemData])

    //change overlay from parent
    const changeOverlay = () => {
        prop.overlayChange();
    }

    //open close table modal handler
    const [ tableModalOpen, setTableModalOpen ] = useState(false);

    const changeTableModal = () => {
        setTableModalOpen(!tableModalOpen);
        prop.overlayChange();
    }

    //open close add modal handler
    const [ addModalOpen, setAddModalOpen ] = useState(false);

    const changeAddModal = () => {
        setAddModalOpen(!addModalOpen);
        prop.overlayChange();
        setAddInput('');
    }

    //handle rendering the modal with item data
    const displayItem = (id:number) => {
        changeTableModal();
        setPropItem(itemData.find(el => el.id === id));
    }

    //this useState will be used to pass info for rendering in the TableModal
    //change useState typing when finished later
    const [ propItem, setPropItem ] = useState<any>();

    //handler for AddModal
    const [ addInput, setAddInput ] = useState('');

    const handleInputChange = (e:any) => {
        setAddInput(e.target.value);
    }

    return(
        <main className='page-content'>
            <AddModal addModalHandler={changeAddModal} addModalIsOpen={addModalOpen} closeModal={changeAddModal} changeHandler={handleInputChange} value={addInput} addHandler={addData}/>
            <TableModal tableModalHandler={changeTableModal} tableModalIsOpen={tableModalOpen} itemData={propItem} closeModal={changeTableModal}/>
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
                    <Table deleteHandler={deleteId} itemData={itemData} itemDataHandler={displayItem}/>
                </div>
            </section>
        </main>
    )
}

export default Diary;