/**
 * @type import('hardhat/config').HardhatUserConfig
 */
/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const { ALCHEMY_API_KEY, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

module.exports = {
   solidity: "0.8.0",
   defaultNetwork: "goerli",
   networks: {
      hardhat: {},
      goerli: {
         url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
         accounts: [`0x${PRIVATE_KEY}`]
      },
   },
   etherscan: {
      apiKey: {
         goerli: ETHERSCAN_API_KEY
      }
   }
}