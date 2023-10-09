// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const _tokenInstance = "0x9AA68D9652699654DA9589633023DeEB8A56f2b5";
  const discussions = await hre.ethers.deployContract("contracts/Discussions.sol:NFTComments", [_tokenInstance]);

  await discussions.waitForDeployment();

  console.log(
    `NFTComments Contract  for token ${_tokenInstance}  deployed to ${discussions.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
