import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Diary.css'

function Diary(){
    return(
        <main className='page-content'>
            <section className='food-diary-section-one'>
                <div className='section-one-content'>
                    <div className='date'>
                        <span>January</span>
                        <span className='date-day'>5</span>
                        <span>2023</span>
                    </div>
                    <div className='sec-one-buttons'>
                        <button>save</button>
                        <button>add food</button>
                    </div>
                </div>
            </section>
            <section className='food-diary-section-two'>
            <div className='section-two-content'>
                    p2
                </div>
            </section>
        </main>
    )
}

export default Diary;