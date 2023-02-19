import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Table from '../components/Table';
import TableModal from '../components/TableModal';
import AddModal from '../components/AddModal';
import HelpModal from '../components/HelpModal';
import DateModal from '../components/DateModal';
import StorageModal from '../components/StorageModal';
import '../styles/UserDiary.css';
import { objInterface } from '../interface';

interface userDiaryProp{
    overlayChange: () => void,
    overlayOpen: boolean;
}

function UserDiary(prop: userDiaryProp){

    const param = useParams();
    console.log(param.id);
    //destructuring
    //const { id } : { id : string } = useparams();
    //**********************************************************************/


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

    //open close storage modal
    const [ storeOpen, setStoreOpen ] = useState(false);

    const changeStoreModal = () => {
        setStoreOpen(!storeOpen);
        prop.overlayChange();
    }

    //function to execute if user wants to use stored data
    const populateData = () => {
        //close modal then populate & persist data to db from local storage
        changeStoreModal();

        setFetching(true);

        const data = window.localStorage.getItem('GUEST_DATA');
        if((data !== null) && ((JSON.parse(data)).length))
            //setItemData(JSON.parse(data));
            window.localStorage.removeItem('GUEST_DATA')
            console.log('deleted')
        }

        setFetching(false);
        //make api call every time state is changed
    }

    //will check if there is data in local storage
    useEffect(() => {
        const data = window.localStorage.getItem('GUEST_DATA');
        if((data !== null) && ((JSON.parse(data)).length)){
            changeStoreModal();
        }
    },[])

    //useEffect to persist to db every time array state changes

    //handling the date for the diary

    const [ month, setMonth ] = useState();

    const changeMonth = (e:any) => {
        setMonth(e.target.value);
    }

    //handling for day
    const [ day, setDay ] = useState();

    const changeDay = (e:any) => {
        setDay(e.target.value);
    }

    //handling for year
    const [ year, setYear ] = useState();

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
        const data = window.localStorage.getItem('GUEST_DATA_NUTR');
        if((data !== null) && ((JSON.parse(data)).kcal)>0){
            const parseData = JSON.parse(data);
            setCarbs(parseData.c);
            setProtein(parseData.p);
            setFat(parseData.f);
            setCalories(parseData.kcal);
        }
    },[])

    //useEffect to update value for localStorage whenever value is changed
    useEffect(() => {
        window.localStorage.setItem('GUEST_DATA_NUTR', JSON.stringify({c:carbs, p:protein, f:fat, kcal:calories}))
    },[carbs, protein, fat, calories])

    return(
        <main className='page-content'>
            <AddModal addModalHandler={changeAddModal} addModalIsOpen={addModalOpen} closeModal={changeAddModal} changeHandler={handleInputChange} value={addInput} addHandler={addData} fethcing={fetching} empty={isEmpty}/>
            <TableModal tableModalHandler={changeTableModal} tableModalIsOpen={tableModalOpen} itemData={propItem} closeModal={changeTableModal}/>
            <HelpModal helpModalHandler={changeModal} helpModalIsOpen={modalOpen} closeModal={changeModal} message={'Please add food to track nutrients. Click info for more details on macro and micro nutrients and delete to delete an entry. Click save to save your data.'}/>
            <DateModal dateModalHandler={changeDate} dateModalIsOpen={dateOpen} closeModal={changeDate} changeMonth={changeMonth} changeDay={changeDay} changeYear={changeYear}/>
            <StorageModal modalHandler={changeStoreModal} modalIsOpen={storeOpen} closeModal={changeStoreModal} populate={populateData}/>
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
                        <button>save</button>
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

export default UserDiary;

//instead of guest, have user, then ask if they want guset
//will have to save to persist