require("@nomiclabs/hardhat-waffle");

// Replace this private key with your Harmony account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const HARMONY_PRIVATE_KEY = "53c09d3c7887445b8a19d976335f4fc676c6a2a2d1919caa618e2865faada07b";

module.exports = {
  solidity: "0.8.13",
  paths: {
    sources: "./circuit-contracts/contracts",
    tests: "./test/hardhat",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  },
  networks: {
    devnet: {
      url: `https://api.s0.ps.hmny.io/`,
      accounts: [`0x${HARMONY_PRIVATE_KEY}`]
      // chainId: '1666900000'
    },
    mainnet: {
      url: `https://api.harmony.one`,
      accounts: [`0x${HARMONY_PRIVATE_KEY}`]
    }
  }
};
