import chai from "chai";
import chaiSubset from "chai-subset";
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";
import { ContractFactory, Signer, BigNumber, utils } from "ethers";
import { FToken } from "../../types/FToken";
import { Fairydust } from "../../types/Fairydust";
import { VaultAdapterMock } from "../../types/VaultAdapterMock";

import { Erc20Mock } from "../../types/Erc20Mock";
import { getAddress, parseEther } from "ethers/lib/utils";
import { MAXIMUM_U256, ZERO_ADDRESS, mineBlocks } from "../utils/helpers";
import { Transmuter } from "../../types/Transmuter";
import { SSL_OP_EPHEMERAL_RSA } from "constants";

chai.use(solidity);
chai.use(chaiSubset);

const { expect } = chai;

let FairydustFactory: ContractFactory;
let TransmuterFactory: ContractFactory;
let ERC20MockFactory: ContractFactory;
let FUsdFactory: ContractFactory;
let VaultAdapterMockFactory: ContractFactory;

describe("Transmuter", () => {
  let deployer: Signer;
  let depositor: Signer;
  let signers: Signer[];
  let fairydust: Fairydust;
  let governance: Signer;
  let minter: Signer;
  let rewards: Signer;
  let sentinel: Signer;
  let user: Signer;
  let mockFairydust: Signer;
  let token: Erc20Mock;
  let transmuter: Transmuter;
  let adapter: VaultAdapterMock;
  let fUsd: FToken;
  let harvestFee = 1000;
  let ceilingAmt = utils.parseEther("10000000");
  let collateralizationLimit = "2000000000000000000";
  let mintAmount = 5000;
  let mockFairydustAddress;
  let preTestTotalfUsdSupply: BigNumber;

  before(async () => {
    TransmuterFactory = await ethers.getContractFactory("Transmuter");
    ERC20MockFactory = await ethers.getContractFactory("ERC20Mock");
    FUsdFactory = await ethers.getContractFactory("FToken");
    FairydustFactory = await ethers.getContractFactory("Fairydust");
    VaultAdapterMockFactory = await ethers.getContractFactory(
      "VaultAdapterMock"
    );
  });

  beforeEach(async () => {
    signers = await ethers.getSigners();
  });

  beforeEach(async () => {
    [
      deployer,
      rewards,
      depositor,
      sentinel,
      minter,
      governance,
      mockFairydust,
      user,
      ...signers
    ] = await ethers.getSigners();

    token = (await ERC20MockFactory.connect(deployer).deploy(
      "Mock DAI",
      "DAI",
      18
    )) as Erc20Mock;

    fUsd = (await FUsdFactory.connect(deployer).deploy()) as FToken;

    mockFairydustAddress = await mockFairydust.getAddress();

    fairydust = (await FairydustFactory.connect(deployer).deploy(
      token.address,
      fUsd.address,
      await governance.getAddress(),
      await sentinel.getAddress()
    )) as Fairydust;
    transmuter = (await TransmuterFactory.connect(deployer).deploy(
      fUsd.address,
      token.address,
      await governance.getAddress()
    )) as Transmuter;
    await transmuter.connect(governance).setTransmutationPeriod(40320);
    await fairydust.connect(governance).setTransmuter(transmuter.address);
    await fairydust.connect(governance).setRewards(await rewards.getAddress());
    await fairydust.connect(governance).setHarvestFee(harvestFee);
    await transmuter.connect(governance).setWhitelist(mockFairydustAddress, true);

    adapter = (await VaultAdapterMockFactory.connect(deployer).deploy(
      token.address
    )) as VaultAdapterMock;
    await fairydust.connect(governance).initialize(adapter.address);
    await fairydust
      .connect(governance)
      .setCollateralizationLimit(collateralizationLimit);
    await fUsd.connect(deployer).setWhitelist(fairydust.address, true);
    await fUsd.connect(deployer).setCeiling(fairydust.address, ceilingAmt);
    await token.mint(mockFairydustAddress, utils.parseEther("10000"));
    await token.connect(mockFairydust).approve(transmuter.address, MAXIMUM_U256);

    await token.mint(await depositor.getAddress(), utils.parseEther("20000"));
    await token.mint(await minter.getAddress(), utils.parseEther("20000"));
    await token.connect(depositor).approve(transmuter.address, MAXIMUM_U256);
    await fUsd.connect(depositor).approve(transmuter.address, MAXIMUM_U256);
    await token.connect(depositor).approve(fairydust.address, MAXIMUM_U256);
    await fUsd.connect(depositor).approve(fairydust.address, MAXIMUM_U256);
    await token.connect(minter).approve(transmuter.address, MAXIMUM_U256);
    await fUsd.connect(minter).approve(transmuter.address, MAXIMUM_U256);
    await token.connect(minter).approve(fairydust.address, MAXIMUM_U256);
    await fUsd.connect(minter).approve(fairydust.address, MAXIMUM_U256);

    await fairydust.connect(depositor).deposit(utils.parseEther("10000"));
    await fairydust.connect(depositor).mint(utils.parseEther("5000"));

    await fairydust.connect(minter).deposit(utils.parseEther("10000"));
    await fairydust.connect(minter).mint(utils.parseEther("5000"));

    transmuter = transmuter.connect(depositor)

    preTestTotalfUsdSupply = await fUsd.totalSupply();
  });

  describe("stake()", () => {

    it("stakes 1000 fUsd and reads the correct amount", async () => {
      await transmuter.stake(1000);
      expect(
        await transmuter.depositedFTokens(await depositor.getAddress())
      ).equal(1000);
    });

    it("stakes 1000 fUsd two times and reads the correct amount", async () => {
      await transmuter.stake(1000);
      await transmuter.stake(1000);
      expect(
        await transmuter.depositedFTokens(await depositor.getAddress())
      ).equal(2000);
    });

  });

  describe("unstake()", () => {

    it("reverts on depositing and then unstaking balance greater than deposit", async () => {
      await transmuter.stake(utils.parseEther("1000"));
      expect(transmuter.unstake(utils.parseEther("2000"))).revertedWith(
        "Transmuter: unstake amount exceeds deposited amount"
      );
    });

    it("deposits and unstakes 1000 fUsd", async () => {
      await transmuter.stake(utils.parseEther("1000"));
      await transmuter.unstake(utils.parseEther("1000"));
      expect(
        await transmuter.depositedFTokens(await depositor.getAddress())
      ).equal(0);
    });

    it("deposits 1000 fUsd and unstaked 500 fUsd", async () => {
      await transmuter.stake(utils.parseEther("1000"));
      await transmuter.unstake(utils.parseEther("500"));
      expect(
        await transmuter.depositedFTokens(await depositor.getAddress())
      ).equal(utils.parseEther("500"));
    });

  });

  describe("distributes correct amount", () => {
    let distributeAmt = utils.parseEther("1000");
    let stakeAmt = utils.parseEther("1000");
    let transmutationPeriod = 20;

    beforeEach(async () => {
      await transmuter.connect(governance).setTransmutationPeriod(transmutationPeriod);
      await token.mint(await minter.getAddress(), utils.parseEther("20000"));
      await token.connect(minter).approve(transmuter.address, MAXIMUM_U256);
      await fUsd.connect(minter).approve(transmuter.address, MAXIMUM_U256);
      await token.connect(minter).approve(fairydust.address, MAXIMUM_U256);
      await fUsd.connect(minter).approve(fairydust.address, MAXIMUM_U256);
      await fairydust.connect(minter).deposit(utils.parseEther("10000"));
      await fairydust.connect(minter).mint(utils.parseEther("5000"));
      await token.mint(await rewards.getAddress(), utils.parseEther("20000"));
      await token.connect(rewards).approve(transmuter.address, MAXIMUM_U256);
      await fUsd.connect(rewards).approve(transmuter.address, MAXIMUM_U256);
      await token.connect(rewards).approve(fairydust.address, MAXIMUM_U256);
      await fUsd.connect(rewards).approve(fairydust.address, MAXIMUM_U256);
      await fairydust.connect(rewards).deposit(utils.parseEther("10000"));
      await fairydust.connect(rewards).mint(utils.parseEther("5000"));
    });

    it("deposits 100000 fUsd, distributes 1000 DAI, and the correct amount of tokens are distributed to depositor", async () => {
      let numBlocks = 5;
      await transmuter.connect(depositor).stake(stakeAmt);
      await transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt);
      await mineBlocks(ethers.provider, numBlocks);
      let userInfo = await transmuter.userInfo(await depositor.getAddress());
      // pendingdivs should be (distributeAmt * (numBlocks / transmutationPeriod))
      expect(userInfo.pendingdivs).equal(distributeAmt.div(4));
    });

    it("two people deposit equal amounts and recieve equal amounts in distribution", async () => {
      await transmuter.connect(depositor).stake(utils.parseEther("1000"));
      await transmuter.connect(minter).stake(utils.parseEther("1000"));
      await transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt);
      await mineBlocks(ethers.provider, 10);
      let userInfo1 = await transmuter.userInfo(await depositor.getAddress());
      let userInfo2 = await transmuter.userInfo(await minter.getAddress());
      expect(userInfo1.pendingdivs).gt(0);
      expect(userInfo1.pendingdivs).equal(userInfo2.pendingdivs);
    });

    it("deposits of 500, 250, and 250 from three people and distribution is correct", async () => {
      await transmuter.connect(depositor).stake(utils.parseEther("500"));
      await transmuter.connect(minter).stake(utils.parseEther("250"));
      await transmuter.connect(rewards).stake(utils.parseEther("250"));
      await transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt);
      await mineBlocks(ethers.provider, 10);
      let userInfo1 = await transmuter.userInfo(await depositor.getAddress());
      let userInfo2 = await transmuter.userInfo(await minter.getAddress());
      let userInfo3 = await transmuter.userInfo(await rewards.getAddress());
      let user2: BigNumber = userInfo2.pendingdivs;
      let user3: BigNumber = userInfo3.pendingdivs;
      let sumOfTwoUsers = user2.add(user3);
      expect(userInfo1.pendingdivs).gt(0);
      expect(sumOfTwoUsers).equal(userInfo1.pendingdivs);
    });

  });

  describe("transmute() claim() transmuteAndClaim()", () => {
    let distributeAmt = utils.parseEther("500");
    let transmutedAmt = BigNumber.from("12400793650793600");

    it("transmutes the correct amount", async () => {
      await transmuter.stake(utils.parseEther("1000"));
      await mineBlocks(ethers.provider, 10);
      await transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt);
      await transmuter.transmute();
      let userInfo = await transmuter.userInfo(await depositor.getAddress());
      expect(userInfo.realised).equal(transmutedAmt);
    });

    it("burns the supply of fUsd on transmute()", async () => {
      await transmuter.stake(utils.parseEther("1000"));
      await mineBlocks(ethers.provider, 10);
      await transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt);
      await transmuter.transmute();
      let fUsdTokenSupply = await fUsd.totalSupply();
      expect(fUsdTokenSupply).equal(preTestTotalfUsdSupply.sub(transmutedAmt));
    });

    it("moves DAI from pendingdivs to inbucket upon staking more", async () => {
      await transmuter.stake(utils.parseEther("1000"));
      await mineBlocks(ethers.provider, 10);
      await transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt);
      await transmuter.stake(utils.parseEther("100"));
      let userInfo = await transmuter.userInfo(await depositor.getAddress());
      expect(userInfo.inbucket).equal(transmutedAmt);
    });

    it("transmutes and claims using transmute() and then claim()", async () => {
      await transmuter.stake(utils.parseEther("1000"));
      await mineBlocks(ethers.provider, 10);
      await transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt);
      let tokenBalanceBefore = await token.connect(depositor).balanceOf(await depositor.getAddress());
      await transmuter.transmute();
      await transmuter.claim();
      let tokenBalanceAfter = await token.connect(depositor).balanceOf(await depositor.getAddress());
      expect(tokenBalanceAfter).equal(tokenBalanceBefore.add(transmutedAmt));
    });

    it("transmutes and claims using transmuteAndClaim()", async () => {
      await transmuter.stake(utils.parseEther("1000"));
      await mineBlocks(ethers.provider, 10);
      await transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt);
      let tokenBalanceBefore = await token.connect(depositor).balanceOf(await depositor.getAddress());
      await transmuter.transmuteAndClaim();
      let tokenBalanceAfter = await token.connect(depositor).balanceOf(await depositor.getAddress());
      expect(tokenBalanceAfter).equal(tokenBalanceBefore.add(transmutedAmt));
    });

    it("transmutes the full buffer if a complete phase has passed", async () => {
      await transmuter.stake(utils.parseEther("1000"));
      await transmuter.connect(governance).setTransmutationPeriod(10);
      await transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt);
      await mineBlocks(ethers.provider, 11);
      let tokenBalanceBefore = await token.connect(depositor).balanceOf(await depositor.getAddress());
      await transmuter.connect(depositor).transmuteAndClaim();
      let tokenBalanceAfter = await token.connect(depositor).balanceOf(await depositor.getAddress());
      expect(tokenBalanceAfter).equal(tokenBalanceBefore.add(distributeAmt));
    });

    it("transmutes the staked amount and distributes overflow if a bucket overflows", async () => {
      // 1) DEPOSITOR stakes 100 dai
      // 2) distribution of 90 dai, let transmutation period pass
      // DEPOSITOR gets 90 dai
      // 3) MINTER stakes 200 dai
      // 4) distribution of 60 dai, let transmutation period pass
      // DEPOSITOR gets 20 dai, MINTER gets 40 dai
      // 5) USER stakes 200 dai (to distribute allocations)
      // 6) transmute DEPOSITOR, bucket overflows by 10 dai
      // MINTER gets 5 dai, USER gets 5 dai
      let distributeAmt0 = utils.parseEther("90")
      let distributeAmt1 = utils.parseEther("60")
      let depStakeAmt0 = utils.parseEther("100")
      let depStakeAmt1 = utils.parseEther("200")
      await transmuter.connect(governance).setTransmutationPeriod(10);
      await token.connect(minter).approve(transmuter.address, MAXIMUM_U256);
      await fUsd.connect(minter).approve(transmuter.address, MAXIMUM_U256);
      await fUsd.connect(user).approve(transmuter.address, MAXIMUM_U256);
      await token.connect(minter).approve(fairydust.address, MAXIMUM_U256);
      await token.connect(user).approve(fairydust.address, MAXIMUM_U256);
      await fUsd.connect(minter).approve(fairydust.address, MAXIMUM_U256);
      await fUsd.connect(user).approve(fairydust.address, MAXIMUM_U256);
      await token.mint(await minter.getAddress(), utils.parseEther("20000"));
      await fairydust.connect(minter).deposit(utils.parseEther("10000"));
      await fairydust.connect(minter).mint(utils.parseEther("5000"));
      await token.mint(await user.getAddress(), utils.parseEther("20000"));
      await fairydust.connect(user).deposit(utils.parseEther("10000"));
      await fairydust.connect(user).mint(utils.parseEther("5000"));

      // user 1 deposit
      await transmuter.connect(depositor).stake(depStakeAmt0);
      await transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt0);
      await mineBlocks(ethers.provider, 10);

      // user 2 deposit
      await transmuter.connect(minter).stake(depStakeAmt1);
      await transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt1);
      await mineBlocks(ethers.provider, 10);

      await transmuter.connect(user).stake(depStakeAmt1);

      let minterInfo = await transmuter.userInfo(await minter.getAddress());
      let minterBucketBefore = minterInfo.inbucket;
      await transmuter.connect(depositor).transmuteAndClaim();
      minterInfo = await transmuter.userInfo(await minter.getAddress());
      let userInfo = await transmuter.userInfo(await user.getAddress());

      let minterBucketAfter = minterInfo.inbucket;
      expect(minterBucketAfter).equal(minterBucketBefore.add(parseEther("5")));
      expect(userInfo.inbucket).equal(parseEther("5"));
    });

  });

  describe("transmuteClaimAndWithdraw()", () => {
    let distributeAmt = utils.parseEther("500");
    let transmutedAmt = BigNumber.from("6200396825396800");
    let fUsdBalanceBefore: BigNumber;
    let tokenBalanceBefore: BigNumber;

    beforeEach(async () => {
      tokenBalanceBefore = await token.connect(depositor).balanceOf(await depositor.getAddress());
      fUsdBalanceBefore = await fUsd.connect(depositor).balanceOf(await depositor.getAddress());
      await transmuter.stake(utils.parseEther("1000"));
      await transmuter.connect(minter).stake(utils.parseEther("1000"));
      await mineBlocks(ethers.provider, 10);
      await transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt);
      await transmuter.transmuteClaimAndWithdraw();
    })

    it("has a staking balance of 0 fUsd after transmuteClaimAndWithdraw()", async () => {
      let userInfo = await transmuter.userInfo(await depositor.getAddress());
      expect(userInfo.depositedAl).equal(0);
      expect(await transmuter.depositedFTokens(await depositor.getAddress())).equal(0);
    });

    it("returns the amount of fUsd staked less the transmuted amount", async () => {
      let fUsdBalanceAfter = await fUsd.connect(depositor).balanceOf(await depositor.getAddress());
      expect(fUsdBalanceAfter).equal(fUsdBalanceBefore.sub(transmutedAmt))
    });

    it("burns the correct amount of transmuted fUsd using transmuteClaimAndWithdraw()", async () => {
      let fUsdTokenSupply = await fUsd.totalSupply();
      expect(fUsdTokenSupply).equal(preTestTotalfUsdSupply.sub(transmutedAmt));
    });

    it("successfully sends DAI to owner using transmuteClaimAndWithdraw()", async () => {
      let tokenBalanceAfter = await token.connect(depositor).balanceOf(await depositor.getAddress());
      expect(tokenBalanceAfter).equal(tokenBalanceBefore.add(transmutedAmt));
    });

  });

  describe("exit()", () => {
    let distributeAmt = utils.parseEther("500");
    let transmutedAmt = BigNumber.from("6200396825396800");
    let fUsdBalanceBefore: BigNumber;
    let tokenBalanceBefore: BigNumber;

    beforeEach(async () => {
      tokenBalanceBefore = await token.connect(depositor).balanceOf(await depositor.getAddress());
      fUsdBalanceBefore = await fUsd.connect(depositor).balanceOf(await depositor.getAddress());
      await transmuter.stake(utils.parseEther("1000"));
      await transmuter.connect(minter).stake(utils.parseEther("1000"));
      await mineBlocks(ethers.provider, 10);
      await transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt);
      await transmuter.exit();
    })

    it("transmutes and then withdraws fUsd from staking", async () => {
      let fUsdBalanceAfter = await fUsd.connect(depositor).balanceOf(await depositor.getAddress());
      expect(fUsdBalanceAfter).equal(fUsdBalanceBefore.sub(transmutedAmt));
    });

    it("transmutes and claimable DAI moves to realised value", async () => {
      let userInfo = await transmuter.userInfo(await depositor.getAddress());
      expect(userInfo.realised).equal(transmutedAmt);
    })

    it("does not claim the realized tokens", async () => {
      let tokenBalanceAfter = await token.connect(depositor).balanceOf(await depositor.getAddress());
      expect(tokenBalanceAfter).equal(tokenBalanceBefore);
    })

  })

  describe("forceTransmute()", () => {
    let distributeAmt = utils.parseEther("5000");

    beforeEach(async () => {
      transmuter.connect(governance).setTransmutationPeriod(10);
      await token.mint(await minter.getAddress(), utils.parseEther("20000"));
      await token.connect(minter).approve(transmuter.address, MAXIMUM_U256);
      await fUsd.connect(minter).approve(transmuter.address, MAXIMUM_U256);
      await token.connect(minter).approve(fairydust.address, MAXIMUM_U256);
      await fUsd.connect(minter).approve(fairydust.address, MAXIMUM_U256);
      await fairydust.connect(minter).deposit(utils.parseEther("10000"));
      await fairydust.connect(minter).mint(utils.parseEther("5000"));
      await transmuter.connect(depositor).stake(utils.parseEther(".01"));
    });

    it("User 'depositor' has fUsd overfilled, user 'minter' force transmutes user 'depositor' and user 'depositor' has DAI sent to his address", async () => {
      await transmuter.connect(minter).stake(utils.parseEther("10"));
      await transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt);
      await mineBlocks(ethers.provider, 10);
      let tokenBalanceBefore = await token.connect(depositor).balanceOf(await depositor.getAddress());
      await transmuter.connect(minter).forceTransmute(await depositor.getAddress());
      let tokenBalanceAfter = await token.connect(depositor).balanceOf(await depositor.getAddress());
      expect(tokenBalanceBefore).equal(tokenBalanceAfter.sub(utils.parseEther("0.01")));
    });

    it("User 'depositor' has fUsd overfilled, user 'minter' force transmutes user 'depositor' and user 'minter' overflow added inbucket", async () => {
      await transmuter.connect(minter).stake(utils.parseEther("10"));
      await transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt);
      await mineBlocks(ethers.provider, 10);
      await transmuter.connect(minter).forceTransmute(await depositor.getAddress());
      let userInfo = await transmuter.connect(minter).userInfo(await minter.getAddress());
      // TODO calculate the expected value
      expect(userInfo.inbucket).equal("4999989999999999999999");
    });

    it("you can force transmute yourself", async () => {
      await transmuter.connect(minter).stake(utils.parseEther("1"));
      await transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt);
      await mineBlocks(ethers.provider, 10);
      let tokenBalanceBefore = await token.connect(depositor).balanceOf(await depositor.getAddress());
      await transmuter.connect(depositor).forceTransmute(await depositor.getAddress());
      let tokenBalanceAfter = await token.connect(depositor).balanceOf(await depositor.getAddress());
      expect(tokenBalanceBefore).equal(tokenBalanceAfter.sub(utils.parseEther("0.01")));
    });

    it("you can force transmute yourself even when you are the only one in the transmuter", async () => {
      await transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt);
      await mineBlocks(ethers.provider, 10);
      let tokenBalanceBefore = await token.connect(depositor).balanceOf(await depositor.getAddress());
      await transmuter.connect(depositor).forceTransmute(await depositor.getAddress());
      let tokenBalanceAfter = await token.connect(depositor).balanceOf(await depositor.getAddress());
      expect(tokenBalanceBefore).equal(tokenBalanceAfter.sub(utils.parseEther("0.01")));
    });

    it("reverts when you are not overfilled", async () => {
      await transmuter.connect(minter).stake(utils.parseEther("1000"));
      await transmuter.connect(mockFairydust).distribute(mockFairydustAddress, utils.parseEther("1000"));
      expect(transmuter.connect(minter).forceTransmute(await depositor.getAddress())).revertedWith("Transmuter: !overflow");
    });

  });
  //not sure what this is actually testing.... REEEE
  describe("Multiple Users displays all overfilled users", () => {

    it("returns userInfo", async () => {
      await transmuter.stake(utils.parseEther("1000"));
      await transmuter.connect(minter).stake(utils.parseEther("1000"));
      await transmuter.connect(mockFairydust).distribute(mockFairydustAddress, utils.parseEther("5000"));
      let multipleUsers = await transmuter.getMultipleUserInfo(0, 1);
      let userList = multipleUsers.theUserData;
      expect(userList.length).equal(2)
    })

  })

  describe("distribute()", () => {
    let transmutationPeriod = 20;

    beforeEach(async () => {
      await transmuter.connect(governance).setTransmutationPeriod(transmutationPeriod);
    })

    it("must be whitelisted to call distribute", async () => {
      await transmuter.connect(depositor).stake(utils.parseEther("1000"));
      expect(
        transmuter.connect(depositor).distribute(fairydust.address, utils.parseEther("1000"))
      ).revertedWith("Transmuter: !whitelisted")
    });

    it("increases buffer size, but does not immediately increase allocations", async () => {
      await transmuter.connect(depositor).stake(utils.parseEther("1000"));
      await transmuter.connect(mockFairydust).distribute(mockFairydustAddress, utils.parseEther("1000"))
      let userInfo = await transmuter.userInfo(await depositor.getAddress());
      let bufferInfo = await transmuter.bufferInfo();

      expect(bufferInfo._buffer).equal(utils.parseEther("1000"));
      expect(bufferInfo._deltaBlocks).equal(0);
      expect(bufferInfo._toDistribute).equal(0);
      expect(userInfo.pendingdivs).equal(0);
      expect(userInfo.depositedAl).equal(utils.parseEther("1000"));
      expect(userInfo.inbucket).equal(0);
      expect(userInfo.realised).equal(0);
    });

    describe("userInfo()", async () => {

      it("distribute increases allocations if the buffer is already > 0", async () => {
        let blocksMined = 10;
        let stakeAmt = utils.parseEther("1000");
        await transmuter.connect(depositor).stake(stakeAmt);
        await transmuter.connect(mockFairydust).distribute(mockFairydustAddress, utils.parseEther("1000"))
        await mineBlocks(ethers.provider, blocksMined);
        let userInfo = await transmuter.userInfo(await depositor.getAddress());
        let bufferInfo = await transmuter.bufferInfo();
  
        // 2 = transmutationPeriod / blocksMined
        expect(bufferInfo._buffer).equal(stakeAmt);
        expect(userInfo.pendingdivs).equal(stakeAmt.div(2));
        expect(userInfo.depositedAl).equal(stakeAmt);
        expect(userInfo.inbucket).equal(0);
        expect(userInfo.realised).equal(0);
      });
  
      it("increases buffer size, and userInfo() shows the correct state without an extra nudge", async () => {
        let stakeAmt = utils.parseEther("1000");
        await transmuter.connect(depositor).stake(stakeAmt);
        await transmuter.connect(mockFairydust).distribute(mockFairydustAddress, stakeAmt)
        await mineBlocks(ethers.provider, 10);
        let userInfo = await transmuter.userInfo(await depositor.getAddress());
        let bufferInfo = await transmuter.bufferInfo();
  
        expect(bufferInfo._buffer).equal("1000000000000000000000");
        expect(userInfo.pendingdivs).equal(stakeAmt.div(2));
        expect(userInfo.depositedAl).equal(stakeAmt);
        expect(userInfo.inbucket).equal(0);
        expect(userInfo.realised).equal(0);
      });

    })

  });

});
