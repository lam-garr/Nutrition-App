import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'

function Home(){
    return(
        <main className='main'>
            <header className='header'>
                <div className='container'>
                    <div>
                        <h1>Nutrition Stuff</h1>
                        <p>nutrition info stuff etc, etc.</p>
                        {/*Edit Link to with actual path!!!!!*/}
                        <Link to={"/sign-up"}><button type='button'>Start Now!, or not</button></Link>
                    </div>
                    {/*Add src for photo and edit alt desc*/}
                    <img src='' alt='sample pic'/>
                </div>
            </header>
            <section className='section-one'>
                <div className='container'>
                    {/*Add src for photo and edit alt desc*/}
                    <img src='' alt='sample pic'/>
                    <div>
                        <h1>More Nutrition Stuff..</h1>
                        <p>etc, etc, etc..</p>
                    </div>
                </div>
            </section>
            <section className='section-two'>
                <div className='container'>
                    <div className='box'>
                        <h2>Info...</h2>
                        <p>stuf, stuff, stuff...</p>
                    </div>
                    <div className='box'>
                        <h2>Info...</h2>
                        <p>stuf, stuff, stuff...</p>
                    </div>
                    <div className='box'>
                        <h2>Info...</h2>
                        <p>stuf, stuff, stuff...</p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home;