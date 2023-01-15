import React from 'react';
import '../styles/Collection.css';

function Collection(){
    return(
        <main className='collection-page-content'>
            <section className='collection-section-one'>
                <div className='sec-one-content'>
                    Collection of User Diaries
                </div>
                <button className='sec-one-btn'>?</button>
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