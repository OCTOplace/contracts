require("@nomicfoundation/hardhat-ethers");
require('@openzeppelin/hardhat-upgrades');


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "theta_mainnet",
  networks: {
    theta_privatenet: {
      url: "http://localhost:18888/rpc",
      accounts: [
         "1111111111111111111111111111111111111111111111111111111111111111",
         "2222222222222222222222222222222222222222222222222222222222222222",
         "3333333333333333333333333333333333333333333333333333333333333333",
      ],
      chainId: 366,
      gasPrice: 4000000000000
    },
    theta_testnet: {
      url: `https://eth-rpc-api-testnet.thetatoken.org/rpc`,
      accounts: ["1111111111111111111111111111111111111111111111111111111111111111"],
      chainId: 365,
      gasPrice: 4000000000000
    },
    theta_mainnet: {
      url: `http://172.190.238.225:18888/rpc`,
      accounts: [process.env.ETH_KEY],
      chainId: 361,
      gasPrice: 4000000000000
    },
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
};
