const {ethers} = require('hardhat');

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const weiAmount = (await deployer.getBalance()).toString();
    
    console.log("Account balance:", (await ethers.utils.formatEther(weiAmount)));
  
    const Token = await ethers.getContractFactory("StereoHearts");
    const token = await Token.deploy();
  
    console.log("Token address:", token.address);
  }

  /**
   * Name: StereoHearts
    Symbol: SH
    Owner: 0xB28Ad0754B7aabEbe09BB7af82036BA8F0E30462
    Contract Address: 0xdF299248f00cECB85A948D3d57541f00bdA793A6
    Goerli etherscan: https://goerli.etherscan.io/address/0xdF299248f00cECB85A948D3d57541f00bdA793A6
   */
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
  });