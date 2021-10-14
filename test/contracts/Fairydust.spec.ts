import chai from "chai";
import chaiSubset from "chai-subset";
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";
import { BigNumber, BigNumberish, ContractFactory, Signer, utils } from "ethers";
import { Transmuter } from "../../types/Transmuter";
import { Fairydust } from "../../types/Fairydust";
import { StakingPools } from "../../types/StakingPools";
import { FToken } from "../../types/FToken";
import { Erc20Mock } from "../../types/Erc20Mock";
import { MAXIMUM_U256, ZERO_ADDRESS } from "../utils/helpers";
import { VaultAdapterMock } from "../../types/VaultAdapterMock";
import { YearnVaultAdapter } from "../../types/YearnVaultAdapter";
import { YearnVaultMock } from "../../types/YearnVaultMock";
import { YearnControllerMock } from "../../types/YearnControllerMock";
import { min } from "moment";
const {parseEther, formatEther} = utils;

chai.use(solidity);
chai.use(chaiSubset);

const { expect } = chai;

let FairydustFactory: ContractFactory;
let FUSDFactory: ContractFactory;
let ERC20MockFactory: ContractFactory;
let VaultAdapterMockFactory: ContractFactory;
let TransmuterFactory: ContractFactory;
let YearnVaultAdapterFactory: ContractFactory;
let YearnVaultMockFactory: ContractFactory;
let YearnControllerMockFactory: ContractFactory;

