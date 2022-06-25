const {ethers} = require('hardhat');

const {PRIVATE_KEY_OWNER, PRIVATE_KEY_ALT_WALLET, API_URL} = process.env;

// 0x80770DAB280cE45A67eF40aeA65fb94A6b64ebC4
async function create() {
    const DeadManSwitch = await ethers.getContractFactory("DeadManSwitch");
    const DeadManSwitchContract = await DeadManSwitch.deploy();
    console.log("Contract deployed to", DeadManSwitchContract.address);
    await DeadManSwitchContract.deployed();
    return DeadManSwitchContract.address;
}

async function calledDeadManSwitchContract(address) {
    const API_KEY = API_URL.split("/").at(-1);
    const abi = ""
    const provider = new ethers.providers.AlchemyProvider("goerli", API_KEY);
    const wallet = new ethers.Wallet(PRIVATE_KEY_ALT_WALLET);
    const DeadManSwitchContract = new ethers.Contract(address, abi, wallet);

    for(let i=0; i<20; i++) {
        const transaction = await DeadManSwitchContract.still_alive();
        console.log("calledDeadManSwitchContract", transaction);
        await transaction.wait();
    }
}

create()
    .then((address) => 
        calledDeadManSwitchContract(address).then(() => process.exit(0))
        )
    .catch((err) => {console.log(err)})