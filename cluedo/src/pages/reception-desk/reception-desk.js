import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as io from 'socket.io-client';
import axios from 'axios';
import { EnterGameButton } from '../../components/shared-components/enter-game-button/enter-game-button';

export const ReceptionDesk = ({}) => {
    const [username, setUsername] = useState({});
    const [enterUsername, setEnterUsername] = useState("");
    const [wallet, setWallet] = useState({});
    const [gameID, setGameID] = useState("");
    const [enterGameID, setEnterGameID] = useState("");
    const [numPlayers, setNumPlayers] = useState("");
    const api = "http://localhost:8765";

    const socket = io("ws://localhost:3000");
    const [registrationMessage,setRegistrationMessage] = useState("");
    const [enterGameMessage,setEnterGameMessage] = useState("");
    const [createGameMessage,setCreateGameMessage] = useState("");
    // send a message to the server
    socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

    // socket.emit("register user", function() {
    //     axios.post('http://localhost:3000/register', {username, wallet_address: wallet})
    //       .then(function (response) {
    //         console.log(response);
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
       
    // });

    // receive a message from the server
    socket.on("hello from server", (...args) => {
    // ...
    console.log('hello from server');
    });
    
    const registerUser =  async () => {
          try {
            const res = await axios.post(`${api}/register`, {username: username, wallet_address: wallet});
            if (res.statusText == 'OK') {
                setRegistrationMessage("Successfully registered!");
            }
            
        } catch(error) {
            console.log(error);
            setRegistrationMessage(error);
        }
    }
    const enterGame =  async () => {
        if(enterGameID != "" && enterUsername !=""){
        try {
          const res = await axios.post(`${api}/game/entergame/:${enterGameID}`, {username: username, game_id: enterGameID});
          setEnterGameMessage(res.statusText);
            
      } catch(error) {
          console.log(error);
          setEnterGameMessage(error);
      }}
      else {
        setEnterGameMessage("No game ID or username. Please enter game ID AND username.")
      }
  }
    const createGame =  async () => {
        if(numPlayers !== ""){
            try {
            const res = await axios.post(`${api}/create-game`, {num_of_players: numPlayers });
            console.log(res.data.data);
            setCreateGameMessage("Created Game with ID: " + res.data.data.gameid);
        } catch(error) {
            console.log(error);
            setEnterGameMessage(error);
        }
    }else {
        setCreateGameMessage("Please enter number of players.")
    }
    }
    return(
        <div className='reception-desk'>
             <div className='dark-overlay'>
                <div>
                   
                   <input placeholder='Insert number of players' onChange={(e) => setNumPlayers(e.target.value)}/>
                     {/* <Link to={`/game/entergame/:${gameID}`}>  */}
            
                    <button className='enter-game-button' onClick ={() =>createGame()}>
                        <span className='white uppercase'>Create game</span>
                    </button>
            
                    {/* </Link> */}
                    <span>{createGameMessage && createGameMessage}</span>
                </div>
                <div className='user-registration'>
                    <input placeholder='Insert your username' onChange={(e) => setUsername(e.target.value.trim())}/>
                    <input placeholder='Insert your wallet' onChange={(e) => setWallet(e.target.value.trim())}/>
                    {/* <Link to={'/game'}>  */}
                
                        <button className='enter-game-button' onClick ={() =>registerUser()}>
                            <span className='uppercase'>Register user</span>
                        </button>
                    {/* </Link> */}
                </div>
                <div>
                    {registrationMessage ? <span className='white'>{registrationMessage}</span> : ("")}
                    {/* // <span>Already registered?</span> */}
                </div>
                <div>
                   
                   <input placeholder='Insert game ID' onChange={(e) => setEnterGameID(e.target.value.trim())}/>
                   <input placeholder='Insert your username' onChange={(e) => setEnterUsername(e.target.value.trim())}/>
                     <Link to={`/game/entergame/:${enterGameID}`}> 
                        <EnterGameButton onClick={() => enterGame()} text='Proceed to game'/>
                        {/* <button className='enter-game-button' onClick ={() =>enterGame()}>
                            <span className='white uppercase'>Proceed to game</span>
                        </button> */}
                    </Link>
                </div>
            </div>
        </div>
    )
}