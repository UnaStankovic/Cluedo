import React, { useState } from 'react';
import { PlayerToken } from '../../components/shared-components/player-token/player-token';
import axios from 'axios';
import Guess from "../../circuit-contracts/contracts/verify-guess.sol";
import { Contract, providers, utils } from "ethers"
import { ResortoModal } from '../../components/shared-components/resorto-modal/resorto-modal';
import { EnterGameButton } from '../../components/shared-components/enter-game-button/enter-game-button';

export const GameTable = (id) => {
    const [selectedRoom, setSelectedRoom] = useState("");
    const api = "http://localhost:8765";
    const movePlayer = (room) => {
       
    //    axios.post(`${api}/game/:${id}`)
        setSelectedRoom(room);
        setShowMovePicker(true);
    }
    const [player, setPlayer] = useState();
    const [showMakeGuess, setShowMakeGuess] = useState(false);
    const [showMovePicker, setShowMovePicker] = useState(false);
    const [showGuessResult, setShowGuessResult] = useState(false);
    const [movePlayerTemp, setMovePlayerTemp] = useState(false);
    return(
        <div className='game-table'>
            <div className='guess-move' onClick={()=>setShowMakeGuess(true)}>
                <span>Guess?</span>
            </div>
            {showMovePicker && 
            <ResortoModal className='move-picker-modal' title={`Moving to the other room`} onClose={() => setShowMovePicker(false)}>
                    <div className='move-picker-wrap clickable'>
                        <p>{`Do you want to move to the ${selectedRoom}`}</p>
                        <div>
                            <EnterGameButton text={`Yes go to ${selectedRoom}`} onClick={()=>{setMovePlayerTemp(true)}}/>
                            <EnterGameButton text={"No"} onClick={()=>{setShowMovePicker(false)}}/>
                        </div>
                    </div>
                </ResortoModal>}
            {showMakeGuess && <ResortoModal title='Make your guess' onClose={() => setShowMakeGuess(false)}>
            <div className='option-title'>
                    <span>Murderer</span>
                    <select>    
                        <option value="1">Mrs. Leather</option>
                        <option value="2">Mr. Brick</option>
                        <option value="3">Mrs. Azul</option>
                        <option value="4">Miss Rouge</option>
                        <option value="5">Mr. Pepper</option>
                        <option value="6">Mrs. Sand</option>
                       
                    </select>
                </div>
                <div className='option-title'>
                    <span>Room</span>
                    <select selected={selectedRoom}>    
                        <option value="elevator">elevator</option>
                        <option value="bedroom">bedroom</option>
                        <option value="pool">pool</option>
                        <option value="lounge">lounge</option>
                        <option value="dining room">dinning room</option>
                        <option value="ballroom">ballroom</option>
                        <option value="beach">beach</option>
                        <option value="shop">shop</option>
                        <option value="kitchen">kitchen</option>
                    </select>
                </div>
                <div className='option-title'>
                    <span>Weapon</span>
                    <select>    
                        <option value="1">knife</option>
                        <option value="2">rope</option>
                        <option value="3">cocktail glass</option>
                        <option value="4">pillow</option>
                        <option value="5">poison</option>
                        <option value="6">gun</option>
                       
                    </select>
                </div>
                {showGuessResult &&<div className='correct-guess'>
                    <span style={{color: 'green'}}>Mrs. Azul</span>
                </div>}
                <div className='wrong-guesses'>
                    <div className='wrong-guess'>
                        <span>Not the murderer:</span>
                        <span>Mrs. Sand</span>
                        <span>Mrs. Rouge</span>
                    </div>
                    <div className='wrong-guess'><span>Not the weapon:</span><span>rope</span></div>
                    <div className='wrong-guess'><span>Not the room:</span>
                        {showGuessResult && <span>pool</span>}
                    </div>

                </div>
                <EnterGameButton text='Make a guess' onClick={() => setShowGuessResult(true)}/>
            </ResortoModal>}
            <div className='game-room elevator' onClick={()=>movePlayer("elevator")}>
                <p className='uppercase'>Elevator</p>
                <PlayerToken player='miss-scarlet'/>
            </div>
            <div className='game-room bedroom' onClick={()=>movePlayer("bedroom")}>
                <p className='uppercase'>Bedroom</p>
                <PlayerToken player='mister-green'/>
            </div>
            <div className='game-room pool' onClick={()=>movePlayer("pool")}>
                <p className='uppercase'>Pool</p>
                {movePlayerTemp && <PlayerToken player='professor-plum' active={true}/>}
            </div>
            <div className='game-room lounge' onClick={()=>movePlayer("lounge")}>
                <p className='uppercase'>Lounge</p>
            </div>
            <div className='game-room dinning-room' onClick={()=>movePlayer("dining room")}>
                <p className='uppercase'>Dinning room</p>
                <PlayerToken player='colonel-mustard'/>
            </div>
            <div className='game-room ballroom' onClick={()=>movePlayer("ballroom")}>
                <p className='uppercase'>Ballroom </p>
                
            </div>
            <div className='game-room beach' onClick={()=>movePlayer("beach")}>
                <p className='uppercase'>Beach</p>
                <PlayerToken player='mrs-white'/>
            </div>
            <div className='game-room shop' onClick={()=>movePlayer("shop")}>
                <p className='uppercase'>Shop</p>
                {!movePlayerTemp && <PlayerToken player='professor-plum' active={true}/>}
            </div>
            <div className='game-room kitchen' onClick={()=>movePlayer("kitchen")}>
                <p className='uppercase'>Kitchen</p>
                <PlayerToken player='mrs-peacock'/>
            </div>
        </div>
    )
}