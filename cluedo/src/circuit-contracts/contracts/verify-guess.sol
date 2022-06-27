// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;
import "./verifier.sol";

contract Guess is Verifier {
    event PlayerGuess(uint gameId, uint guessMurderer, uint guessWeapon, uint guessRoom);
    event GuessAnswer(
        uint gameId, 
        uint guessMurderer, 
        uint guessWeapon, 
        uint guessRoom, 
        uint matchedMurderer, 
        uint matchedWeapon, 
        uint matchedRoom
    );
    event GameFinished(uint gameId, address winner);
    event GameStarted(uint gameId);
    enum GameState { WAITING_PLAYER_TURN, WAITING_ANSWER}
    struct Players {
        address playerAddress;
        uint currentRoom;
    }
    struct Game { 
        uint[3] lastGuess;
        Players[6] players;
        uint numOfPlayers;
        uint turn;
        bool isFinished;
        GameState state;
        uint commitment;
    }
  
    mapping(uint => Game) games; 

    function playerGuess(uint gameId, uint guessMurderer, uint guessWeapon) public {
        require(games[gameId].commitment != 0, "Game not found");
        require(games[gameId].isFinished == false, "Game is finished");
        require(msg.sender == games[gameId].players[games[gameId].turn].playerAddress, "Not your turn");
        require(games[gameId].state == GameState.WAITING_PLAYER_TURN, "Incorrect game state");

        games[gameId].lastGuess[0] = guessMurderer;
        games[gameId].lastGuess[1] = games[gameId].players[games[gameId].turn].currentRoom;
        games[gameId].lastGuess[2] = guessWeapon;
       
        games[gameId].state = GameState.WAITING_ANSWER;

        emit PlayerGuess(gameId, guessMurderer, guessWeapon, games[gameId].players[games[gameId].turn].currentRoom);
    }

    function startGame(uint gameId, uint commitment, address[6] calldata players, uint numOfPlayers) public {
        require(games[gameId].commitment == 0, "Game already exists");
        games[gameId].commitment = commitment;
        games[gameId].numOfPlayers = numOfPlayers;
        games[gameId].state = GameState.WAITING_PLAYER_TURN;
        for (uint i = 0; i < numOfPlayers; i++) {
            games[gameId].players[i].playerAddress = players[i];
            games[gameId].players[i].currentRoom = i;
        }
        emit GameStarted(gameId);
    }

    function changeRoom(uint gameId, uint room) public {
        require(games[gameId].commitment != 0, "Game not found");
        require(games[gameId].isFinished == false, "Game is finished");
        require(msg.sender == games[gameId].players[games[gameId].turn].playerAddress, "Not your turn");
        require(games[gameId].state == GameState.WAITING_PLAYER_TURN, "Incorrect game state");
        require(room >= 1 && room <= 6, "Incorrect room number");
        games[gameId].players[games[gameId].turn].currentRoom = room;
        uint nextTurn = (games[gameId].turn + 1 )% games[gameId].numOfPlayers;  
        games[gameId].turn = nextTurn;
    }
    
    function answerGuess(
        uint gameId, 
        uint matchedMurderer, 
        uint matchedWeapon, 
        uint matchedRoom, 
        uint[2] memory a, 
        uint[2][2] memory b, 
        uint[2] memory c) public {
        require(games[gameId].commitment != 0, "Game not found");
        require(games[gameId].isFinished == false, "Game is finished");
        require(games[gameId].state == GameState.WAITING_ANSWER, "Incorrect game state");
        require(verifyProof(
            a, 
            b, 
            c, 
            [
                matchedMurderer,
                matchedWeapon, 
                matchedRoom, 
                games[gameId].lastGuess[0], 
                games[gameId].lastGuess[1], 
                games[gameId].lastGuess[2],
                games[gameId].commitment
            ]) == true, 
            "Proof not valid!");
        if(matchedMurderer == 1 &&
            matchedWeapon == 1 &&  
            matchedRoom == 1) {
                games[gameId].isFinished = true;
                emit GameFinished(gameId, games[gameId].players[games[gameId].turn].playerAddress);
            }
        else {
            uint nextTurn = (games[gameId].turn + 1 )% games[gameId].numOfPlayers; 
            games[gameId].turn = nextTurn;
            emit GuessAnswer(
                gameId, 
                games[gameId].lastGuess[0], 
                games[gameId].lastGuess[1], 
                games[gameId].lastGuess[2], 
                matchedMurderer, 
                matchedWeapon, 
                matchedRoom
            );
        }
       

    }
}