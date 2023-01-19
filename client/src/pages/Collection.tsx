import React from 'react';
import { useState, useEffect } from 'react';
import HelpModal from '../components/HelpModal';
import CollectionTable from '../components/CollectionTable';
import '../styles/Collection.css';

interface collectionProp{
    overlayChange: () => void,
    overlayOpen: boolean;
}

function Collection(prop:collectionProp){

    //useEffect to see wheter or not user is logged in (WIP)

    //open close help modal
    const [helpModalOpen, setHelpModalOpen] = useState(false);

    const changeHelpModal = () => {
        setHelpModalOpen(!helpModalOpen);
        prop.overlayChange();
    }

    //sample data 
    const [ data, setData] = useState<String[]>([]);



    return(
        <main className='collection-page-content'>
            <HelpModal helpModalHandler={changeHelpModal} helpModalIsOpen={helpModalOpen} closeModal={changeHelpModal} message={'Collection of diary entries, click view to view diary or delete to delete entry.'}/>
            <section className='collection-section-one'>
                <div className='sec-one-content'>
                    Collection of User Diaries
                </div>
                <button className='sec-one-btn' onClick={() => {changeHelpModal()}}>?</button>
            </section>
            <section className='collection-section-two'>
                {data.length ? (<div>
                    <div className='sec-two-p1'>
                    <div className='menu-title'>showing ? of ???</div>
                        <div className='menu'>
                            <span>sort by:</span>
                            <select>
                                <option>select</option>
                                <option>option one</option>
                                <option>option two</option>
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

