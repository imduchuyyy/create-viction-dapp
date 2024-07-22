import React, { useState } from 'react';
import { deployContract } from '../utils/deployContract';

type DeployButtonProps = {
  account: string | null;
};

const DeployButton: React.FC<DeployButtonProps> = ({ account }) => {
  const [deploying, setDeploying] = useState(false);
  const [contractAddress, setContractAddress] = useState<string | null>(null);

  const deployContractHandler = async () => {
    if (!account) {
      alert('Please connect your wallet first.');
      return;
    }
    setDeploying(true);
    try {
      const address = await deployContract(account);
      setContractAddress(address);
      alert(`Contract deployed at address: ${address}`);
    } catch (error) {
      console.error('Deployment failed', error);
      alert('Deployment failed');
    } finally {
      setDeploying(false);
    }
  };

  return (
    <div>
      <button onClick={deployContractHandler} disabled={deploying}>
        {deploying ? 'Deploying...' : 'Deploy Contract'}
      </button>
      {contractAddress && <p>Contract Address: {contractAddress}</p>}
    </div>
  );
};

export default DeployButton;