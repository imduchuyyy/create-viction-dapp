import { mainnet } from 'viem/chains';
import { ethClient } from '../../miningNFT/config';
import { createWalletClient, custom } from 'viem';
 
export const walletClient = ethClient("MAINNET")
 
// JSON-RPC Account
export const [account] = await walletClient.getAddresses()
// Local Account
export const account = privateKeyToAccount(...)