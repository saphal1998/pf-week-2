const { ethers } = require('ethers')
const { abi: UniswapV3Factory } = require('@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json')
require('dotenv').config()
const INFURA_URL_TESTNET = process.env.INFURA_URL_TESTNET

const address0 = '0xBa048069ad252B6c5C04724d71631c32d165F376'
const address1 = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'
const factoryAddress = '0x1F98431c8aD98523631AE4a59f267346ea31F984'

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(INFURA_URL_TESTNET)

  const factoryContract = new ethers.Contract(
    factoryAddress,
    UniswapV3Factory,
    provider
  )

  const poolAddress = await factoryContract.getPool(address0, address1, 100)
  console.log('poolAddress', poolAddress)

}

main()