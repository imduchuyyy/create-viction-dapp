import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import dotenv from 'dotenv';

dotenv.config();

const privateKey = process.env.PRIVATE_KEY || '0x0000000000000000000000000000000000000000000000000000000000000000';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 20,
      },
      metadata: {
        // do not include the metadata hash, since this is machine dependent
        // and we want all generated code to be deterministic
        // https://docs.soliditylang.org/en/v0.7.6/metadata.html
        bytecodeHash: 'none',
      },
    },
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
      blockGasLimit: 40_000_000
    },
    viction: {
      url: `https://rpc.viction.xyz`,
      accounts: [privateKey]
    },
    victionTestnet: {
      url: `https://rpc-testnet.viction.xyz`,
      accounts: [privateKey],
    }
  },
  paths: {
    artifacts: './artifacts',
    sources: './contracts',
    tests: './tests',
  },
  mocha: {
    timeout: 6000000
  }
};

export default config;