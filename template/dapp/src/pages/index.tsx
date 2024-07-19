"use client";

import { useState, useEffect } from "react";
import { Address } from "viem";
import WalletButton from '../components/WalletButton';
import { ethClient } from "../utils/config";
import styles from '../styles/Home.module.css';
import connectWallet from "../utils/walletConnect";
import DeployButton from "@components/DeployButton";
import { createAbstractionProvider } from "@abstraction-hq/wallet-sdk";

const CONTRACT_ADDRESS: string | Address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';

const Home = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [client, setClient] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const provider = await createAbstractionProvider();
        if (provider) { 
          const client = await ethClient("MAINNET");
          // setAccount(wallet);
          setClient(client);
        }
      
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    };
    init();
  }, []);

  const connectWalletHandler = async () => {
    try {
      const wallet = await connectWallet();
      setAccount(wallet);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const mintNFT = async () => {
    if (contract) {
      try {
        const tx = await contract.functions.mint({ value: '10000000000000000' }); // 0.01 ETH
        await tx.wait();
        alert("NFT Minted!");
      } catch (err) {
        console.error(err);
        alert("Minting failed");
      }
    } else {
      alert("Contract is not connected");
    }
  };

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <h1>Welcome to Mining NFT dApp</h1>
        <WalletButton account={account} onClick={connectWalletHandler} />
        {/* <DeployButton /> */}
        <DeployButton account={account} />
        <button onClick={mintNFT} disabled={!account}>
          Mint NFT
        </button>
      </header>
    </div>
  );
};

export default Home;