#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const projectName = process.argv[2] || "my-dapp";
const projectDir = path.resolve(process.cwd(), projectName);
const templateDir = path.resolve(__dirname, "../template/dapp");

// Step 4: Compile and move ABI
console.log("Compiling and moving ABI...");
execSync(`npx hardhat run ${path.resolve(__dirname, "compile-contract.js")}`, { stdio: "inherit" });

// Step 1: Create a new Next.js project
console.log(`Creating Next.js project in ${projectDir}...`);
copyRecursiveSync(templateDir, projectDir);

// Step 3: Install dependencies
console.log("Installing dependencies...");
execSync(`cd ${projectDir} && npm install`, { stdio: "inherit" });

// Delete the artifacts directory
const artifactsDir = path.resolve(__dirname, "../template/dapp/src/abi");
fs.rmdirSync(artifactsDir, { recursive: true });
console.log(`Artifacts directory deleted: ${artifactsDir}`);


console.log("DApp creation complete.");


function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

