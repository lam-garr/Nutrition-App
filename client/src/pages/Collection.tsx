import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HelpModal from '../components/HelpModal';
import CollectionTable from '../components/CollectionTable';
import '../styles/Collection.css';

interface collectionProp{
    overlayChange: () => void,
    overlayOpen: boolean;
}

function Collection(prop:collectionProp){

    //open close help modal
    const [helpModalOpen, setHelpModalOpen] = useState(false);

    const changeHelpModal = () => {
        setHelpModalOpen(!helpModalOpen);
        prop.overlayChange();
    }

    //diary entries, set from database
    const [ data, setData] = useState<any[]>([]);

    //disable add btn if making api call with useState
    const [ fetching, setFetching ] = useState(false);


    //useEffect to get data from database, then set to state
    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch("/api/collections", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data}`
                }
            })

            const resObj = await response.json();

            if(resObj !== null){
                //!!!
                setData(resObj.myArr);
            }

            setFetching(false);
        }

        setFetching(true);
        fetchData();
    },[])

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
            const response = await fetch(`/api/sort-colle?sort=${sortBy}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data}`
                }
            })
    
            const resObj = await response.json();
    
            if(resObj && resObj.arrOne){
                //!!!
                setData(resObj.arrOne);
            }
    
            if(resObj && resObj.arrTwo){
                //!!
                setData(resObj.arrTwo)
            }

            setFetching(false);
        }

        setFetching(true);
        fetchChange();
    }, [sortBy])

    const navigate = useNavigate();

    //creates new entry in server and navigates to new diary page
    const addEntryHandler = async () => {

        setFetching(true);

        const postEntry = await fetch(`api/new-entry`,{
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data}`
                }
        })

        const resObj = await postEntry.json();

        if(resObj && resObj.ok){
            setFetching(false);
            console.log('ok');
        }else{
            setFetching(false);
            console.log('bubu')
            return;
        }
    }

    return(
        <main className='collection-page-content'>
            <HelpModal helpModalHandler={changeHelpModal} helpModalIsOpen={helpModalOpen} closeModal={changeHelpModal} message={'Collection of diary entries, click view to view diary or delete to delete entry.'}/>
            <section className='collection-section-one'>
                <div className='sec-one-content'>
                    Collection of User Diaries
                </div>
                <button className='sec-one-add-btn' onClick={addEntryHandler} disabled={fetching}>+</button>
                <button className='sec-one-btn' onClick={() => {changeHelpModal()}}>?</button>
            </section>
            <section className='collection-section-two'>
                {data.length ? (<div>
                    <div className='sec-two-p1'>
                    <div className='menu-title'>showing {data.length} of {data.length}</div>
                        <div className='menu'>
                            <span className='colle-sort'>sort by:</span>
                            <select onChange={(e:any) => changeSortBy(e)} value={sortBy}>
                                <option>select</option>
                                <option>calorie high</option>
                                <option>calorie low</option>
                            </select>
                        </div>
                    </div>
                    <div className='sec-two-content'>
                        <CollectionTable itemData={data}/>
                    </div>
                </div>) : 
                (<div className='no-items'><span>There's nothing here, start a diary to get started!</span></div>)}     
            </section>
        </main>
    )
}

export default Collection;

