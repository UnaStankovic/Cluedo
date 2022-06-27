import React from 'react';
import backgroundImage from '../../assets/img/cover.png';
import { Link } from 'react-router-dom';
import { EnterGameButton } from '../../components/shared-components/enter-game-button/enter-game-button';

export const MainPage = () => {

    return(
        <div className='main-page' style={{backgroundImage: `url(${backgroundImage})`}}>
           
                <p>Welcome to Resorto</p>
                <Link to={'/register'}> 
                    <EnterGameButton onClick={()=>{}} text="Proceed to reception"/>
                {/* <button className='enter-game-button'>
                    <span className='uppercase'>Proceed to reception</span>
                </button> */}
                </Link>
           
        </div>
    )
}