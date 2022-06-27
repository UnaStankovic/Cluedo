import React from 'react';

export const EnterGameButton = ({text, onClick}) => {
    
    return (
        <button className='enter-game-button' onClick={() => onClick()}>
            <span className='uppercase'>{text}</span>
        </button>
    )
}