import React from 'react'
import './loadingScreen.css'

const LoadingScreen = () => {
    return(
        <section className="loadingScreen">
            <div className='loadingScreen__title'>Loading</div>
            <span className="loadingScreen__animation">
                <div className='element1'></div>
                <div className='element2'></div>
                <div className='element3'></div>
                <div className='element4'></div>
                <div className='element5'></div>
            </span>
        </section>
    )
}

export default LoadingScreen