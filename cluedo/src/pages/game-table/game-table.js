import React, { useState } from 'react';
import { PlayerToken } from '../../components/shared-components/player-token/player-token';



export const GameTable = () => {
    const [selectedRoom, setSelectedRoom] = useState("");
    return(
        <div className='game-table'>
            <div className='game-room billiard-room'>
                <p className='uppercase'>Billiard room</p>
                <PlayerToken player='miss-scarlet'/>
            </div>
            <div className='game-room study'>
                <p className='uppercase'>Study</p>
                <PlayerToken player='mister-green'/>
            </div>
            <div className='game-room hall'>
                <p className='uppercase'>Hall</p>
            </div>
            <div className='game-room lounge'>
                <p className='uppercase'>Lounge</p>
            </div>
            <div className='game-room dinning-room'>
                <p className='uppercase'>Dinning room</p>
                <PlayerToken player='colonel-mustard'/>
            </div>
            <div className='game-room ballroom'>
                <p className='uppercase'>Ballroom </p>
            </div>
            <div className='game-room conservatory'>
                <p className='uppercase'>Conservatory</p>
                <PlayerToken player='mrs-white'/>
            </div>
            <div className='game-room library'>
                <p className='uppercase'>Library</p>
                <PlayerToken player='professor-plum'/>
            </div>
            <div className='game-room kitchen'>
                <p className='uppercase'>Kitchen</p>
                <PlayerToken player='mrs-peacock'/>
            </div>
        </div>
    )
}