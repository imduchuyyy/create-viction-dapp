import { createAbstractionProvider } from '@abstraction-hq/wallet-sdk';
import { WalletClient, createPublicClient, http, parseAbi, parseEther, createWalletClient, custom } from 'viem';
import fs from 'fs';
import path from 'path';
import { mainnet } from './config';

const ethClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export const deployContract = async (account: string) => {
  const provides = await createAbstractionProvider();
//   const signer = provides.getSigners();
    console.log('provides',provides);

    const walletClient = createWalletClient({ 
        chain: mainnet,
        transport: custom(provides)
    })
    // const [accounts] = walletClient
    console.log('accounts',walletClient)

  const artifactPath = path.resolve('./template/artifacts/contracts/MiningNFT.sol/MiningNFT.json');
//   const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf-8'));
//   const abi = parseAbi(artifact.abi);
//   const bytecode = artifact.bytecode;

//   const wallet = new WalletClient({ client: ethClient, privateKey: signer._signingKey().privateKey });

//   const txHash = await wallet.deployContract({
//     abi,
//     bytecode,
//     args: [parseEther('0.01')],
//     gas: 2000000,
//   });

//   const receipt = await ethClient.getTransactionReceipt(txHash);
//   return receipt.contractAddress;
};