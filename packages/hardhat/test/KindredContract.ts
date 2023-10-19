import { expect } from "chai";
import { ethers } from "hardhat";
import { KindredCore } from "../typechain-types";
import { Signer, getAddress } from 'ethers';
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { PoolInfoStruct, KindredCore } from '../typechain-types/contracts/KindredCore';

describe("YourContract", function () {
  // We define a fixture to reuse the same setup in every test.

  let kindred: KindredCore;
  let registerer: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress; 
  let user3: SignerWithAddress;

  before(async () => {
    const [registerer, user1, user2, user3] = await ethers.getSigners();
    const KindredContractFactory = await ethers.getContractFactory("KindredCore");
    kindred = (await KindredContractFactory.deploy()) as any as KindredCore;    
    await kindred.deployed();
  });

  describe("Integration", function () {
    it("Should register a group", async function () {
        let participants: string[] = [
          registerer.address, 
          user1.address, 
          user2.address, 
          user3.address
        ]
        let dueDates: number[] = [
            new Date().getTime() + 60,
            new Date().getTime() + 60 * 2,
            new Date().getTime() + 60 * 3,
            new Date().getTime() + 60 * 4
        ]
        let payAmount: number = 100
        let currentPot: number = 0;
        let expectedTermPot: number = 400
        let latefee: number = 0;
        let shares: number = 0;
        let currentDueDate: number = 0;
        let stage = 0;
        let vault = "0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F"// some address
        let token = "0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F"// some address

        const pool: KindredCore.PoolInfoStruct = {
          participants,
          dueDates,
          payAmount,
          currentPot,
          expectedTermPot,
          latefee,
          shares,
          currentDueDate,
          stage,
          vault,
          token
        }

        await kindred.register(pool)

        const createdPool = await kindred.pools(1)
    });

    it("Should allow setting a new message", async function () {
      const newGreeting = "Learn Scaffold-ETH 2! :)";

      await yourContract.setGreeting(newGreeting);
      expect(await yourContract.greeting()).to.equal(newGreeting);
    });
  });
});
