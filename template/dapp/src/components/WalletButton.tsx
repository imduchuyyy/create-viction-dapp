'use client';
import React from 'react';

type WalletButtonProps = {
  account: string | null;
  onClick: () => void;
};

const WalletButton: React.FC<WalletButtonProps> = ({ account, onClick }) => {
  const copyToClipboard = async () => {
    if (account) {
      try {
        await navigator.clipboard.writeText(account);
        alert('Address copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy address: ', err);
      }
    } else {
      onClick();
    }
  };

  return (
    <button onClick={copyToClipboard}>
      {account ? `Connected: ${account}` : 'Connect Wallet'}
    </button>
  );
};

export default WalletButton;