describe("Fairydust", () => {
  let signers: Signer[];

  before(async () => {
    FairydustFactory = await ethers.getContractFactory("Fairydust");
    TransmuterFactory = await ethers.getContractFactory("Transmuter");
    FUSDFactory = await ethers.getContractFactory("FToken");
    ERC20MockFactory = await ethers.getContractFactory("ERC20Mock");
    VaultAdapterMockFactory = await ethers.getContractFactory(
      "VaultAdapterMock"
    );
    YearnVaultAdapterFactory = await ethers.getContractFactory("YearnVaultAdapter");
    YearnVaultMockFactory = await ethers.getContractFactory("YearnVaultMock");
    YearnControllerMockFactory = await ethers.getContractFactory("YearnControllerMock");
  });

  beforeEach(async () => {
    signers = await ethers.getSigners();
  });

  describe("constructor", async () => {
    let deployer: Signer;
    let governance: Signer;
    let sentinel: Signer;
    let token: Erc20Mock;
    let fUsd: FToken;
    let Fairydust: Fairydust;
    
    beforeEach(async () => {
      [deployer, governance, sentinel, ...signers] = signers;

      token = (await ERC20MockFactory.connect(deployer).deploy(
        "Mock DAI",
        "DAI",
        18
      )) as Erc20Mock;

      fUsd = (await FUSDFactory.connect(deployer).deploy()) as FToken;

      // Fairydust = await FairydustFactory
      //   .connect(deployer)
      //   .deploy(
      //     token.address, fUsd.address, await governance.getAddress(), await sentinel.getAddress()
      //   ) as Fairydust;
    });

    // it("copies the decimals of the base asset", async () => {
    //   expect(await Fairydust.decimals()).equal(await token.decimals());
    // });

    context("when governance is the zero address", () => {
      it("reverts", async () => {
        expect(
          FairydustFactory.connect(deployer).deploy(
            token.address,
            fUsd.address,
            ZERO_ADDRESS,
            await sentinel.getAddress()
          )
        ).revertedWith("Fairydust: governance address cannot be 0x0.");
      });
    });
  });

  describe("update Fairydust addys and variables", () => {
    let deployer: Signer;
    let governance: Signer;
    let newGovernance: Signer;
    let rewards: Signer;
    let sentinel: Signer;
    let transmuter: Signer;
    let token: Erc20Mock;
    let fUsd: FToken;
    let Fairydust: Fairydust;


    beforeEach(async () => {
      [
        deployer,
        governance,
        newGovernance,
        rewards,
        sentinel,
        transmuter,
        ...signers
      ] = signers;

      token = (await ERC20MockFactory.connect(deployer).deploy(
        "Mock DAI",
        "DAI",
        18
      )) as Erc20Mock;

      fUsd = (await FUSDFactory.connect(deployer).deploy()) as FToken;

      Fairydust = (await FairydustFactory.connect(deployer).deploy(
        token.address,
        fUsd.address,
        await governance.getAddress(),
        await sentinel.getAddress()
      )) as Fairydust;

    });

    describe("set governance", () => {
      context("when caller is not current governance", () => {
        beforeEach(() => (Fairydust = Fairydust.connect(deployer)));

        it("reverts", async () => {
          expect(
            Fairydust.setPendingGovernance(await newGovernance.getAddress())
          ).revertedWith("Fairydust: only governance");
        });
      });

      context("when caller is current governance", () => {
        beforeEach(() => (Fairydust = Fairydust.connect(governance)));

        it("reverts when setting governance to zero address", async () => {
          expect(Fairydust.setPendingGovernance(ZERO_ADDRESS)).revertedWith(
            "Fairydust: governance address cannot be 0x0."
          );
        });

        it("updates rewards", async () => {
          await Fairydust.setRewards(await rewards.getAddress());
          expect(await Fairydust.rewards()).equal(await rewards.getAddress());
        });
      });
    });

    describe("set transmuter", () => {
      context("when caller is not current governance", () => {
        it("reverts", async () => {
          expect(
            Fairydust.setTransmuter(await transmuter.getAddress())
          ).revertedWith("Fairydust: only governance");
        });
      });

      context("when caller is current governance", () => {
        beforeEach(() => (Fairydust = Fairydust.connect(governance)));

        it("reverts when setting transmuter to zero address", async () => {
          expect(Fairydust.setTransmuter(ZERO_ADDRESS)).revertedWith(
            "Fairydust: transmuter address cannot be 0x0."
          );
        });

        it("updates transmuter", async () => {
          await Fairydust.setTransmuter(await transmuter.getAddress());
          expect(await Fairydust.transmuter()).equal(
            await transmuter.getAddress()
          );
        });
      });
    });

    describe("set rewards", () => {
      context("when caller is not current governance", () => {
        beforeEach(() => (Fairydust = Fairydust.connect(deployer)));

        it("reverts", async () => {
          expect(Fairydust.setRewards(await rewards.getAddress())).revertedWith(
            "Fairydust: only governance"
          );
        });
      });

      context("when caller is current governance", () => {
        beforeEach(() => (Fairydust = Fairydust.connect(governance)));

        it("reverts when setting rewards to zero address", async () => {
          expect(Fairydust.setRewards(ZERO_ADDRESS)).revertedWith(
            "Fairydust: rewards address cannot be 0x0."
          );
        });

        it("updates rewards", async () => {
          await Fairydust.setRewards(await rewards.getAddress());
          expect(await Fairydust.rewards()).equal(await rewards.getAddress());
        });
      });
    });

    describe("set peformance fee", () => {
      context("when caller is not current governance", () => {
        beforeEach(() => (Fairydust = Fairydust.connect(deployer)));

        it("reverts", async () => {
          expect(Fairydust.setHarvestFee(1)).revertedWith(
            "Fairydust: only governance"
          );
        });
      });

      context("when caller is current governance", () => {
        beforeEach(() => (Fairydust = Fairydust.connect(governance)));

        it("reverts when performance fee greater than maximum", async () => {
          const MAXIMUM_VALUE = await Fairydust.PERCENT_RESOLUTION();
          expect(Fairydust.setHarvestFee(MAXIMUM_VALUE.add(1))).revertedWith(
            "Fairydust: harvest fee above maximum"
          );
        });

        it("updates performance fee", async () => {
          await Fairydust.setHarvestFee(1);
          expect(await Fairydust.harvestFee()).equal(1);
        });
      });
    });

    describe("set collateralization limit", () => {
      context("when caller is not current governance", () => {
        beforeEach(() => (Fairydust = Fairydust.connect(deployer)));

        it("reverts", async () => {
          const collateralizationLimit = await Fairydust.MINIMUM_COLLATERALIZATION_LIMIT();
          expect(
            Fairydust.setCollateralizationLimit(collateralizationLimit)
          ).revertedWith("Fairydust: only governance");
        });
      });

      context("when caller is current governance", () => {
        beforeEach(() => (Fairydust = Fairydust.connect(governance)));

        it("reverts when performance fee less than minimum", async () => {
          const MINIMUM_LIMIT = await Fairydust.MINIMUM_COLLATERALIZATION_LIMIT();
          expect(
            Fairydust.setCollateralizationLimit(MINIMUM_LIMIT.sub(1))
          ).revertedWith("Fairydust: collateralization limit below minimum.");
        });

        it("reverts when performance fee greater than maximum", async () => {
          const MAXIMUM_LIMIT = await Fairydust.MAXIMUM_COLLATERALIZATION_LIMIT();
          expect(
            Fairydust.setCollateralizationLimit(MAXIMUM_LIMIT.add(1))
          ).revertedWith("Fairydust: collateralization limit above maximum");
        });

        it("updates collateralization limit", async () => {
          const collateralizationLimit = await Fairydust.MINIMUM_COLLATERALIZATION_LIMIT();
          await Fairydust.setCollateralizationLimit(collateralizationLimit);
          expect(await Fairydust.collateralizationLimit()).containSubset([
            collateralizationLimit,
          ]);
        });
      });
    });
  });

  describe("vault actions", () => {
    let deployer: Signer;
    let governance: Signer;
    let sentinel: Signer;
    let rewards: Signer;
    let transmuter: Signer;
    let minter: Signer;
    let user: Signer;
    let token: Erc20Mock;
    let fUsd: FToken;
    let Fairydust: Fairydust;
    let adapter: VaultAdapterMock;
    let harvestFee = 1000;
    let pctReso = 10000;
    let transmuterContract: Transmuter;

    beforeEach(async () => {
      [
        deployer,
        governance,
        sentinel,
        rewards,
        transmuter,
        minter,
        user,
        ...signers
      ] = signers;

      token = (await ERC20MockFactory.connect(deployer).deploy(
        "Mock DAI",
        "DAI",
        18
      )) as Erc20Mock;

      fUsd = (await FUSDFactory.connect(deployer).deploy()) as FToken;

      Fairydust = (await FairydustFactory.connect(deployer).deploy(
        token.address,
        fUsd.address,
        await governance.getAddress(),
        await sentinel.getAddress()
      )) as Fairydust;

      await Fairydust
        .connect(governance)
        .setTransmuter(await transmuter.getAddress());
      await Fairydust
        .connect(governance)
        .setRewards(await rewards.getAddress());
      await Fairydust.connect(governance).setHarvestFee(harvestFee);
      transmuterContract = (await TransmuterFactory.connect(deployer).deploy(
        fUsd.address,
        token.address,
        await governance.getAddress()
      )) as Transmuter;
      await Fairydust.connect(governance).setTransmuter(transmuterContract.address);
      await transmuterContract.connect(governance).setWhitelist(Fairydust.address, true);
      await token.mint(await minter.getAddress(), parseEther("10000"));
      await token.connect(minter).approve(Fairydust.address, parseEther("10000"));
    });

    describe("migrate", () => {
      beforeEach(async () => {
        adapter = (await VaultAdapterMockFactory.connect(deployer).deploy(
          token.address
        )) as VaultAdapterMock;

        await Fairydust.connect(governance).initialize(adapter.address);
      });

      context("when caller is not current governance", () => {
        beforeEach(() => (Fairydust = Fairydust.connect(deployer)));

        it("reverts", async () => {
          expect(Fairydust.migrate(adapter.address)).revertedWith(
            "Fairydust: only governance"
          );
        });
      });

      context("when caller is current governance", () => {
        beforeEach(() => (Fairydust = Fairydust.connect(governance)));

        context("when adapter is zero address", async () => {
          it("reverts", async () => {
            expect(Fairydust.migrate(ZERO_ADDRESS)).revertedWith(
              "Fairydust: active vault address cannot be 0x0."
            );
          });
        });

        context("when adapter token mismatches", () => {
          const tokenAddress = ethers.utils.getAddress(
            "0xffffffffffffffffffffffffffffffffffffffff"
          );

          let invalidAdapter: VaultAdapterMock;

          beforeEach(async () => {
            invalidAdapter = (await VaultAdapterMockFactory.connect(
              deployer
            ).deploy(tokenAddress)) as VaultAdapterMock;
          });

          it("reverts", async () => {
            expect(Fairydust.migrate(invalidAdapter.address)).revertedWith(
              "Fairydust: token mismatch"
            );
          });
        });

        context("when conditions are met", () => {
          beforeEach(async () => {
            await Fairydust.migrate(adapter.address);
          });

          it("increments the vault count", async () => {
            expect(await Fairydust.vaultCount()).equal(2);
          });

          it("sets the vaults adapter", async () => {
            expect(await Fairydust.getVaultAdapter(0)).equal(adapter.address);
          });
        });
      });
    });

    describe("recall funds", () => {
      context("from the active vault", () => {
        let adapter: YearnVaultAdapter;
        let controllerMock: YearnControllerMock;
        let vaultMock: YearnVaultMock;
        let depositAmt = parseEther("5000");
        let mintAmt = parseEther("1000");
        let recallAmt = parseEther("500");

        beforeEach(async () => {
          controllerMock = await YearnControllerMockFactory
            .connect(deployer)
            .deploy() as YearnControllerMock;
          vaultMock = await YearnVaultMockFactory
            .connect(deployer)
            .deploy(token.address, controllerMock.address) as YearnVaultMock;
          adapter = await YearnVaultAdapterFactory
            .connect(deployer)
            .deploy(vaultMock.address, Fairydust.address) as YearnVaultAdapter;
          await token.mint(await deployer.getAddress(), parseEther("10000"));
          await token.approve(vaultMock.address, parseEther("10000"));
          await Fairydust.connect(governance).initialize(adapter.address)
          await Fairydust.connect(minter).deposit(depositAmt);
          await Fairydust.flush();
          // need at least one other deposit in the vault to not get underflow errors
          await vaultMock.connect(deployer).deposit(parseEther("100"));
        });

        it("reverts when not an emergency, not governance, and user does not have permission to recall funds from active vault", async () => {
          expect(Fairydust.connect(minter).recall(0, 0))
            .revertedWith("Fairydust: not an emergency, not governance, and user does not have permission to recall funds from active vault")
        });

        it("governance can recall some of the funds", async () => {
          let beforeBal = await token.connect(governance).balanceOf(Fairydust.address);
          await Fairydust.connect(governance).recall(0, recallAmt);
          let afterBal = await token.connect(governance).balanceOf(Fairydust.address);
          expect(beforeBal).equal(0);
          expect(afterBal).equal(recallAmt);
        });

        it("governance can recall all of the funds", async () => {
          await Fairydust.connect(governance).recallAll(0);
          expect(await token.connect(governance).balanceOf(Fairydust.address)).equal(depositAmt);
        });

        describe("in an emergency", async () => {
          it("anyone can recall funds", async () => {
            await Fairydust.connect(governance).setEmergencyExit(true);
            await Fairydust.connect(minter).recallAll(0);
            expect(await token.connect(governance).balanceOf(Fairydust.address)).equal(depositAmt);
          });

          it("after some usage", async () => {
            await Fairydust.connect(minter).deposit(mintAmt);
            await Fairydust.connect(governance).flush();
            await token.mint(adapter.address, parseEther("500"));
            await Fairydust.connect(governance).setEmergencyExit(true);
            await Fairydust.connect(minter).recallAll(0);
            expect(await token.connect(governance).balanceOf(Fairydust.address)).equal(depositAmt.add(mintAmt));
          });
        })
      });

      context("from an inactive vault", () => {
        let inactiveAdapter: VaultAdapterMock;
        let activeAdapter: VaultAdapterMock;
        let depositAmt = parseEther("5000");
        let mintAmt = parseEther("1000");
        let recallAmt = parseEther("500");

        beforeEach(async () => {
          inactiveAdapter = await VaultAdapterMockFactory.connect(deployer).deploy(token.address) as VaultAdapterMock;
          activeAdapter = await VaultAdapterMockFactory.connect(deployer).deploy(token.address) as VaultAdapterMock;

          await Fairydust.connect(governance).initialize(inactiveAdapter.address);
          await token.mint(await minter.getAddress(), depositAmt);
          await token.connect(minter).approve(Fairydust.address, depositAmt);
          await Fairydust.connect(minter).deposit(depositAmt);
          await Fairydust.connect(minter).flush();
          await Fairydust.connect(governance).migrate(activeAdapter.address);
        });

        it("anyone can recall some of the funds to the contract", async () => {
          await Fairydust.connect(minter).recall(0, recallAmt);
          expect(await token.balanceOf(Fairydust.address)).equal(recallAmt);
        });

        it("anyone can recall all of the funds to the contract", async () => {
          await Fairydust.connect(minter).recallAll(0);
          expect(await token.balanceOf(Fairydust.address)).equal(depositAmt);
        });

        describe("in an emergency", async () => {
          it("anyone can recall funds", async () => {
            await Fairydust.connect(governance).setEmergencyExit(true);
            await Fairydust.connect(minter).recallAll(0);
            expect(await token.connect(governance).balanceOf(Fairydust.address)).equal(depositAmt);
          });
        })
      });
    });

    describe("flush funds", () => {
      let adapter: VaultAdapterMock;

      context("when the Fairydust is not initialized", () => {
        it("reverts", async () => {
          expect(Fairydust.flush()).revertedWith("Fairydust: not initialized.");
        });
      });

      context("when there is at least one vault to flush to", () => {
        context("when there is one vault", () => {
          let adapter: VaultAdapterMock;
          let mintAmount = parseEther("5000");

          beforeEach(async () => {
            adapter = (await VaultAdapterMockFactory.connect(deployer).deploy(
              token.address
            )) as VaultAdapterMock;
          });

          beforeEach(async () => {
            await token.mint(Fairydust.address, mintAmount);

            await Fairydust.connect(governance).initialize(adapter.address);

            await Fairydust.flush();
          });

          it("flushes funds to the vault", async () => {
            expect(await token.balanceOf(adapter.address)).equal(mintAmount);
          });
        });

        context("when there are multiple vaults", () => {
          let inactiveAdapter: VaultAdapterMock;
          let activeAdapter: VaultAdapterMock;
          let mintAmount = parseEther("5000");

          beforeEach(async () => {
            inactiveAdapter = (await VaultAdapterMockFactory.connect(
              deployer
            ).deploy(token.address)) as VaultAdapterMock;

            activeAdapter = (await VaultAdapterMockFactory.connect(
              deployer
            ).deploy(token.address)) as VaultAdapterMock;

            await token.mint(Fairydust.address, mintAmount);

            await Fairydust
              .connect(governance)
              .initialize(inactiveAdapter.address);

            await Fairydust.connect(governance).migrate(activeAdapter.address);

            await Fairydust.flush();
          });

          it("flushes funds to the active vault", async () => {
            expect(await token.balanceOf(activeAdapter.address)).equal(
              mintAmount
            );
          });
        });
      });
    });

    describe("deposit and withdraw tokens", () => {
      let depositAmt = parseEther("5000");
      let mintAmt = parseEther("1000");
      let ceilingAmt = parseEther("10000");
      let collateralizationLimit = "2000000000000000000"; // this should be set in the deploy sequence
      beforeEach(async () => {
        adapter = (await VaultAdapterMockFactory.connect(deployer).deploy(
          token.address
        )) as VaultAdapterMock;
        await Fairydust.connect(governance).initialize(adapter.address);
        await Fairydust
          .connect(governance)
          .setCollateralizationLimit(collateralizationLimit);
        await fUsd.connect(deployer).setWhitelist(Fairydust.address, true);
        await fUsd.connect(deployer).setCeiling(Fairydust.address, ceilingAmt);
        await token.mint(await minter.getAddress(), depositAmt);
        await token.connect(minter).approve(Fairydust.address, parseEther("100000000"));
        await fUsd.connect(minter).approve(Fairydust.address, parseEther("100000000"));
      });

      it("deposited amount is accounted for correctly", async () => {
        // let address = await deployer.getAddress();
        await Fairydust.connect(minter).deposit(depositAmt);
        expect(
          await Fairydust
            .connect(minter)
            .getCdpTotalDeposited(await minter.getAddress())
        ).equal(depositAmt);
      });

      it("deposits token and then withdraws all", async () => {
        let balBefore = await token.balanceOf(await minter.getAddress());
        await Fairydust.connect(minter).deposit(depositAmt);
        await Fairydust.connect(minter).withdraw(depositAmt);
        let balAfter = await token.balanceOf(await minter.getAddress());
        expect(balBefore).equal(balAfter);
      });

      it("reverts when withdrawing too much", async () => {
        let overdraft = depositAmt.add(parseEther("1000"));
        await Fairydust.connect(minter).deposit(depositAmt);
        expect(Fairydust.connect(minter).withdraw(overdraft)).revertedWith("ERC20: transfer amount exceeds balance");
      });

      it("reverts when cdp is undercollateralized", async () => {
        await Fairydust.connect(minter).deposit(depositAmt);
        await Fairydust.connect(minter).mint(mintAmt);
        expect(Fairydust.connect(minter).withdraw(depositAmt)).revertedWith("Action blocked: unhealthy collateralization ratio");
      });
      
      it("deposits, mints, repays, and withdraws", async () => {
        let balBefore = await token.balanceOf(await minter.getAddress());
        await Fairydust.connect(minter).deposit(depositAmt);
        await Fairydust.connect(minter).mint(mintAmt);
        await Fairydust.connect(minter).repay(0, mintAmt);
        await Fairydust.connect(minter).withdraw(depositAmt);
        let balAfter = await token.balanceOf(await minter.getAddress());
        expect(balBefore).equal(balAfter);
      });

      it("deposits 5000 DAI, mints 1000 fUsd, and withdraws 3000 DAI", async () => {
        let withdrawAmt = depositAmt.sub(mintAmt.mul(2));
        await Fairydust.connect(minter).deposit(depositAmt);
        await Fairydust.connect(minter).mint(mintAmt);
        await Fairydust.connect(minter).withdraw(withdrawAmt);
        expect(await token.balanceOf(await minter.getAddress())).equal(
          parseEther("13000")
        );
      });

      describe("flushActivator", async () => {
        beforeEach(async () => {
          await token.connect(deployer).approve(Fairydust.address, parseEther("1"));
          await token.mint(await deployer.getAddress(), parseEther("1"));
          await token.mint(await minter.getAddress(), parseEther("100000"));
          await Fairydust.connect(deployer).deposit(parseEther("1"));
        });

        it("deposit() flushes funds if amount >= flushActivator", async () => {
          let balBeforeWhale = await token.balanceOf(adapter.address);
          await Fairydust.connect(minter).deposit(parseEther("100000"));
          let balAfterWhale = await token.balanceOf(adapter.address);
          expect(balBeforeWhale).equal(0);
          expect(balAfterWhale).equal(parseEther("100001"));
        });

        it("deposit() does not flush funds if amount < flushActivator", async () => {
          let balBeforeWhale = await token.balanceOf(adapter.address);
          await Fairydust.connect(minter).deposit(parseEther("99999"));
          let balAfterWhale = await token.balanceOf(adapter.address);
          expect(balBeforeWhale).equal(0);
          expect(balAfterWhale).equal(0);
        });

        it("withdraw() flushes funds if amount >= flushActivator", async () => {
          await Fairydust.connect(minter).deposit(parseEther("50000"));
          await Fairydust.connect(minter).deposit(parseEther("50000"));
          let balBeforeWhaleWithdraw = await token.balanceOf(adapter.address);
          await Fairydust.connect(minter).withdraw(parseEther("100000"));
          let balAfterWhaleWithdraw = await token.balanceOf(adapter.address);
          expect(balBeforeWhaleWithdraw).equal(0);
          expect(balAfterWhaleWithdraw).equal(parseEther("1"));
        });

        it("withdraw() does not flush funds if amount < flushActivator", async () => {
          await Fairydust.connect(minter).deposit(parseEther("50000"));
          await Fairydust.connect(minter).deposit(parseEther("50000"));
          let balBeforeWhaleWithdraw = await token.balanceOf(adapter.address);
          await Fairydust.connect(minter).withdraw(parseEther("99999"));
          let balAfterWhaleWithdraw = await token.balanceOf(adapter.address);
          expect(balBeforeWhaleWithdraw).equal(0);
          expect(balAfterWhaleWithdraw).equal(0);
        });
      })
    });

    describe("repay and liquidate tokens", () => {
      let depositAmt = parseEther("5000");
      let mintAmt = parseEther("1000");
      let ceilingAmt = parseEther("10000");
      let collateralizationLimit = "2000000000000000000"; // this should be set in the deploy sequence
      beforeEach(async () => {
        adapter = (await VaultAdapterMockFactory.connect(deployer).deploy(
          token.address
        )) as VaultAdapterMock;
        await Fairydust.connect(governance).initialize(adapter.address);
        await Fairydust
          .connect(governance)
          .setCollateralizationLimit(collateralizationLimit);
        await fUsd.connect(deployer).setWhitelist(Fairydust.address, true);
        await fUsd.connect(deployer).setCeiling(Fairydust.address, ceilingAmt);
        await token.mint(await minter.getAddress(), ceilingAmt);
        await token.connect(minter).approve(Fairydust.address, ceilingAmt);
        await fUsd.connect(minter).approve(Fairydust.address, parseEther("100000000"));
        await token.connect(minter).approve(transmuterContract.address, ceilingAmt);
        await fUsd.connect(minter).approve(transmuterContract.address, depositAmt);
      });
      it("repay with dai reverts when nothing is minted and transmuter has no fUsd deposits", async () => {
        await Fairydust.connect(minter).deposit(depositAmt.sub(parseEther("1000")))
        expect(Fairydust.connect(minter).repay(mintAmt, 0)).revertedWith("SafeMath: subtraction overflow")
      })
      it("liquidate max amount possible if trying to liquidate too much", async () => {
        let liqAmt = depositAmt;
        await Fairydust.connect(minter).deposit(depositAmt);
        await Fairydust.connect(minter).mint(mintAmt);
        await transmuterContract.connect(minter).stake(mintAmt);
        await Fairydust.connect(minter).liquidate(liqAmt);
        const transBal = await token.balanceOf(transmuterContract.address);
        expect(transBal).equal(mintAmt);
      })
      it("liquidates funds from vault if not enough in the buffer", async () => {
        let liqAmt = parseEther("600");
        await Fairydust.connect(minter).deposit(depositAmt);
        await Fairydust.connect(governance).flush();
        await Fairydust.connect(minter).deposit(mintAmt.div(2));
        await Fairydust.connect(minter).mint(mintAmt);
        await transmuterContract.connect(minter).stake(mintAmt);
        const FairydustTokenBalPre = await token.balanceOf(Fairydust.address);
        await Fairydust.connect(minter).liquidate(liqAmt);
        const FairydustTokenBalPost = await token.balanceOf(Fairydust.address);
        const transmuterEndingTokenBal = await token.balanceOf(transmuterContract.address);
        expect(FairydustTokenBalPost).equal(0);
        expect(transmuterEndingTokenBal).equal(liqAmt);
      })
      it("liquidates the minimum necessary from the Fairydust buffer", async () => {
        let dep2Amt = parseEther("500");
        let liqAmt = parseEther("200");
        await Fairydust.connect(minter).deposit(parseEther("2000"));
        await Fairydust.connect(governance).flush();
        await Fairydust.connect(minter).deposit(dep2Amt);
        await Fairydust.connect(minter).mint(parseEther("1000"));
        await transmuterContract.connect(minter).stake(parseEther("1000"));
        const FairydustTokenBalPre = await token.balanceOf(Fairydust.address);
        await Fairydust.connect(minter).liquidate(liqAmt);
        const FairydustTokenBalPost = await token.balanceOf(Fairydust.address);

        const transmuterEndingTokenBal = await token.balanceOf(transmuterContract.address);
        expect(FairydustTokenBalPost).equal(dep2Amt.sub(liqAmt));
        expect(transmuterEndingTokenBal).equal(liqAmt);
      })
      it("deposits, mints fUsd, repays, and has no outstanding debt", async () => {
        await Fairydust.connect(minter).deposit(depositAmt.sub(parseEther("1000")));
        await Fairydust.connect(minter).mint(mintAmt);
        await transmuterContract.connect(minter).stake(mintAmt);
        await Fairydust.connect(minter).repay(mintAmt, 0);
        expect(await Fairydust.connect(minter).getCdpTotalDebt(await minter.getAddress())).equal(0)
      })
      it("deposits, mints, repays, and has no outstanding debt", async () => {
        await Fairydust.connect(minter).deposit(depositAmt);
        await Fairydust.connect(minter).mint(mintAmt);
        await Fairydust.connect(minter).repay(0, mintAmt);
        expect(
          await Fairydust
            .connect(minter)
            .getCdpTotalDebt(await minter.getAddress())
        ).equal(0);
      });
      it("deposits, mints fUsd, repays with fUsd and DAI, and has no outstanding debt", async () => {
        await Fairydust.connect(minter).deposit(depositAmt.sub(parseEther("1000")));
        await Fairydust.connect(minter).mint(mintAmt);
        await transmuterContract.connect(minter).stake(parseEther("500"));
        await Fairydust.connect(minter).repay(parseEther("500"), parseEther("500"));
        expect(await Fairydust.connect(minter).getCdpTotalDebt(await minter.getAddress())).equal(0)
      })

      it("deposits and liquidates DAI", async () => {
        await Fairydust.connect(minter).deposit(depositAmt);
        await Fairydust.connect(minter).mint(mintAmt);
        await transmuterContract.connect(minter).stake(mintAmt);
        await Fairydust.connect(minter).liquidate(mintAmt);
        expect( await Fairydust.connect(minter).getCdpTotalDeposited(await minter.getAddress())).equal(depositAmt.sub(mintAmt))
      });
    });

    describe("mint", () => {
      let depositAmt = parseEther("5000");
      let mintAmt = parseEther("1000");
      let ceilingAmt = parseEther("1000");

      beforeEach(async () => {
        adapter = (await VaultAdapterMockFactory.connect(deployer).deploy(
          token.address
        )) as VaultAdapterMock;

        await Fairydust.connect(governance).initialize(adapter.address);

        await fUsd.connect(deployer).setCeiling(Fairydust.address, ceilingAmt);
        await token.mint(await minter.getAddress(), depositAmt);
        await token.connect(minter).approve(Fairydust.address, depositAmt);
      });

      it("reverts if the Fairydust is not whitelisted", async () => {
        await Fairydust.connect(minter).deposit(depositAmt);
        expect(Fairydust.connect(minter).mint(mintAmt)).revertedWith(
          "fUsd: Fairydust is not whitelisted"
        );
      });

      context("is whitelisted", () => {
        beforeEach(async () => {
          await fUsd.connect(deployer).setWhitelist(Fairydust.address, true);
        });

        it("reverts if the Fairydust is blacklisted", async () => {
        
          await fUsd.connect(deployer).setBlacklist(Fairydust.address);
          await Fairydust.connect(minter).deposit(depositAmt);
          expect(Fairydust.connect(minter).mint(mintAmt)).revertedWith(
            "fUsd: Fairydust is blacklisted"
          );
        });
  
        it("reverts when trying to mint too much", async () => {
          expect(Fairydust.connect(minter).mint(parseEther("2000"))).revertedWith(
            "Loan-to-value ratio breached"
          );
        });
  
        it("reverts if the ceiling was breached", async () => {
          let lowCeilingAmt = parseEther("100");
          await fUsd
            .connect(deployer)
            .setCeiling(Fairydust.address, lowCeilingAmt);
          await Fairydust.connect(minter).deposit(depositAmt);
          expect(Fairydust.connect(minter).mint(mintAmt)).revertedWith(
            "fUsd: Fairydust's ceiling was breached"
          );
        });
  
        it("mints successfully to depositor", async () => {
          let balBefore = await token.balanceOf(await minter.getAddress());
          await Fairydust.connect(minter).deposit(depositAmt);
          await Fairydust.connect(minter).mint(mintAmt);
          let balAfter = await token.balanceOf(await minter.getAddress());
  
          expect(balAfter).equal(balBefore.sub(depositAmt));
          expect(await fUsd.balanceOf(await minter.getAddress())).equal(mintAmt);
        });
  
        describe("flushActivator", async () => {
          beforeEach(async () => {
            await fUsd.connect(deployer).setCeiling(Fairydust.address, parseEther("200000"));
            await token.mint(await minter.getAddress(), parseEther("200000"));
            await token.connect(minter).approve(Fairydust.address, parseEther("200000"));
          });
  
          it("mint() flushes funds if amount >= flushActivator", async () => {
            await Fairydust.connect(minter).deposit(parseEther("50000"));
            await Fairydust.connect(minter).deposit(parseEther("50000"));
            await Fairydust.connect(minter).deposit(parseEther("50000"));
            await Fairydust.connect(minter).deposit(parseEther("50000"));
            let balBeforeWhale = await token.balanceOf(adapter.address);
            await Fairydust.connect(minter).mint(parseEther("100000"));
            let balAfterWhale = await token.balanceOf(adapter.address);
            expect(balBeforeWhale).equal(0);
            expect(balAfterWhale).equal(parseEther("200000"));
          });

          it("mint() does not flush funds if amount < flushActivator", async () => {
            await Fairydust.connect(minter).deposit(parseEther("50000"));
            await Fairydust.connect(minter).deposit(parseEther("50000"));
            await Fairydust.connect(minter).deposit(parseEther("50000"));
            await Fairydust.connect(minter).deposit(parseEther("50000"));
            let balBeforeWhale = await token.balanceOf(adapter.address);
            await Fairydust.connect(minter).mint(parseEther("99999"));
            let balAfterWhale = await token.balanceOf(adapter.address);
            expect(balBeforeWhale).equal(0);
            expect(balAfterWhale).equal(0);
          });
        });
      });
    });

    describe("harvest", () => {
      let depositAmt = parseEther("5000");
      let mintAmt = parseEther("1000");
      let stakeAmt = mintAmt.div(2);
      let ceilingAmt = parseEther("10000");
      let yieldAmt = parseEther("100");

      beforeEach(async () => {
        adapter = (await VaultAdapterMockFactory.connect(deployer).deploy(
          token.address
        )) as VaultAdapterMock;

        await fUsd.connect(deployer).setWhitelist(Fairydust.address, true);
        await Fairydust.connect(governance).initialize(adapter.address);
        await fUsd.connect(deployer).setCeiling(Fairydust.address, ceilingAmt);
        await token.mint(await user.getAddress(), depositAmt);
        await token.connect(user).approve(Fairydust.address, depositAmt);
        await fUsd.connect(user).approve(transmuterContract.address, depositAmt);
        await Fairydust.connect(user).deposit(depositAmt);
        await Fairydust.connect(user).mint(mintAmt);
        await transmuterContract.connect(user).stake(stakeAmt);
        await Fairydust.flush();
      });

      it("harvests yield from the vault", async () => {
        await token.mint(adapter.address, yieldAmt);
        await Fairydust.harvest(0);
        let transmuterBal = await token.balanceOf(transmuterContract.address);
        expect(transmuterBal).equal(yieldAmt.sub(yieldAmt.div(pctReso/harvestFee)));
        let vaultBal = await token.balanceOf(adapter.address);
        expect(vaultBal).equal(depositAmt);
      })

      it("sends the harvest fee to the rewards address", async () => {
        await token.mint(adapter.address, yieldAmt);
        await Fairydust.harvest(0);
        let rewardsBal = await token.balanceOf(await rewards.getAddress());
        expect(rewardsBal).equal(yieldAmt.mul(100).div(harvestFee));
      })

      it("does not update any balances if there is nothing to harvest", async () => {
        let initTransBal = await token.balanceOf(transmuterContract.address);
        let initRewardsBal = await token.balanceOf(await rewards.getAddress());
        await Fairydust.harvest(0);
        let endTransBal = await token.balanceOf(transmuterContract.address);
        let endRewardsBal = await token.balanceOf(await rewards.getAddress());
        expect(initTransBal).equal(endTransBal);
        expect(initRewardsBal).equal(endRewardsBal);
      })
    })
  });
});
