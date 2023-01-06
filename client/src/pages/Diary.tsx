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
                    <div className='sec-one-right'>
                        <div className='sec-one-stats'>
                            <div>10</div>
                            <div>20</div>
                            <div>30</div>
                            <div>2000</div>
                        </div>
                        <div className='sec-one-buttons'>
                        <button>save</button>
                        <button>add food</button>
                        </div>
                        <button className='content-btn'>?</button>
                    </div>
                </div>
            </section>
            <section className='food-diary-section-two'>
            <div className='section-two-content'>
                    <table>
                        <tr>
                            <th>ex. 1</th>
                            <th>ex. 2</th>
                            <th>ex. 3</th>
                        </tr>
                        <tr>
                            <td>example for ex. 1</td>
                            <td>example for ex. 2</td>
                            <td>example for ex. 3</td>
                        </tr>
                    </table>
                </div>
            </section>
        </main>
    )
}

export default Diary;