#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const projectName = process.argv[2] || "my-dapp";
const projectDir = path.resolve(process.cwd(), projectName);
const templateDir = path.resolve(__dirname, "../template/dapp");

// Step 1: Create a new Next.js project
console.log(`Creating Next.js project in ${projectDir}...`);
execSync(`npx create-next-app@latest ${projectName} --typescript`, { stdio: "inherit" });

// Step 2: Copy the template files
console.log("Copying template files...");

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

copyRecursiveSync(templateDir, projectDir);

// Step 3: Install dependencies
console.log("Installing dependencies...");
execSync(`cd ${projectDir} && npm install`, { stdio: "inherit" });

// Step 4: Compile and move ABI
console.log("Compiling and moving ABI...");
execSync(`npx hardhat run ${path.resolve(__dirname, "compile-contract.js")}`, { stdio: "inherit" });

// Step 5: Compile ABI to TypeScript
console.log("Compiling ABI to TypeScript...");
execSync(`node ${path.resolve(__dirname, "compileAbiToTs.js")}`, { stdio: "inherit" });

console.log("DApp creation complete.");