import React, { Component } from 'react'
import './loadingScreen.css'

class LoadingScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
          slowConnectionTimeout: ''
        }
    }

    slowConnection = () => {
        document.querySelector('.loadingScreen__info').innerText = 'Your connection is slow, please wait a moment'
    }
    
    componentDidMount() {
        this.setState({ slowConnectionTimeout: setTimeout( this.slowConnection, 16000)})
    }
    
    componentWillUnmount() {
        this.setState({ slowConnectionTimeout: clearTimeout(this.state.slowConnectionTimeout)})
    }
    
    render() {
        return (
            <section className="loadingScreen">
                <div className='loadingScreen__title'>Loading</div>
                <div className='loadingScreen__info'></div>
                
                <span className="loadingScreen__animation">
                    <div className='element1'></div>
                    <div className='element2'></div>
                    <div className='element3'></div>
                    <div className='element4'></div>
                    <div className='element5'></div>
                </span>
                <div className='background background__first'></div>
                <div className='background background__second'></div>
            </section>
        )
    }
}

export default LoadingScreen
