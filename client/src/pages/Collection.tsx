import React from 'react';
import { useState, useEffect } from 'react';
import HelpModal from '../components/HelpModal'
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

    return(
        <main className='collection-page-content'>
            <HelpModal helpModalHandler={changeHelpModal} helpModalIsOpen={helpModalOpen} closeModal={changeHelpModal}/>
            <section className='collection-section-one'>
                <div className='sec-one-content'>
                    Collection of User Diaries
                </div>
                <button className='sec-one-btn' onClick={() => {changeHelpModal()}}>?</button>
            </section>
            <section className='collection-section-two'>
                <div className='sec-two-p1'>
                    <div className='menu-title'>showing ? of ???</div>
                    <div className='menu'>
                        <select>
                         <option>select</option>
                            <option>option one</option>
                            <option>option two</option>
                        </select>
                    </div>
                </div>
                <div className='sec-two-content'>

                </div>
            </section>
        </main>
    )
}

export default Collection;