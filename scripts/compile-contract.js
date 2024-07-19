const { run } = require("hardhat");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");


async function main() {
  console.log("Compiling contracts...");
  await run("compile");

  const artifactPath = path.resolve(__dirname, "../template/artifacts/template/contracts/MiningNFT.sol/MiningNFT.json");
  const tsOutputDir = path.resolve(__dirname, '../template/dapp/src/abi');
  const tsOutputPath = path.resolve(tsOutputDir, 'contractABI.ts');

  if (!fs.existsSync(artifactPath)) {
    console.error("Artifact not found at:", artifactPath);
    process.exit(1);
  }

   // Check if the output directory exists, if not, create it
  if (!fs.existsSync(tsOutputDir)) {
    fs.mkdirSync(tsOutputDir, { recursive: true });
    console.log(`Created directory: ${tsOutputDir}`);
  }

  const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
  const tsContent = `export const ContractABI = ${JSON.stringify(artifact.abi, null, 2)} as const;\n`;
  
  fs.writeFileSync(tsOutputPath, tsContent);
  console.log('ABI successfully compiled to TypeScript variable.');
  
  if (!fs.existsSync(tsOutputPath)) {
    fs.mkdirSync(tsOutputPath, { recursive: true });
    console.log(`Created directory: ${tsOutputPath}`);
  }

  // Delete the artifacts directory
  const artifactsDir = path.resolve(__dirname, "../template/artifacts");
  fs.rmdirSync(artifactsDir, { recursive: true });
  console.log(`Artifacts directory deleted: ${artifactsDir}`);
}

main().catch((error) => {
  console.error("Error compiling contract:", error);
  process.exit(1);
});