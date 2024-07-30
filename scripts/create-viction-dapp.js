#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

if (process.argv.length < 3) {
  console.log("You have to provide a name to your app.");
  console.log("For example :");
  console.log("    npx create-viction-dapp dapp-name");
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const gitRepo = "https://github.com/viction-developers/create-viction-dapp";

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === "EXIST") {
    console.log(
      `The file ${projectName} already exist in the current directory, please give it another name.`
    );
  } else {
    console.log(err);
  }
  process.exit(1);
}

async function main() {
  try {
    console.log('Downloading files...');
    execSync(`git clone --depth 1 ${gitRepo} ${projectPath}`, {
      stdio: 'inherit'
    });

    process.chdir(projectPath);

    console.log('Installing dependencies...');
    execSync('npm install', {
      stdio: 'inherit'
    });

    console.log('Removing useless files');
    execSync('rm -rf ./.git', {
      stdio: 'inherit'
    });
    execSync('rm -rf ./script', {
      stdio: 'inherit'
    });
    console.log('The installation is done, this is ready to use !');

  } catch (error) {
    console.log(error);
  }
}
main();

