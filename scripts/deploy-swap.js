// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const adminAddress = "0xee69E72B0A1524329e6dD66D8c7e974D939e7690";  // admin wallet address
  const zeroAddress = "0xee69E72B0A1524329e6dD66D8c7e974D939e7690";  //zero address 
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );
  // deploy data contract
  const SwapData = await hre.ethers.getContractFactory("contracts/SwapData.sol:SwapData");
  const swapData = await SwapData.deploy(adminAddress,zeroAddress);
  await swapData.waitForDeployment();
  console.log(
    `Octoplace Swap Data Contract  with admin address ${adminAddress}  deployed to ${swapData.target}`
  );
  //deploy NFT swap contract
  const swapNFT = await hre.ethers.deployContract("contracts/SwapNFT.sol:SwapNFT", [adminAddress, swapData.target]);
  await swapNFT.waitForDeployment();
  console.log(
    `Octoplace Swap NFT Contract  with admin address ${adminAddress} and data contract address ${swapData.target}  deployed to ${swapNFT.target}`
  );
  // set NFT Swap as writer on Data Contract - this step will fail when deplying on local host node
  await swapData.grantWriterRole(swapNFT.target);
  console.log(
    `Writer role granted to swap contract ${swapNFT.target} on Swap Data contract ${swapData.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
