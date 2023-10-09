// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const adminAddress = "0x9AA68D9652699654DA9589633023DeEB8A56f2b5";  // wallet address to receive tx fee on sale
  const WTFUELAddress = "0x0000000000000000000000000000000000000000";  //zero address as we don't use this feature of contract
  const octoplace = await hre.ethers.deployContract("contracts/Octoplace.sol:OctoplaceMarket", [adminAddress, WTFUELAddress]);

  await octoplace.waitForDeployment();

  console.log(
    `Octoplace Contract  with admin address ${adminAddress}  deployed to ${octoplace.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
