import { Account, Address, createPublicClient, custom, defineChain, http, serializeTransaction, createWalletClient, Chain } from 'viem';
import dotenv from 'dotenv';


dotenv.config();

export const mainnet : Chain = defineChain({
  id: 88,
  name: 'Viction Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Viction',
    symbol: 'VIC',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.viction.xyz'],
      webSocket: ['wss://ws.viction.xyz'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://vicscan.xyz' },
  },
  testnet: false,
});

export const testnet: Chain = defineChain({
  id: 89,
  name: 'Viction Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Viction',
    symbol: 'VIC',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-testnet.viction.xyz'],
      webSocket: ['wss://ws-testnet.viction.xyz'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://testnet.vicscan.xyz' },
  },
  testnet: true,
});

export const networks: any = {
  TESTNET: testnet,
  MAINNET: mainnet,
};

export const ethClient = async (activeNetwork: 'MAINNET' | 'TESTNET') =>
  createWalletClient({
    chain: networks[activeNetwork],
    transport: http(),
  });