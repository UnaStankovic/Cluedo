//[assignment] write your own unit test to show that your Mastermind variation circuit is working as expected
const {buildPoseidon} = require('circomlibjs');

const chai = require("chai");
const path = require("path");

const wasm_tester = require("circom_tester").wasm;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const assert = chai.assert;

const convertUINT8ArrayToBI = (u8) => {
    var hex = [];
    u8.forEach(function (i) {
      var h = i.toString(16);
      if (h.length % 2) { h = '0' + h; }
      hex.push(h);
    });
  
    return BigInt('0x' + hex.join(''));
}

describe("Cluedo test", function () {
    this.timeout(100000000);

    it("Cluedo", async () => {
        const circuit = await wasm_tester("contracts/circuits/Cluedo.circom");
        await circuit.loadConstraints();
        const poseidon = await buildPoseidon();
        const INPUT = {
            "guessMurderer": "4",
            "guessRoom": "2",
            "guessWeapon": "5",
            "pubSolnHash": poseidon.F.toString(poseidon([149023,6,2,3])),
            "realMurderer": "6",
            "realRoom": "2",
            "realWeapon": "3",
            "privSalt": "149023"
        }

        const witness = await circuit.calculateWitness(INPUT, true);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]),Fr.e(poseidon.F.toString(poseidon([149023,6,2,3])))));
    });
});