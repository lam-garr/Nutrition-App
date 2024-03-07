import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import berryImg from '../utils/imgs/img1.jpg';
import saladImg from '../utils/imgs/img2.jpg';
import avacadoImg from '../utils/imgs/img3.jpg';
import '../styles/Home.css'

function Home(){
    return(
        <main className='main'>
            <header className='header'>
                <div className='container'>
                    <div className="header-container-one">
                        <h1>A healthy life starts with what you eat.</h1>
                        <p>Track meals and nutrients to raech your goals with NutriLog.</p>
                        <Link to={"/diary"}><button className="home-diary-btn" type='button'>Start For Free</button></Link>
                    </div>
                    <img src={saladImg} alt='sample pic'/>
                </div>
            </header>
            <section className='section-one'>
                <div className='container'>
                    {/*Add src for photo and edit alt desc*/}
                    <img src={berryImg} alt='sample pic'/>
                    <div>
                        <h1>Log from our large selection of food items.</h1>
                        <p>View a breakdown of calories and nutrients from your favorites items.</p>
                    </div>
                </div>
            </section>
            <section className='section-two'>
                <div className='container'>
                    <div className='box'>
                        <h2>Track and Learn</h2>
                        <p>Keep track of your progress and adapt.</p>
                    </div>
                    <div className='box'>
                        <h2>Simplified Logging</h2>
                        <p>Enter your favorite foods and brands.</p>
                    </div>
                    <div className='box'>
                        <h2>Free To Use</h2>
                        <p>Log from our large selection of items for free.</p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home;