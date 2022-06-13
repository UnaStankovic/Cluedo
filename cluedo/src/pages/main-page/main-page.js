import React from 'react';
import backgroundImage from '../../assets/img/cover.jpeg';
import { Link } from 'react-router-dom';

export const MainPage = () => {

    return(
        <div className='main-page' style={{backgroundImage: `url(${backgroundImage})`}}>
           <Link to={'/game'}> 
           <button className='enter-game-button'>
                <span className='uppercase'>Start game</span>
            </button>
            </Link>
        </div>
    )
}