const HDWalletProvider = require('@truffle/hdwallet-provider')
const {readFileSync} = require('fs');
const { POSClient, use } = require('@maticnetwork/maticjs')
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3')

const secrets = JSON.parse(readFileSync('./secrets.json'));
use(Web3ClientPlugin)

const privateKey = secrets.seed
const userAddress = secrets.address
const rootToken = "0xdF299248f00cECB85A948D3d57541f00bdA793A6";
const amount = "1000000000000000";

const getPOSClient = (network = 'testnet', version = 'mumbai') => {
  const posClient = new POSClient()
  return posClient.init({
    log: true,
    network: network,
    version: version,
    child: {
      provider: new HDWalletProvider(privateKey, secrets.mumbai),
      defaultConfig: {
        from: userAddress,
      },
    },
    parent: {
      provider: new HDWalletProvider(privateKey, 'http://127.0.0.1:8545'),
      defaultConfig: {
        from: userAddress,
      },
    },
  })
}


async function aprroval() {
    console.log("Approving...")
    var client = await getPOSClient();
    const erc20Token = client.erc20(rootToken, true);

    const result = await erc20Token.approve(amount);

    const txHash = await result.getTransactionHash();
    console.log("txHash", txHash);
    const receipt = await result.getReceipt();
    console.log("receipt", receipt);
    console.log("Approved!")
}


async function deposit() {
    console.log("Depositing...")
    var client = await getPOSClient();
    const erc20Token = client.erc20(rootToken, true);

    const result = await erc20Token.deposit(amount, userAddress, {
        userAddress, 
        gasPrice: 10000000000,
        maxPriorityFeePerGas: 6000000000, 
      });
    
    const txHash = await result.getTransactionHash();
    console.log("txHash", txHash);
    const receipt = await result.getReceipt();
    console.log("receipt", receipt);
    console.log("Done!")
}

(async () => {
    await aprroval();
    await deposit()
})();