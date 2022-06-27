pragma circom 2.0.0;

include "../../../../node_modules/circomlib/circuits/comparators.circom";
include "../../../../node_modules/circomlib/circuits/poseidon.circom";

template Cluedo() {
    signal solnHashOut;
    // Public inputs
    signal input guessMurderer; //murderer
    signal input guessRoom;  //room
    signal input guessWeapon; //weapon

    signal input pubSolnHash;

    // Private inputs
    signal input realMurderer; //murderer
    signal input realRoom; //room
    signal input realWeapon; //weapon

    signal input privSalt;
    
    
    // Output
    
    signal output matchedMurderer;
    signal output matchedRoom;
    signal output matchedWeapon;

    //constraints

    //murderer must be between 1 and 6
    component lessThanMurderer = LessThan(2);
    lessThanMurderer.in[0] <== guessMurderer;
    lessThanMurderer.in[1] <== 7;
    lessThanMurderer.out === 1;

    component greaterThanMurderer = GreaterThan(2);
    greaterThanMurderer.in[0] <== guessMurderer;
    greaterThanMurderer.in[1] <== 0;
    greaterThanMurderer.out === 1;
   
    //weapon must be between 1 and 6
    component lessThanWeapon = LessThan(2);
    lessThanWeapon.in[0] <== guessWeapon;
    lessThanWeapon.in[1] <== 7;
    lessThanWeapon.out === 1;

    component greaterThanWeapon = LessThan(2);
    greaterThanWeapon.in[0] <== guessWeapon;
    greaterThanWeapon.in[1] <== 0;
    greaterThanWeapon.out === 1;

    //room must be between 1 and 9
    component lessThanRoom= LessThan(2);
    lessThanRoom.in[0] <== guessRoom;
    lessThanRoom.in[1] <== 10;
    lessThanRoom.out === 1;

    component greaterThanRoom = LessThan(2);
    greaterThanRoom.in[0] <== guessRoom;
    greaterThanRoom.in[1] <== 0;
    greaterThanRoom.out === 1;

    var guess[3] = [guessMurderer, guessRoom, guessWeapon];
    var soln[3] =  [realMurderer, realRoom, realWeapon];
    var j = 0;
    var k = 0;
    component lessThan[8];
    component equalGuess[6];
    component equalSoln[6];
    component equalSum;
    var equalIdx = 0;


    for (j=0; j<3; j++) {
        equalGuess[j] = IsEqual();
        equalGuess[j].in[0] <== guess[j];
        equalGuess[j].in[1] <== soln[j];
        // equalGuess[j].out === 1;
        
    }
    matchedMurderer <== equalGuess[0].out;
    matchedRoom <== equalGuess[0].out;
    matchedWeapon <== equalGuess[0].out;
 

    // Verify that the hash of the private solution matches pubSolnHash
    component poseidon = Poseidon(4);
    poseidon.inputs[0] <== privSalt;
    poseidon.inputs[1] <== realMurderer;
    poseidon.inputs[2] <== realRoom;
    poseidon.inputs[3] <== realWeapon;

    solnHashOut <== poseidon.out;
    pubSolnHash === solnHashOut;

}

component main {public [guessMurderer, guessRoom, guessWeapon, pubSolnHash]} = Cluedo();