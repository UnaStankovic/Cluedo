#!/bin/bash

cd contracts/circuits

if [ -f ./powersOfTau28_hez_final_10.ptau ]; then
    echo "powersOfTau28_hez_final_10.ptau already exists. Skipping."
else
    echo 'Downloading powersOfTau28_hez_final_10.ptau'
    curl https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_10.ptau -o powersOfTau28_hez_final_10.ptau
fi

echo "Compiling Cluedo.circom..."

circom Cluedo.circom --r1cs --wasm --sym -o .
snarkjs r1cs info Cluedo.r1cs


snarkjs groth16 setup Cluedo.r1cs powersOfTau28_hez_final_10.ptau circuit_0000.zkey
snarkjs zkey contribute circuit_0000.zkey circuit_final.zkey --name="1st Contributor Name" -v -e="random text"
snarkjs zkey export verificationkey circuit_final.zkey verification_key.json


snarkjs zkey export solidityverifier circuit_final.zkey ../verifier.sol

cd ../..