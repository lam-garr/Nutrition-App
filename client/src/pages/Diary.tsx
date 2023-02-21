import React from 'react';
import { useState, useEffect } from 'react';
import Table from '../components/Table';
import TableModal from '../components/TableModal';
import AddModal from '../components/AddModal';
import HelpModal from '../components/HelpModal';
import DateModal from '../components/DateModal';
import { objInterface } from '../interface';
import '../styles/Diary.css'
//
import { createObj } from '../mockObj';

interface diaryProp{
    overlayChange: () => void,
    overlayOpen: boolean;
}

function Diary(prop:diaryProp){

    const [ itemData, setItemData ] = useState<objInterface[]>([]);

    //delete item by id 
    const deleteId = (id:number) => {
        const delObj = itemData.find(obj => {return obj.id === id})

        if(delObj){
            changeCarbs(-Math.abs(Math.round(delObj.CHOCDF.quantity)));
            changeProtein(-Math.abs(Math.round(delObj.PROCNT.quantity)));
            changeFat(-Math.abs(Math.round(delObj.FAT.quantity)));
            changeCalories(-Math.abs(Math.round(delObj.ENERC_KCAL.quantity)))
        }

        setItemData(prev => {return prev.filter(item => item.id !== id)});
    }

    //add item
    const addData = async (ingr: string) => {
        //api call, uncomment when ready

        if(ingr === ''){
            setIsEmpty(true);
            return;
        }

        setFetching(true);
        const response = await fetch(`/api/nutr?search=${ingr}`);
        const apiObj = await response.json();

        //check if returned api object is vali
        if(apiObj.data === 'error with item'){
            setIsEmpty(true);
            setFetching(false);
            return;
        }

        setItemData(prev => [...prev, apiObj.data]);

        //const foodItem = createObj();
        //foodItem['name'] = ingr;
        //setItemData(prev => [...prev, foodItem]);
        //changeCarbs(Math.round(foodItem.CHOCDF.quantity))
        //changeProtein(Math.round(foodItem.PROCNT.quantity))
        //changeFat(Math.round(foodItem.FAT.quantity))
        //changeCalories(Math.round(foodItem.ENERC_KCAL.quantity))

        //update nutrients
        changeCarbs(Math.round(apiObj.data.CHOCDF.quantity))
        changeProtein(Math.round(apiObj.data.PROCNT.quantity))
        changeFat(Math.round(apiObj.data.FAT.quantity))
        changeCalories(Math.round(apiObj.data.ENERC_KCAL.quantity))

        //clear input data
        setAddInput('');

        //close modal after adding item to array
        changeAddModal();
    }

    //useState to handle if add input is empty
    const [ isEmpty, setIsEmpty ] = useState(false);

    //useState to store whether or not api request is being made, if so disable add button
    const [ fetching, setFetching ] = useState(false);

    //useEffect to check if there is data stored in localStorage
    //if so, then set stored data to array. Basically populates array with the stored data
    useEffect(() => {
        const data = window.localStorage.getItem('GUEST_DATA');
        if((data !== null) && ((JSON.parse(data)).length)){
            setItemData(JSON.parse(data));
        }
    },[])

    //useEffect to update array whenever itemData state is changed
    useEffect(() => {
        window.localStorage.setItem('GUEST_DATA', JSON.stringify(itemData));    
    },[itemData])

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
        setFetching(false);
        setIsEmpty(false);
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

    //open close help modal
    const [modalOpen, setModalOpen] = useState(false);

    const changeModal = () => {
        setModalOpen(!modalOpen);
        prop.overlayChange();
    }

    //handling the date for the diary

    const date = new Date();

    //handling for month with default month as initial month
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const [ month, setMonth ] = useState(months[date.getMonth()]);

    const changeMonth = (e:any) => {
        setMonth(e.target.value);
    }

    //handling for day with default day as initial day
    const [ day, setDay ] = useState(date.getDate());

    const changeDay = (e:any) => {
        setDay(e.target.value);
    }

    //handling for year with default year as initial year
    const [ year, setYear ] = useState(date.getFullYear());

    const changeYear = (e:any) => {
        setYear(e.target.value);
    }

    //open close Date modal
    const [dateOpen, setDateOpen] = useState(false);

    const changeDate = () => {
        setDateOpen(!dateOpen);
        prop.overlayChange();
    }

    //handling specific macronutrient value along with total calories

    //handling for carbs
    const [ carbs, setCarbs ] = useState(0);

    const changeCarbs = (value: number) => {
        setCarbs(carbs + value);
    }

    //handling for protein
    const [ protein, setProtein ] = useState(0);

    const changeProtein = (value: number) => {
        setProtein(protein + value);
    }

    //handling for fat
    const [ fat, setFat ] = useState(0);

    const changeFat = (value: number) => {
        setFat(fat + value);
    }

    //handling for total calories
    const [ calories, setCalories ] = useState(0);

    const changeCalories = (value: number) => {
        setCalories(calories + value);
    }

    //useEffect to update nutrient values from localStorage
    useEffect(() => {
        setFetching(true);
        const data = window.localStorage.getItem('GUEST_DATA_NUTR');
        if((data !== null) && ((JSON.parse(data)).kcal)>0){
            const parseData = JSON.parse(data);
            setCarbs(parseData.c);
            setProtein(parseData.p);
            setFat(parseData.f);
            setCalories(parseData.kcal);
        }
        setFetching(false);
    },[])

    //useEffect to update value for localStorage whenever value is changed
    useEffect(() => {
        window.localStorage.setItem('GUEST_DATA_NUTR', JSON.stringify({c:carbs, p:protein, f:fat, kcal:calories}))
    },[carbs, protein, fat, calories])

    return(
        <main className='page-content'>
            <AddModal addModalHandler={changeAddModal} addModalIsOpen={addModalOpen} closeModal={changeAddModal} changeHandler={handleInputChange} value={addInput} addHandler={addData} fethcing={fetching} empty={isEmpty}/>
            <TableModal tableModalHandler={changeTableModal} tableModalIsOpen={tableModalOpen} itemData={propItem} closeModal={changeTableModal}/>
            <HelpModal helpModalHandler={changeModal} helpModalIsOpen={modalOpen} closeModal={changeModal} message={'Please add food to track nutrients. Click info for more details on macro and micro nutrients and delete to delete an entry.'}/>
            <DateModal dateModalHandler={changeDate} dateModalIsOpen={dateOpen} closeModal={changeDate} changeMonth={changeMonth} changeDay={changeDay} changeYear={changeYear}/>
            <section className='food-diary-section-one'>
                <div className='section-one-content'>
                    <div className='date' onClick={changeDate}>
                        <span>{month}</span>
                        <span className='date-day'>{day}</span>
                        <span>{year}</span>
                    </div>
                    <div className='sec-one-right'>
                    <div className='sec-one-stats'>
                            <div className='sec-one-carbs'>
                                <div className='carb-data'>{carbs}g</div>
                                <span>carbohydrates</span>
                            </div>
                            <div className='sec-one-protein'>
                                <div className='protein-data'>{protein}g</div>
                                <span>protein</span>
                            </div>
                            <div className='sec-one-fat'>
                                <div className='fat-data'>{fat}g</div>
                                <span className='fat-span'>fat</span>
                            </div>
                            <div className='sec-one-cal'>
                                <div className='cal-data'>{calories}</div>
                                <span>calories</span>
                            </div>
                        </div>
                        <div className='sec-one-buttons'>
                        <button onClick={() => window.localStorage.removeItem('GUEST_DATA')}>save</button>
                        <button onClick={()=>{changeAddModal()}} className='diary-add-btn'>add food</button>
                        </div>
                        <button className='content-btn' onClick={changeModal}>{`\u003F`}</button>
                    </div>
                </div>
            </section>
            <section className='food-diary-section-two'>
                <div className='section-two-content'>
                   {itemData.length ? (<Table deleteHandler={deleteId} itemData={itemData} itemDataHandler={displayItem}/>) : 
                   (<div className='no-items'><span>There's nothing here, add food to get started!</span></div>)}
                </div>
            </section>
        </main>
    )
}

export default Diary;


{/* <div className='date'>
    <select className='date-month' onChange={(e) => changeMonth(e)} value={month}>
        <option value='January'>January</option>
        <option value='February'>February</option>
    </select>
</div>*/}