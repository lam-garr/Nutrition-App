import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
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
    const location = useLocation();

    const [ itemData, setItemData ] = useState<objInterface[]>([]);

    //delete item by id 
    const deleteId = async (id:number) => {

        setFetching(true);

        const token = window.localStorage.getItem('AccessToken');
        let dataToken;
        if(token){
            dataToken = JSON.parse(token);
        }

        const response = await fetch(`http://localhost:5000`,{
            method: 'POST',
            headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${dataToken}`},
            body: JSON.stringify({delId:id, diaryId:param.id, sort:sortBy})
        });
        const apiObj = await response.json();

        if(apiObj){
            setItemData(apiObj.myArr)
        }

    }

    //add item
    const addData = async (ingr: string) => {

        if(ingr === ''){
            setIsEmpty(true);
            return;
        }

        const token = window.localStorage.getItem('AccessToken');
        let dataToken;
        if(token){
            dataToken = JSON.parse(token);
        }

        setFetching(true);
        const response = await fetch(`http://localhost:5000/api/update`,{
            method: 'POST',
            headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${dataToken}`},
            body: JSON.stringify({item:ingr, id:param.id, sort:sortBy})
        });

        const apiObj = await response.json();

        //check if returned api object is valid
        if(apiObj && apiObj.err){
            console.log(apiObj.err)
            setIsEmpty(true);
            setFetching(false);
            return;
        }

        if(apiObj){
            setItemData(apiObj.myArr);
        }

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
    const populateData = async () => {
        console.log('inside storage')
        //close modal then populate & persist data to db from local storage
        changeStoreModal();

        setFetching(true);

        //send data from localStorage to backend then set with returned array
        const data = window.localStorage.getItem('GUEST_DATA');

        const token = window.localStorage.getItem('AccessToken');

        let dataToken;

        if(token){
            dataToken = JSON.parse(token);
        }

        const response = await fetch('http://localhost:5000/api/set-storage', {
            method: 'POST',
            headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${dataToken}`},
            body: JSON.stringify({storageData:data})
        });

        const resObj = await response.json();

        if(resObj && resObj.myArr.length){
            setItemData(resObj.myArr);
        }

        window.localStorage.removeItem('GUEST_DATA');

        setFetching(false);
    }

    //will check if there is data in local storage
    useEffect(() => {
        console.log(location.state.option)
        const data = window.localStorage.getItem('GUEST_DATA');
        if((location.state.option === 'new') && (data !== null) && ((JSON.parse(data)).length)){
            changeStoreModal();
        }
    },[])

    //populates data with data from db
    useEffect(() => {
        const fetchData = async () => {
            const token = window.localStorage.getItem('AccessToken');

            let dataToken;

            if(token){
                dataToken = JSON.parse(token);
            }

            const response = await fetch('http://localhost:5000/api/user-diary', {
                method: 'POST',
                headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${dataToken}`},
                body: JSON.stringify({diaryId:param.id})
            });

            const resObj = await response.json();

            if(resObj){
                setItemData(resObj.myArr);
                //extract dd/mm/yy and then set
                const splitDate = (resObj.date).split('/');
                setDay(splitDate[0]);
                setMonth(splitDate[1]);
                setYear(splitDate[2]);
            }
        }

        fetchData();
    }, [])

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

    //save date to db
    const saveDate = async () => {
        changeDate();
        console.log('indise change')
        const token = window.localStorage.getItem('AccessToken');
        let dataToken;
        if(token){
            dataToken = JSON.parse(token);
        }

        setFetching(true);
        const response = await fetch(`http://localhost:5000/api/update-date`,{
            method: 'POST',
            headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${dataToken}`},
            body: JSON.stringify({newDay:day, newMonth: month, diaryId: param.id})
        });
        console.log('after call')
        const apiObj = await response.json();

        if(!apiObj.ok){
            console.log('error with setting date')
        }
        console.log('ok call')
    }

    //handling specific macronutrient value along with total calories

    //handling for carbs
    const [ carbs, setCarbs ] = useState(0);

    const changeCarbs = (value: number) => {
        setCarbs(value);
    }

    //handling for protein
    const [ protein, setProtein ] = useState(0);

    const changeProtein = (value: number) => {
        setProtein(value);
    }

    //handling for fat
    const [ fat, setFat ] = useState(0);

    const changeFat = (value: number) => {
        setFat(value);
    }

    //handling for total calories
    const [ calories, setCalories ] = useState(0);

    const changeCalories = (value: number) => {
        setCalories(value);
    }

    const update = async () => {
        const response = await fetch(`http://localhost:5000/api/user-diary`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id:param.id})
        })

        const resObj = await response.json();

        console.log(resObj)

        setFetching(false);

        if(resObj !== null){
            //set data from db to array
            setItemData(resObj.diary);

            console.log(itemData);
        }
    }

    //update values whenever itemData array state is changed
    useEffect(() => {
        //update values based on data from db
        console.log(itemData);
        const newCarb = itemData.reduce((total, item) => total + item.CHOCDF.quantity, 0);
        const newPro = itemData.reduce((total, item) => total + item.PROCNT.quantity, 0);
        const newFat = itemData.reduce((total, item) => total + item.FAT.quantity, 0);
        const newKcal = itemData.reduce((total, item) => total + item.ENERC_KCAL.quantity, 0);
        console.log(newCarb)

        changeCarbs(Math.round(newCarb));
        changeProtein(Math.round(newPro));
        changeFat(Math.round(newFat));
        changeCalories(Math.round(newKcal));
    },[itemData])

    //useState to handle sorting selector change
    const [ sortBy, setSortBy ] = useState("select");

    const changeSortBy = async (e:any) => {

        if(e.target.value === 'select'){
            return;
        }

        setSortBy(e.target.value);
    }

    //useEffect for when sorting select element changes
    useEffect(() => {

        const fetchChange = async () => {
            const dd = window.localStorage.getItem('AccessToken');

            let storageToken;

            if(dd){
                storageToken = JSON.parse(dd);
            }

            const response = await fetch(`http://localhost:5000/api/sort-diary?sort=${sortBy}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${storageToken}`
                },
                body: JSON.stringify({diaryId: param.id, sort: sortBy})
            })
    
            const resObj = await response.json();
    
            if(resObj){
                setItemData(resObj.arrData);
            }

            setFetching(false);
        }

        setFetching(true);
        fetchChange();
    }, [sortBy])


    return(
        <main className='user-page-content'>
            <AddModal addModalHandler={changeAddModal} addModalIsOpen={addModalOpen} closeModal={changeAddModal} changeHandler={handleInputChange} value={addInput} addHandler={addData} fethcing={fetching} empty={isEmpty}/>
            <TableModal tableModalHandler={changeTableModal} tableModalIsOpen={tableModalOpen} itemData={propItem} closeModal={changeTableModal}/>
            <HelpModal helpModalHandler={changeModal} helpModalIsOpen={modalOpen} closeModal={changeModal} message={'Please add food to track nutrients. Click info for more details on macro and micro nutrients and delete to delete an entry. Click save to save your data.'}/>
            <DateModal dateModalHandler={changeDate} dateModalIsOpen={dateOpen} closeModal={changeDate} changeMonth={changeMonth} changeDay={changeDay} changeYear={changeYear} updateDate={saveDate}/>
            <StorageModal modalHandler={changeStoreModal} modalIsOpen={storeOpen} closeModal={changeStoreModal} populate={populateData}/>
            <section className='user-food-diary-section-one'>
                <div className='user-section-one-content'>
                    <div className='user-date' onClick={changeDate}>
                        <span>{month}</span>
                        <span className='user-date-day'>{day}</span>
                        <span>{year}</span>
                    </div>
                    <div className='user-sec-one-right'>
                    <div className='user-sec-one-stats'>
                            <div className='user-sec-one-carbs'>
                                <div className='user-carb-data'>{carbs}g</div>
                                <span>carbohydrates</span>
                            </div>
                            <div className='user-sec-one-protein'>
                                <div className='user-protein-data'>{protein}g</div>
                                <span>protein</span>
                            </div>
                            <div className='user-sec-one-fat'>
                                <div className='user-fat-data'>{fat}g</div>
                                <span className='user-fat-span'>fat</span>
                            </div>
                            <div className='user-sec-one-cal'>
                                <div className='user-cal-data'>{calories}</div>
                                <span>calories</span>
                            </div>
                        </div>
                        <div className='user-sec-one-buttons'>
                        {/* <button>save</button> */}
                        <button onClick={()=>{changeAddModal()}} className='user-diary-add-btn'>add food</button>
                        </div>
                        <button className='user-content-btn' onClick={changeModal}>{`\u003F`}</button>
                    </div>
                </div>
            </section>
            <section className='user-food-diary-section-two'>
                <div className='user-section-two-content'>
                   {itemData.length ? (<div>
                    <div className='user-food-diary-menu-content'>
                    <div className='user-menu-title-content'>showing {itemData.length} of {itemData.length}</div>
                        <div className='user-menu-content'>
                            <span className='user-colle-sort-content'>sort by:</span>
                            <select onChange={(e:any) => changeSortBy(e)} value={sortBy}>
                                <option>select</option>
                                <option>calorie high</option>
                                <option>calorie low</option>
                            </select>
                        </div>
                    </div>
                       <Table deleteHandler={deleteId} itemData={itemData} itemDataHandler={displayItem}/>
                        </div>) : 
                   (<div className='user-no-items'><span>There's nothing here, add food to get started!</span></div>)}
                </div>
            </section>
        </main>
    )
    
}

export default UserDiary;
