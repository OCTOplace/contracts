const { ethers, upgrades } = require("hardhat");
// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is avaialble in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  //console.log("Account balance:", (await deployer.getBalance()).toString());

  const SwapData = await ethers.getContractFactory("SwapDataUpgradeable");
  console.log("deploying SWAP Data Contract......");
  const swapData = await upgrades.deployProxy(
    SwapData,
    [
      "0xee69E72B0A1524329e6dD66D8c7e974D939e7690",
      "0xee69E72B0A1524329e6dD66D8c7e974D939e7690",
    ],
    { initializer: "init" }
  );
  await swapData.deployed();

  console.log("SwapData address:", swapData.address);
  //console.log("Contract deployed.")

}



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// const { ethers, upgrades } = require("hardhat");

// async function main() {
//   const CryptoBabyNFT = await ethers.getContractFactory("SwapData");
//   console.log("deploying SWAP Data Contract......");
//   const cryptoBaby = await upgrades.deployProxy(
//     CryptoBabyNFT,
//     [
//       "https://bronze-major-cow-418.mypinata.cloud/ipfs/QmUmDDZhno9bNVe9oxAESu8nEYKwPCC8nA9u3kiTqWS3zn/",
//       500,
//       "https://bronze-major-cow-418.mypinata.cloud/ipfs/QmW22esbG9Jb6p6D3QFm8tyCJXR79qgLCdJrYhLNWk79Ww",
//     ],
//     { initializer: "init" }
//   );
//   await cryptoBaby.deployed();

//   console.log("Crypto Baby Nft contract deployed to: ", cryptoBaby.address);
// }

// main();
