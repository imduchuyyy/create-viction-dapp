'use client';

const fs = require('fs');
const path = require('path');

const abiPath = path.resolve(__dirname, '../abi/abi.json');
const tsOutputPath = path.resolve(__dirname, '../src/utils/contractABI.ts');

const compileAbiToTs = () => {
  try {
    const abi = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
    const tsContent = `export const ContractABI = ${JSON.stringify(abi, null, 2)} as const;\n`;
    fs.writeFileSync(tsOutputPath, tsContent);
    console.log('ABI successfully compiled to TypeScript variable.');
  } catch (error) {
    console.error('Error compiling ABI to TypeScript:', error);
  }
};

compileAbiToTs();