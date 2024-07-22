import { NextApiRequest, NextApiResponse } from 'next';
import { WalletClient, createPublicClient, http, parseAbi, parseEther } from 'viem';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const deployContract = async (contractABI: any) => {

  const artifactPath = path.resolve('.//MiningNFT.json');
  const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf-8'));
  const abi = parseAbi(abi);
  const bytecode = artifact.bytecode;

  const wallet = new WalletClient({ client: ethClient, privateKey });

  const txHash = await wallet.deployContract({
    abi,
    bytecode,
    args: [parseEther('0.01')],
    gas: 2000000,
  });

  const receipt = await ethClient.getTransactionReceipt(txHash);
  return receipt.contractAddress;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const contractAddress = await deployContract();
    fs.writeFileSync('./template/abi/abi.json', JSON.stringify(contractAddress));
    fs.rmdirSync('./template/artifacts', { recursive: true });
    res.status(200).json({ contractAddress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}