import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-typechain";
import "solidity-coverage";
import "dotenv/config";
import "hardhat-deploy";

export default {
  namedAccounts: {
    deployer: 0,
    governance: 0,
    rewards: 0,
    sentinel: 1,
    newGovernance: 0,
    user: 0,
    dai: {
      1: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82', //mainnet bsc CAKE address
      1337: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82', //mainnet bsc CAKE address
      3: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82' //weird DAI clone? wtf is this? [changed to CAKE address]
    },
    yearnVault: {
      1: '0xa80240Eb5d7E05d3F250cF000eEc0891d00b51CC', // mainnet PCS autocakepool address
      1337: '0xa80240Eb5d7E05d3F250cF000eEc0891d00b51CC', // mainnet PCS autocakepool address
      3: '0xdbfb15bc9beaaacda989ce3a6864af262166ac06' //what is this??
    },
    linkOracleAddress: {
      1: '0xB6064eD41d4f67e353768aA239cA86f4F73665a1', // cake/usd chainlink price feed address
      1337: '0xB6064eD41d4f67e353768aA239cA86f4F73665a1'
    }
  },
  networks: {
    coverage: {
      url: "http://localhost:8545",
      gas: 20000000,
    },
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: false,
      blockGasLimit: 25000000
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: {mnemonic: process.env.MNEMONIC}
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: {mnemonic: process.env.MNEMONIC}
  },
},
  solidity: {
    version: "0.6.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
      },
    },
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5"
  },

};