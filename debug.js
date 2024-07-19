#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");

try {
  console.log("Starting development server...");
  execSync("npm run dev", { stdio: "inherit", cwd: path.resolve(__dirname, "../my-dapp") });
} catch (error) {
  console.error("Error starting development server:", error);
}