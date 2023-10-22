import {ethers} from 'ethers'

const cometAbi = [
  'function getSupplyRate(uint) public view returns (uint)',
  'function getBorrowRate(uint) public view returns (uint)',
  'function getUtilization() public view returns (uint)',
  'function baseTokenPriceFeed() public view returns (address)',
  'function getPrice(address) public view returns (uint128)',
  'function totalSupply() external view returns (uint256)',
  'function totalBorrow() external view returns (uint256)',
  'function baseIndexScale() external pure returns (uint64)',
  'function baseTrackingSupplySpeed() external view returns (uint)',
  'function baseTrackingBorrowSpeed() external view returns (uint)',
];

// this is for mumbai
export const COMPOUND_ADDRESS = "0xF09F0369aB0a875254fB565E52226c88f10Bc839"

export async function getCompoundYieldRate() {
	const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_RPC_URL!);
    const comet = new ethers.Contract(COMPOUND_ADDRESS, cometAbi, provider);

    const secondsPerYear = 60 * 60 * 24 * 365;
    const utilization = await comet.callStatic.getUtilization();
    const supplyRate = await comet.callStatic.getSupplyRate(utilization);
    const supplyApr = +(supplyRate).toString() / 1e18 * secondsPerYear * 100;
    return supplyApr;
}