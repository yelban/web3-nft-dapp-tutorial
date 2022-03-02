require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

const { MATIC_API_URL, MATIC_PRIVATE_KEY, RINKEBY_API_URL, RINKEBY_PRIVATE_KEY } = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    matic: {
      url: MATIC_API_URL,
      accounts: [`0x${MATIC_PRIVATE_KEY}`],
    },
    rinkeby: {
      url: RINKEBY_API_URL,
      accounts: [`0x${RINKEBY_PRIVATE_KEY}`],
    },
  },
};
