import React from 'react';
import { Link } from 'react-router-dom';

export const ReceptionDesk = ({}) => {

    return(
        <div className='reception-desk'>
             <div className='dark-overlay'>
            <input placeholder='Insert your wallet'/>
            <Link to={'/game'}> 
          
           <button className='enter-game-button'>
                <span className='uppercase'>Proceed to game</span>
            </button>
            </Link>
            </div>
        </div>
    )
}