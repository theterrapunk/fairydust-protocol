import chai from "chai";
import chaiSubset from "chai-subset";
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";
import { BigNumber, BigNumberish, ContractFactory, Signer, utils } from "ethers";
import { Transmuter } from "../../types/Transmuter";
import { FairydustEth } from "../../types/FairydustEth";
import { StakingPools } from "../../types/StakingPools";
import { FdEth } from "../../types/FdEth";
import { Erc20Mock } from "../../types/Erc20Mock";
import { Weth9 } from "../../types/Weth9";
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
let FETHFactory: ContractFactory;
let ERC20MockFactory: ContractFactory;
let VaultAdapterMockFactory: ContractFactory;
let TransmuterFactory: ContractFactory;
let YearnVaultAdapterFactory: ContractFactory;
let YearnVaultMockFactory: ContractFactory;
let YearnControllerMockFactory: ContractFactory;
let Weth9Factory: ContractFactory;

describe("FairydustEth", () => {
  let signers: Signer[];

  before(async () => {
    FairydustFactory = await ethers.getContractFactory("FairydustEth");
    TransmuterFactory = await ethers.getContractFactory("Transmuter");
    FETHFactory = await ethers.getContractFactory("FdETH");
    ERC20MockFactory = await ethers.getContractFactory("ERC20Mock");
    VaultAdapterMockFactory = await ethers.getContractFactory(
      "VaultAdapterMock"
    );
    YearnVaultAdapterFactory = await ethers.getContractFactory("YearnVaultAdapter");
    YearnVaultMockFactory = await ethers.getContractFactory("YearnVaultMock");
    YearnControllerMockFactory = await ethers.getContractFactory("YearnControllerMock");
    Weth9Factory = await ethers.getContractFactory("WETH9");
  });

  beforeEach(async () => {
    signers = await ethers.getSigners();
  });

  describe("constructor", async () => {
    let deployer: Signer;
    let governance: Signer;
    let sentinel: Signer;
    let token: Weth9;
    let fEth: FdEth;
    let fairydust: FairydustEth;
    
    beforeEach(async () => {
      [deployer, governance, sentinel, ...signers] = signers;

      token = (await Weth9Factory.connect(deployer).deploy()) as Weth9;

      fEth = (await FETHFactory.connect(deployer).deploy()) as FdEth;
    });

    context("when governance is the zero address", () => {
      it("reverts", async () => {
        expect(
          FairydustFactory.connect(deployer).deploy(
            token.address,
            fEth.address,
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
    let token: Weth9;
    let fEth: FdEth;
    let fairydust: FairydustEth;


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

      token = (await Weth9Factory.connect(deployer).deploy()) as Weth9;

      fEth = (await FETHFactory.connect(deployer).deploy()) as FdEth;

      fairydust = (await FairydustFactory.connect(deployer).deploy(
        token.address,
        fEth.address,
        await governance.getAddress(),
        await sentinel.getAddress()
      )) as FairydustEth;

      await fairydust.connect(governance).setEmergencyExit(false);
    });

    describe("set governance", () => {
      context("when caller is not current governance", () => {
        beforeEach(() => (fairydust = fairydust.connect(deployer)));

        it("reverts", async () => {
          expect(
            fairydust.setPendingGovernance(await newGovernance.getAddress())
          ).revertedWith("Fairydust: only governance");
        });
      });

      context("when caller is current governance", () => {
        beforeEach(() => (fairydust = fairydust.connect(governance)));

        it("reverts when setting governance to zero address", async () => {
          expect(fairydust.setPendingGovernance(ZERO_ADDRESS)).revertedWith(
            "fairydust: governance address cannot be 0x0."
          );
        });

        it("updates rewards", async () => {
          await fairydust.setRewards(await rewards.getAddress());
          expect(await fairydust.rewards()).equal(await rewards.getAddress());
        });
      });
    });

    describe("set transmuter", () => {
      context("when caller is not current governance", () => {
        it("reverts", async () => {
          expect(
            fairydust.setTransmuter(await transmuter.getAddress())
          ).revertedWith("fairydust: only governance");
        });
      });

      context("when caller is current governance", () => {
        beforeEach(() => (fairydust = fairydust.connect(governance)));

        it("reverts when setting transmuter to zero address", async () => {
          expect(fairydust.setTransmuter(ZERO_ADDRESS)).revertedWith(
            "fairydust: transmuter address cannot be 0x0."
          );
        });

        it("updates transmuter", async () => {
          await fairydust.setTransmuter(await transmuter.getAddress());
          expect(await fairydust.transmuter()).equal(
            await transmuter.getAddress()
          );
        });
      });
    });

    describe("set rewards", () => {
      context("when caller is not current governance", () => {
        beforeEach(() => (fairydust = fairydust.connect(deployer)));

        it("reverts", async () => {
          expect(fairydust.setRewards(await rewards.getAddress())).revertedWith(
            "fairydust: only governance"
          );
        });
      });

      context("when caller is current governance", () => {
        beforeEach(() => (fairydust = fairydust.connect(governance)));

        it("reverts when setting rewards to zero address", async () => {
          expect(fairydust.setRewards(ZERO_ADDRESS)).revertedWith(
            "fairydust: rewards address cannot be 0x0."
          );
        });

        it("updates rewards", async () => {
          await fairydust.setRewards(await rewards.getAddress());
          expect(await fairydust.rewards()).equal(await rewards.getAddress());
        });
      });
    });

    describe("set peformance fee", () => {
      context("when caller is not current governance", () => {
        beforeEach(() => (fairydust = fairydust.connect(deployer)));

        it("reverts", async () => {
          expect(fairydust.setHarvestFee(1)).revertedWith(
            "fairydust: only governance"
          );
        });
      });

      context("when caller is current governance", () => {
        beforeEach(() => (fairydust = fairydust.connect(governance)));

        it("reverts when performance fee greater than maximum", async () => {
          const MAXIMUM_VALUE = await fairydust.PERCENT_RESOLUTION();
          expect(fairydust.setHarvestFee(MAXIMUM_VALUE.add(1))).revertedWith(
            "fairydust: harvest fee above maximum"
          );
        });

        it("updates performance fee", async () => {
          await fairydust.setHarvestFee(1);
          expect(await fairydust.harvestFee()).equal(1);
        });
      });
    });

    describe("set collateralization limit", () => {
      context("when caller is not current governance", () => {
        beforeEach(() => (fairydust = fairydust.connect(deployer)));

        it("reverts", async () => {
          const collateralizationLimit = await fairydust.MINIMUM_COLLATERALIZATION_LIMIT();
          expect(
            fairydust.setCollateralizationLimit(collateralizationLimit)
          ).revertedWith("fairydust: only governance");
        });
      });

      context("when caller is current governance", () => {
        beforeEach(() => (fairydust = fairydust.connect(governance)));

        it("reverts when performance fee less than minimum", async () => {
          const MINIMUM_LIMIT = await fairydust.MINIMUM_COLLATERALIZATION_LIMIT();
          expect(
            fairydust.setCollateralizationLimit(MINIMUM_LIMIT.sub(1))
          ).revertedWith("fairydust: collateralization limit below minimum.");
        });

        it("reverts when performance fee greater than maximum", async () => {
          const MAXIMUM_LIMIT = await fairydust.MAXIMUM_COLLATERALIZATION_LIMIT();
          expect(
            fairydust.setCollateralizationLimit(MAXIMUM_LIMIT.add(1))
          ).revertedWith("fairydust: collateralization limit above maximum");
        });

        it("updates collateralization limit", async () => {
          const collateralizationLimit = await fairydust.MINIMUM_COLLATERALIZATION_LIMIT();
          await fairydust.setCollateralizationLimit(collateralizationLimit);
          expect(await fairydust.collateralizationLimit()).containSubset([
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
    let token: Weth9;
    let fEth: FdEth;
    let fairydust: FairydustEth;
    let adapter: VaultAdapterMock;
    let newAdapter: VaultAdapterMock;
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

      token = (await Weth9Factory.connect(deployer).deploy()) as Weth9;

      fEth = (await FETHFactory.connect(deployer).deploy()) as FdEth;

      fairydust = (await FairydustFactory.connect(deployer).deploy(
        token.address,
        fEth.address,
        await governance.getAddress(),
        await sentinel.getAddress()
      )) as FairydustEth;

      await fairydust
        .connect(governance)
        .setTransmuter(await transmuter.getAddress());
      await fairydust
        .connect(governance)
        .setRewards(await rewards.getAddress());
      await fairydust.connect(governance).setHarvestFee(harvestFee);
      transmuterContract = (await TransmuterFactory.connect(deployer).deploy(
        fEth.address,
        token.address,
        await governance.getAddress()
      )) as Transmuter;
      await fairydust.connect(governance).setTransmuter(transmuterContract.address);
      await transmuterContract.connect(governance).setWhitelist(fairydust.address, true);
      await token.connect(minter).deposit({value: parseEther("10000")});
      await token.connect(minter).approve(fairydust.address, parseEther("10000"));
    });

    describe("migrate", () => {
      beforeEach(async () => {
        adapter = (await VaultAdapterMockFactory.connect(deployer).deploy(
          token.address
        )) as VaultAdapterMock;

        newAdapter = (await VaultAdapterMockFactory.connect(deployer).deploy(
          token.address
        )) as VaultAdapterMock;

        await fairydust.connect(governance).initialize(adapter.address);
      });

      context("when caller is not current governance", () => {
        beforeEach(() => (fairydust = fairydust.connect(deployer)));

        it("reverts", async () => {
          expect(fairydust.migrate(newAdapter.address)).revertedWith(
            "fairydust: only governance"
          );
        });
      });

      context("when caller is current governance", () => {
        beforeEach(() => (fairydust = fairydust.connect(governance)));

        context("when adapter is zero address", async () => {
          it("reverts", async () => {
            expect(fairydust.migrate(ZERO_ADDRESS)).revertedWith(
              "fairydust: active vault address cannot be 0x0."
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
            expect(fairydust.migrate(invalidAdapter.address)).revertedWith(
              "fairydust: token mismatch"
            );
          });
        });

        context("when conditions are met", () => {
          beforeEach(async () => {
            await fairydust.migrate(newAdapter.address);
          });

          it("increments the vault count", async () => {
            expect(await fairydust.vaultCount()).equal(2);
          });

          it("sets the vaults adapter", async () => {
            expect(await fairydust.getVaultAdapter(0)).equal(adapter.address);
          });

          it("sets the vaults adapter", async () => {
            expect(await fairydust.getVaultAdapter(1)).equal(newAdapter.address);
          });
        });

        context("when adaptor is already defined in another vault", () => {
          it("reverts", async () => {
            expect(fairydust.migrate(adapter.address)).revertedWith('Adapter already in use');
          });
        });
      });

      context("on successful deployment", () => {
        it("fairydust is paused", async () => {
          expect(fairydust.connect(deployer).deposit(parseEther("1"), true, {value: parseEther("1")})).revertedWith("emergency pause enabled");
        })
      })
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
          await fairydust.connect(governance).setEmergencyExit(false);
          await fairydust.connect(governance).setKeepers([await deployer.getAddress()], [true])
          controllerMock = await YearnControllerMockFactory
            .connect(deployer)
            .deploy() as YearnControllerMock;
          vaultMock = await YearnVaultMockFactory
            .connect(deployer)
            .deploy(token.address, controllerMock.address) as YearnVaultMock;
          adapter = await YearnVaultAdapterFactory
            .connect(deployer)
            .deploy(vaultMock.address, fairydust.address) as YearnVaultAdapter;
          await token.connect(deployer).deposit({value: parseEther("10000")});
          await token.approve(vaultMock.address, parseEther("10000"));
          await fairydust.connect(governance).initialize(adapter.address)
          await fairydust.connect(minter).deposit(depositAmt, false);
          await fairydust.connect(deployer).flush();
          // need at least one other deposit in the vault to not get underflow errors
          await vaultMock.connect(deployer).deposit(parseEther("100"));
        });

        it("reverts when not an emergency, not governance, and user does not have permission to recall funds from active vault", async () => {
          expect(fairydust.connect(minter).recall(0, 0))
            .revertedWith("fairydust: not an emergency, not governance, and user does not have permission to recall funds from active vault")
        });

        it("governance can recall some of the funds", async () => {
          let beforeBal = await token.connect(governance).balanceOf(fairydust.address);
          await fairydust.connect(governance).recall(0, recallAmt);
          let afterBal = await token.connect(governance).balanceOf(fairydust.address);
          expect(beforeBal).equal(0);
          expect(afterBal).equal(recallAmt);
        });

        it("governance can recall all of the funds", async () => {
          await fairydust.connect(governance).recallAll(0);
          expect(await token.connect(governance).balanceOf(fairydust.address)).equal(depositAmt);
        });

        describe("in an emergency", async () => {
          it("anyone can recall funds", async () => {
            await fairydust.connect(governance).setEmergencyExit(true);
            await fairydust.connect(minter).recallAll(0);
            expect(await token.connect(governance).balanceOf(fairydust.address)).equal(depositAmt);
          });

          it("after some usage", async () => {
            await fairydust.connect(minter).deposit(mintAmt, false);
            await fairydust.connect(deployer).flush();
            let yieldAmt = parseEther("500")
            await token.connect(deployer).deposit({value: yieldAmt});
            await token.connect(deployer).transfer(adapter.address, yieldAmt);
            await fairydust.connect(governance).setEmergencyExit(true);
            await fairydust.connect(minter).recallAll(0);
            expect(await token.connect(governance).balanceOf(fairydust.address)).equal(depositAmt.add(mintAmt));
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
          await fairydust.connect(governance).setEmergencyExit(false);
          await fairydust.connect(governance).setKeepers([await deployer.getAddress()], [true])
          await fairydust.connect(governance).initialize(inactiveAdapter.address);
          await token.connect(minter).deposit({value: depositAmt});
          await token.connect(minter).approve(fairydust.address, depositAmt);
          await fairydust.connect(minter).deposit(depositAmt, false);
          await fairydust.connect(deployer).flush();
          await fairydust.connect(governance).migrate(activeAdapter.address);
        });

        it("anyone can recall some of the funds to the contract", async () => {
          await fairydust.connect(minter).recall(0, recallAmt);
          expect(await token.balanceOf(fairydust.address)).equal(recallAmt);
        });

        it("anyone can recall all of the funds to the contract", async () => {
          await fairydust.connect(minter).recallAll(0);
          expect(await token.balanceOf(fairydust.address)).equal(depositAmt);
        });

        describe("in an emergency", async () => {
          it("anyone can recall funds", async () => {
            await fairydust.connect(governance).setEmergencyExit(true);
            await fairydust.connect(minter).recallAll(0);
            expect(await token.connect(governance).balanceOf(fairydust.address)).equal(depositAmt);
          });
        })
      });
    });

    describe("flush funds", () => {
      let adapter: VaultAdapterMock;

      context("when the fairydust is not initialized", () => {
        it("reverts", async () => {
          expect(fairydust.connect(deployer).flush()).revertedWith("fairydust: not initialized.");
        });
      });

      context("when there is at least one vault to flush to", () => {
        context("when there is one vault", () => {
          let adapter: VaultAdapterMock;
          let mintAmount = parseEther("5000");

          beforeEach(async () => {
            await fairydust.connect(governance).setEmergencyExit(false);
            await fairydust.connect(governance).setKeepers([await deployer.getAddress()], [true])
            adapter = (await VaultAdapterMockFactory.connect(deployer).deploy(
              token.address
            )) as VaultAdapterMock;
          });

          beforeEach(async () => {
            await token.connect(deployer).deposit({value: mintAmount});
            await token.connect(deployer).transfer(fairydust.address, mintAmount);

            await fairydust.connect(governance).initialize(adapter.address);

            await fairydust.connect(deployer).flush();
          });

          it("flushes funds to the vault", async () => {
            expect(await token.balanceOf(adapter.address)).equal(mintAmount);
          });

          it("reverts if the caller is not whitelisted", async () => {
            expect(fairydust.connect(minter).flush()).revertedWith("fairydust: only keepers.")
          })
        });

        context("when there are multiple vaults", () => {
          let inactiveAdapter: VaultAdapterMock;
          let activeAdapter: VaultAdapterMock;
          let mintAmount = parseEther("5");

          beforeEach(async () => {
            await fairydust.connect(governance).setEmergencyExit(false);
            await fairydust.connect(governance).setKeepers([await deployer.getAddress()], [true])
            inactiveAdapter = (await VaultAdapterMockFactory.connect(
              deployer
            ).deploy(token.address)) as VaultAdapterMock;

            activeAdapter = (await VaultAdapterMockFactory.connect(
              deployer
            ).deploy(token.address)) as VaultAdapterMock;

            await token.connect(deployer).deposit({value: mintAmount});
            await token.connect(deployer).transfer(fairydust.address, mintAmount);

            await fairydust
              .connect(governance)
              .initialize(inactiveAdapter.address);

            await fairydust.connect(governance).migrate(activeAdapter.address);

            await fairydust.connect(deployer).flush();
          });

          it("flushes funds to the active vault", async () => {
            expect(await token.balanceOf(activeAdapter.address)).equal(mintAmount);
          });
        });
      });
    });

    describe("deposit and withdraw tokens", () => {
        let depositAmt = parseEther("5000");
        let mintAmt = parseEther("1000");
        let ceilingAmt = parseEther("10000");
        let collateralizationLimit = "2000000000000000000"; // this should be set in the deploy sequence
        let epsilon = parseEther(".1") // margin of difference for gas

        describe("WETH", () => {
            beforeEach(async () => {
                await fairydust.connect(governance).setEmergencyExit(false);
                await fairydust.connect(governance).setKeepers([await deployer.getAddress()], [true])
                adapter = (await VaultAdapterMockFactory.connect(deployer).deploy(
                token.address
                )) as VaultAdapterMock;
                await fairydust.connect(governance).initialize(adapter.address);
                await fairydust
                .connect(governance)
                .setCollateralizationLimit(collateralizationLimit);
                await fEth.connect(deployer).setWhitelist(fairydust.address, true);
                await fEth.connect(deployer).setCeiling(fairydust.address, ceilingAmt);
                await token.connect(minter).deposit({value: depositAmt});
                await token.connect(minter).approve(fairydust.address, parseEther("100000000"));
                await fEth.connect(minter).approve(fairydust.address, parseEther("100000000"));
            });

            it("deposited amount is accounted for correctly", async () => {
                // let address = await deployer.getAddress();
                await fairydust.connect(minter).deposit(depositAmt, false);
                expect(
                await fairydust
                    .connect(minter)
                    .getCdpTotalDeposited(await minter.getAddress())
                ).equal(depositAmt);
            });
        
            it("deposits token and then withdraws all", async () => {
                let balBefore = await token.balanceOf(await minter.getAddress());
                await fairydust.connect(minter).deposit(depositAmt, false);
                await fairydust.connect(minter).withdraw(depositAmt, false);
                let balAfter = await token.balanceOf(await minter.getAddress());
                expect(balBefore).equal(balAfter);
            });

            it("reverts if ETH is sent with the deposit() call", async () => {
              expect(fairydust.connect(minter).deposit(depositAmt, false, {value: depositAmt})).revertedWith("msg.value != 0");
            });
        
            it("reverts when withdrawing too much", async () => {
                let overdraft = depositAmt.add(parseEther("1000"));
                await fairydust.connect(minter).deposit(depositAmt, false);
                expect(fairydust.connect(minter).withdraw(overdraft, false)).revertedWith("SafeERC20: low-level call failed");
            });
        
            it("reverts when cdp is undercollateralized", async () => {
                await fairydust.connect(minter).deposit(depositAmt, false);
                await fairydust.connect(minter).mint(mintAmt);
                expect(fairydust.connect(minter).withdraw(depositAmt, false)).revertedWith("Action blocked: unhealthy collateralization ratio");
            });

            it("reverts if ETH is sent when repaying with WETH", async () => {
              await fairydust.connect(minter).deposit(depositAmt, false);
              await fairydust.connect(minter).mint(mintAmt);
              expect(fairydust.connect(minter).repay(0, mintAmt, false, {value: mintAmt})).revertedWith("blackhole ETH");
            });
            
            it("deposits, mints, repays, and withdraws", async () => {
                let balBefore = await token.balanceOf(await minter.getAddress());
                await fairydust.connect(minter).deposit(depositAmt, false);
                await fairydust.connect(minter).mint(mintAmt);
                await fairydust.connect(minter).repay(0, mintAmt, false);
                await fairydust.connect(minter).withdraw(depositAmt, false);
                let balAfter = await token.balanceOf(await minter.getAddress());
                expect(balBefore).equal(balAfter);
            });
        
            it("deposits 5000 DAI, mints 1000 alUSD, and withdraws 3000 DAI", async () => {
                let withdrawAmt = depositAmt.sub(mintAmt.mul(2));
                await fairydust.connect(minter).deposit(depositAmt, false);
                await fairydust.connect(minter).mint(mintAmt);
                await fairydust.connect(minter).withdraw(withdrawAmt, false);
                expect(await token.balanceOf(await minter.getAddress())).equal(
                parseEther("13000")
                );
            });

            it("withdraws funds from the vault if needed", async () => {
                let withdrawAmt = depositAmt.sub(mintAmt.mul(2));
                await fairydust.connect(minter).deposit(depositAmt, false);
                await fairydust.connect(deployer).flush();
                await fairydust.connect(minter).mint(mintAmt);
                await fairydust.connect(minter).withdraw(withdrawAmt, false);
                expect(await token.balanceOf(await minter.getAddress())).equal(
                parseEther("13000")
                );
            });
        
            describe("flushActivator", async () => {
                beforeEach(async () => {
                    await fairydust.connect(governance).setFlushActivator(parseEther("1000"));
                    await token.connect(deployer).approve(fairydust.address, parseEther("1"));
                    await token.connect(deployer).deposit({value: parseEther("1")});
                    await token.connect(minter).deposit({value: parseEther("1000")});
                    await fairydust.connect(deployer).deposit(parseEther("1"), false);
                });
          
                it("deposit() flushes funds if amount >= flushActivator", async () => {
                    let balBeforeWhale = await token.balanceOf(adapter.address);
                    await fairydust.connect(minter).deposit(parseEther("1000"), false);
                    let balAfterWhale = await token.balanceOf(adapter.address);
                    expect(balBeforeWhale).equal(0);
                    expect(balAfterWhale).equal(parseEther("1001"));
                });
          
                it("deposit() does not flush funds if amount < flushActivator", async () => {
                    let balBeforeWhale = await token.balanceOf(adapter.address);
                    await fairydust.connect(minter).deposit(parseEther("999"), false);
                    let balAfterWhale = await token.balanceOf(adapter.address);
                    expect(balBeforeWhale).equal(0);
                    expect(balAfterWhale).equal(0);
                });
            })
        })

        describe("ETH", () => {
            beforeEach(async () => {
                await fairydust.connect(governance).setEmergencyExit(false);
                await fairydust.connect(governance).setKeepers([await deployer.getAddress()], [true])
                adapter = (await VaultAdapterMockFactory.connect(deployer).deploy(
                    token.address
                )) as VaultAdapterMock;
                await fairydust.connect(governance).initialize(adapter.address);
                await fairydust
                    .connect(governance)
                    .setCollateralizationLimit(collateralizationLimit);
                await fEth.connect(deployer).setWhitelist(fairydust.address, true);
                await fEth.connect(deployer).setCeiling(fairydust.address, ceilingAmt);
                await fEth.connect(minter).approve(fairydust.address, parseEther("100000000"));
            });
        
            it("deposited amount is accounted for correctly", async () => {
                await fairydust.connect(minter).deposit(depositAmt, true, {value: depositAmt});
                expect(
                    await fairydust
                    .connect(minter)
                    .getCdpTotalDeposited(await minter.getAddress())
                ).equal(depositAmt);
            });
        
            it("deposits token and then withdraws all", async () => {
                let balBefore = await minter.getBalance();
                await fairydust.connect(minter).deposit(depositAmt, true, {value: depositAmt});
                await fairydust.connect(minter).withdraw(depositAmt, true);
                let balAfter = await minter.getBalance();
                expect(balBefore.sub(balAfter)).lt(epsilon);
            });
        
            it("reverts when withdrawing too much", async () => {
                let overdraft = depositAmt.add(parseEther("1000"));
                await fairydust.connect(minter).deposit(depositAmt, true, {value: depositAmt});
                expect(fairydust.connect(minter).withdraw(overdraft, true)).revertedWith("SafeERC20: low-level call failed");
            });
        
            it("reverts when cdp is undercollateralized", async () => {
                await fairydust.connect(minter).deposit(depositAmt, true, {value: depositAmt});
                await fairydust.connect(minter).mint(mintAmt);
                expect(fairydust.connect(minter).withdraw(depositAmt, true)).revertedWith("Action blocked: unhealthy collateralization ratio");
            });

            it("reverts if ETH is sent when repaying with 0 ETH", async () => {
              await fairydust.connect(minter).deposit(depositAmt, false);
              await fairydust.connect(minter).mint(mintAmt);
              expect(fairydust.connect(minter).repay(0, mintAmt, true, {value: mintAmt})).revertedWith("blackhole ETH");
            });
                
            it("deposits, mints, repays, and withdraws", async () => {
                let balBefore = await minter.getBalance();
                await fairydust.connect(minter).deposit(depositAmt, true, {value: depositAmt});
                await fairydust.connect(minter).mint(mintAmt);
                await fairydust.connect(minter).repay(0, mintAmt, true, {value: 0});
                await fairydust.connect(minter).withdraw(depositAmt, true);
                let balAfter = await minter.getBalance();
                expect(balBefore.sub(balAfter)).lt(epsilon);
            });
        
            it("deposits 5000 DAI, mints 1000 alUSD, and withdraws 3000 DAI", async () => {
                let withdrawAmt = depositAmt.sub(mintAmt.mul(2));
                let balBefore = await minter.getBalance();
                await fairydust.connect(minter).deposit(depositAmt, true, {value: depositAmt});
                let balAfterDeposit = await minter.getBalance();
                await fairydust.connect(minter).mint(mintAmt);
                await fairydust.connect(minter).withdraw(withdrawAmt, true);
                let balAfterWithdrawl = await minter.getBalance();
                let amtWithdrawn = balAfterDeposit.sub(balAfterWithdrawl)
                expect(amtWithdrawn.sub(parseEther("3000"))).lt(epsilon);
            });

            it("withdraws funds from the vault if needed", async () => {
              let withdrawAmt = depositAmt.sub(mintAmt.mul(2));
              await fairydust.connect(minter).deposit(depositAmt, true, {value: depositAmt});
              await fairydust.connect(deployer).flush();
              let balAfterDeposit = await minter.getBalance();
              await fairydust.connect(minter).mint(mintAmt);
              await fairydust.connect(minter).withdraw(withdrawAmt, true);
              let balAfterWithdrawl = await minter.getBalance();
              let amtWithdrawn = balAfterDeposit.sub(balAfterWithdrawl)
              expect(amtWithdrawn.sub(parseEther("3000"))).lt(epsilon);
            });
        
            describe("flushActivator", async () => {
                beforeEach(async () => {
                    await fairydust.connect(governance).setFlushActivator(parseEther("1000"));
                    await token.connect(deployer).approve(fairydust.address, parseEther("1"));
                    await token.connect(deployer).deposit({value: parseEther("1")});
                    await token.connect(minter).deposit({value: parseEther("1000")});
                    await fairydust.connect(deployer).deposit(parseEther("1"), true, {value: parseEther("1")});
                });
        
                it("depositEth() flushes funds if amount >= flushActivator", async () => {
                    let balBeforeWhale = await token.balanceOf(adapter.address);
                    let alchBalBefore = await token.balanceOf(fairydust.address);
                    await fairydust.connect(minter).deposit(parseEther("1000"), true, {value: parseEther("1000")});
                    let balAfterWhale = await token.balanceOf(adapter.address);
                    let alchBalAfter = await token.balanceOf(fairydust.address);
                    expect(balBeforeWhale).equal(0);
                    expect(balAfterWhale).equal(parseEther("1001"));
                });
        
                it("depositEth() does not flush funds if amount < flushActivator", async () => {
                    let balBeforeWhale = await token.balanceOf(adapter.address);
                    await fairydust.connect(minter).deposit(parseEther("999"), true, {value: parseEther("999")});
                    let balAfterWhale = await token.balanceOf(adapter.address);
                    expect(balBeforeWhale).equal(0);
                    expect(balAfterWhale).equal(0);
                });
            })
        })
    });

    describe("repay and liquidate tokens", () => {
      let depositAmt = parseEther("5000");
      let mintAmt = parseEther("1000");
      let ceilingAmt = parseEther("10000");
      let collateralizationLimit = "2000000000000000000"; // this should be set in the deploy sequence

      describe("WETH", () => {
        beforeEach(async () => {
          await fairydust.connect(governance).setEmergencyExit(false);
          await fairydust.connect(governance).setKeepers([await deployer.getAddress()], [true])
          adapter = (await VaultAdapterMockFactory.connect(deployer).deploy(
            token.address
          )) as VaultAdapterMock;
          await fairydust.connect(governance).initialize(adapter.address);
          await fairydust
            .connect(governance)
            .setCollateralizationLimit(collateralizationLimit);
          await fEth.connect(deployer).setWhitelist(fairydust.address, true);
          await fEth.connect(deployer).setCeiling(fairydust.address, ceilingAmt);
          await token.connect(minter).deposit({value: ceilingAmt});
          await token.connect(minter).approve(fairydust.address, ceilingAmt);
          await fEth.connect(minter).approve(fairydust.address, parseEther("100000000"));
          await token.connect(minter).approve(transmuterContract.address, ceilingAmt);
          await fEth.connect(minter).approve(transmuterContract.address, depositAmt);
        });
        it("repay with dai reverts when repayment amount is greater than debt", async () => {
          await fairydust.connect(minter).deposit(depositAmt.sub(parseEther("1000")), false)
          expect(fairydust.connect(minter).repay(mintAmt, 0, false)).revertedWith("SafeMath: subtraction overflow")
        })
        it("liquidate max amount possible if trying to liquidate too much", async () => {
          let liqAmt = depositAmt;
          await fairydust.connect(minter).deposit(depositAmt, false);
          await fairydust.connect(minter).mint(mintAmt);
          await transmuterContract.connect(minter).stake(mintAmt);
          await fairydust.connect(minter).liquidate(liqAmt);
          const transBal = await token.balanceOf(transmuterContract.address);
          expect(transBal).equal(mintAmt);
        })
        it("liquidates funds from vault if not enough in the buffer", async () => {
          let liqAmt = parseEther("600");
          await fairydust.connect(minter).deposit(depositAmt, false);
          await fairydust.connect(deployer).flush();
          await fairydust.connect(minter).deposit(mintAmt.div(2), false);
          await fairydust.connect(minter).mint(mintAmt);
          await transmuterContract.connect(minter).stake(mintAmt);
          const fairydustTokenBalPre = await token.balanceOf(fairydust.address);
          await fairydust.connect(minter).liquidate(liqAmt);
          const fairydustTokenBalPost = await token.balanceOf(fairydust.address);
          const transmuterEndingTokenBal = await token.balanceOf(transmuterContract.address);
          expect(fairydustTokenBalPost).equal(0);
          expect(transmuterEndingTokenBal).equal(liqAmt);
        })
        it("liquidates the minimum necessary from the fairydust buffer", async () => {
          let dep2Amt = parseEther("50");
          let liqAmt = parseEther("20");
          await fairydust.connect(minter).deposit(parseEther("200"), false);
          await fairydust.connect(deployer).flush();
          await fairydust.connect(minter).deposit(dep2Amt, false);
          await fairydust.connect(minter).mint(parseEther("100"));
          await transmuterContract.connect(minter).stake(parseEther("100"));
          let fairydustTokenBalPre = await token.balanceOf(fairydust.address);
          await fairydust.connect(minter).liquidate(liqAmt);
          let fairydustTokenBalPost = await token.balanceOf(fairydust.address);
          let transmuterEndingTokenBal = await token.balanceOf(transmuterContract.address);
          expect(fairydustTokenBalPre).equal(dep2Amt);
          expect(fairydustTokenBalPost).equal(dep2Amt.sub(liqAmt));
          expect(transmuterEndingTokenBal).equal(liqAmt);
        })
        it("deposits, mints fEth, repays, and has no outstanding debt", async () => {
          await fairydust.connect(minter).deposit(depositAmt.sub(parseEther("1000")), false);
          await fairydust.connect(minter).mint(mintAmt);
          await transmuterContract.connect(minter).stake(mintAmt);
          await fairydust.connect(minter).repay(mintAmt, 0, false);
          expect(await fairydust.connect(minter).getCdpTotalDebt(await minter.getAddress())).equal(0)
        })
        it("deposits, mints, repays, and has no outstanding debt", async () => {
          await fairydust.connect(minter).deposit(depositAmt, false);
          await fairydust.connect(minter).mint(mintAmt);
          await fairydust.connect(minter).repay(0, mintAmt, false);
          expect(
            await fairydust
              .connect(minter)
              .getCdpTotalDebt(await minter.getAddress())
          ).equal(0);
        });
        it("deposits, mints fEth, repays with fEth and DAI, and has no outstanding debt", async () => {
          await fairydust.connect(minter).deposit(depositAmt.sub(parseEther("1000")), false);
          await fairydust.connect(minter).mint(mintAmt);
          await transmuterContract.connect(minter).stake(parseEther("500"));
          await fairydust.connect(minter).repay(parseEther("500"), parseEther("500"), false);
          expect(await fairydust.connect(minter).getCdpTotalDebt(await minter.getAddress())).equal(0)
        })
  
        it("deposits and liquidates DAI", async () => {
          await fairydust.connect(minter).deposit(depositAmt, false);
          await fairydust.connect(minter).mint(mintAmt);
          await transmuterContract.connect(minter).stake(mintAmt);
          await fairydust.connect(minter).liquidate(mintAmt);
          expect( await fairydust.connect(minter).getCdpTotalDeposited(await minter.getAddress())).equal(depositAmt.sub(mintAmt))
        });
      })

      describe("ETH", () => {
        beforeEach(async () => {
          await fairydust.connect(governance).setEmergencyExit(false);
          await fairydust.connect(governance).setKeepers([await deployer.getAddress()], [true])
          adapter = (await VaultAdapterMockFactory.connect(deployer).deploy(
            token.address
          )) as VaultAdapterMock;
          await fairydust.connect(governance).initialize(adapter.address);
          await fairydust
            .connect(governance)
            .setCollateralizationLimit(collateralizationLimit);
          await fEth.connect(deployer).setWhitelist(fairydust.address, true);
          await fEth.connect(deployer).setCeiling(fairydust.address, ceilingAmt);
          await fEth.connect(minter).approve(fairydust.address, parseEther("100000000"));
          await fEth.connect(minter).approve(transmuterContract.address, depositAmt);
        });
        it("repay with dai reverts when repayment amount is greater than debt", async () => {
          await fairydust.connect(minter).deposit(depositAmt.sub(parseEther("1000")), true, {value: depositAmt.sub(parseEther("1000"))})
          expect(fairydust.connect(minter).repay(mintAmt, 0, true, {value: mintAmt})).revertedWith("SafeMath: subtraction overflow")
        })
        it("liquidate max amount possible if trying to liquidate too much", async () => {
          let liqAmt = depositAmt;
          await fairydust.connect(minter).deposit(depositAmt, true, {value: depositAmt});
          await fairydust.connect(minter).mint(mintAmt);
          await transmuterContract.connect(minter).stake(mintAmt);
          await fairydust.connect(minter).liquidate(liqAmt);
          const transBal = await token.balanceOf(transmuterContract.address);
          expect(transBal).equal(mintAmt);
        })
        it("liquidates funds from vault if not enough in the buffer", async () => {
          let liqAmt = parseEther("600");
          await fairydust.connect(minter).deposit(depositAmt, true, {value: depositAmt});
          await fairydust.connect(deployer).flush();
          await fairydust.connect(minter).deposit(mintAmt.div(2), true, {value: mintAmt.div(2)});
          await fairydust.connect(minter).mint(mintAmt);
          await transmuterContract.connect(minter).stake(mintAmt);
          const fairydustTokenBalPre = await token.balanceOf(fairydust.address);
          await fairydust.connect(minter).liquidate(liqAmt);
          const fairydustTokenBalPost = await token.balanceOf(fairydust.address);
          const transmuterEndingTokenBal = await token.balanceOf(transmuterContract.address);
          expect(fairydustTokenBalPost).equal(0);
          expect(transmuterEndingTokenBal).equal(liqAmt);
        })
        it("liquidates the minimum necessary from the fairydust buffer", async () => {
          let dep2Amt = parseEther("50");
          let liqAmt = parseEther("20");
          await fairydust.connect(minter).deposit(parseEther("200"), true, {value: parseEther("200")});
          await fairydust.connect(deployer).flush();
          await fairydust.connect(minter).deposit(dep2Amt, true, {value: dep2Amt});
          await fairydust.connect(minter).mint(parseEther("100"));
          await transmuterContract.connect(minter).stake(parseEther("100"));
          let fairydustTokenBalPre = await token.balanceOf(fairydust.address);
          await fairydust.connect(minter).liquidate(liqAmt);
          let fairydustTokenBalPost = await token.balanceOf(fairydust.address);
          let transmuterEndingTokenBal = await token.balanceOf(transmuterContract.address);
          expect(fairydustTokenBalPre).equal(dep2Amt);
          expect(fairydustTokenBalPost).equal(dep2Amt.sub(liqAmt));
          expect(transmuterEndingTokenBal).equal(liqAmt);
        })
        it("deposits, mints fEth, repays, and has no outstanding debt", async () => {
          await fairydust.connect(minter).deposit(depositAmt.sub(parseEther("1000")), true, {value: depositAmt.sub(parseEther("1000"))});
          await fairydust.connect(minter).mint(mintAmt);
          await transmuterContract.connect(minter).stake(mintAmt);
          await fairydust.connect(minter).repay(mintAmt, 0, true, {value: mintAmt});
          expect(await fairydust.connect(minter).getCdpTotalDebt(await minter.getAddress())).equal(0)
        })
        it("deposits, mints, repays, and has no outstanding debt", async () => {
          await fairydust.connect(minter).deposit(depositAmt, true, {value: depositAmt});
          await fairydust.connect(minter).mint(mintAmt);
          await fairydust.connect(minter).repay(0, mintAmt, true, {value: 0});
          expect(
            await fairydust
              .connect(minter)
              .getCdpTotalDebt(await minter.getAddress())
          ).equal(0);
        });
        it("deposits, mints fEth, repays with fEth and ETH, and has no outstanding debt", async () => {
          await fairydust.connect(minter).deposit(depositAmt.sub(parseEther("1000")), false);
          await fairydust.connect(minter).mint(mintAmt);
          await transmuterContract.connect(minter).stake(parseEther("500"));
          await fairydust.connect(minter).repay(parseEther("500"), parseEther("500"), true, {value: parseEther("500")});
          expect(await fairydust.connect(minter).getCdpTotalDebt(await minter.getAddress())).equal(0)
        })
  
        it("deposits and liquidates DAI", async () => {
          await fairydust.connect(minter).deposit(depositAmt, false);
          await fairydust.connect(minter).mint(mintAmt);
          await transmuterContract.connect(minter).stake(mintAmt);
          await fairydust.connect(minter).liquidate(mintAmt);
          expect( await fairydust.connect(minter).getCdpTotalDeposited(await minter.getAddress())).equal(depositAmt.sub(mintAmt))
        });
      })
    });

    describe("mint", () => {
      let depositAmt = parseEther("5000");
      let mintAmt = parseEther("1000");
      let ceilingAmt = parseEther("1000");

      beforeEach(async () => {
        await fairydust.connect(governance).setEmergencyExit(false);
        await fairydust.connect(governance).setKeepers([await deployer.getAddress()], [true]);
        adapter = (await VaultAdapterMockFactory.connect(deployer).deploy(
          token.address
        )) as VaultAdapterMock;

        await fairydust.connect(governance).initialize(adapter.address);

        await fEth.connect(deployer).setCeiling(fairydust.address, ceilingAmt);
        await token.connect(minter).deposit({value: depositAmt});
        await token.connect(minter).approve(fairydust.address, depositAmt);
      });

      it("reverts if the fairydust is not whitelisted", async () => {
        await fairydust.connect(minter).deposit(depositAmt, false);
        expect(fairydust.connect(minter).mint(mintAmt)).revertedWith(
          "fEth: fairydust is not whitelisted"
        );
      });

      context("is whitelisted", () => {
        beforeEach(async () => {
          await fEth.connect(deployer).setWhitelist(fairydust.address, true);
        });

        it("reverts if the fairydust is paused", async () => {
          await fEth.connect(deployer).pausefairydust(fairydust.address, true);
          await fairydust.connect(minter).deposit(depositAmt, false);
          expect(fairydust.connect(minter).mint(mintAmt)).revertedWith(
            "fEth: fairydust is currently paused."
          );
        });
  
        it("reverts when trying to mint too much", async () => {
          expect(fairydust.connect(minter).mint(parseEther("2000"))).revertedWith(
            "Loan-to-value ratio breached"
          );
        });
  
        it("reverts if the ceiling was breached", async () => {
          let lowCeilingAmt = parseEther("100");
          await fEth
            .connect(deployer)
            .setCeiling(fairydust.address, lowCeilingAmt);
          await fairydust.connect(minter).deposit(depositAmt, false);
          expect(fairydust.connect(minter).mint(mintAmt)).revertedWith(
            "fEth: fairydust's ceiling was breached"
          );
        });
  
        it("mints successfully to depositor", async () => {
          let balBefore = await token.balanceOf(await minter.getAddress());
          await fairydust.connect(minter).deposit(depositAmt, false);
          await fairydust.connect(minter).mint(mintAmt);
          let balAfter = await token.balanceOf(await minter.getAddress());
  
          expect(balAfter).equal(balBefore.sub(depositAmt));
          expect(await fEth.balanceOf(await minter.getAddress())).equal(mintAmt);
        });

        it("reduces credit if user has credit", async () => {
          await fairydust.connect(minter).deposit(depositAmt, false);
          let mintAmt = parseEther("100");

          // harvest yield to produce credit
          let deployerDepositAmt = parseEther("1000")
          let yieldAmt = parseEther("500");
          await token.connect(deployer).deposit({value: yieldAmt});
          await token.connect(deployer).transfer(adapter.address, yieldAmt);
          await fairydust.connect(deployer).deposit(deployerDepositAmt, true, {value: deployerDepositAmt})
          await fairydust.connect(deployer).mint(deployerDepositAmt.div(4))
          await fairydust.connect(deployer).harvest(0);
          let creditAfterHarvest = await fairydust.getCdpTotalCredit(await minter.getAddress())

          await fairydust.connect(minter).mint(mintAmt);
          let creditAfterMint = await fairydust.getCdpTotalCredit(await minter.getAddress())
  
          expect(creditAfterMint).equal(creditAfterHarvest.sub(mintAmt));
        });

        it("changing the min-c-ratio allows the user to borrow more", async () => {
          let depositAmount = parseEther("500")
          let mintAmount = depositAmount.div(4)
          await fairydust.connect(minter).deposit(depositAmount, false);
          await fairydust.connect(minter).mint(mintAmount)
          expect(fairydust.connect(minter).mint(mintAmount)).revertedWith("fairydust: Loan-to-value ratio breached")

          await fairydust.connect(governance).setCollateralizationLimit("2000000000000000000")
          await fairydust.connect(minter).mint(mintAmount);
          let balAfter = await fEth.balanceOf(await minter.getAddress());
          expect(balAfter).equal(depositAmount.div(2));
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
        await fairydust.connect(governance).setEmergencyExit(false);
        await fairydust.connect(governance).setKeepers([await deployer.getAddress()], [true])
        adapter = (await VaultAdapterMockFactory.connect(deployer).deploy(
          token.address
        )) as VaultAdapterMock;

        await fEth.connect(deployer).setWhitelist(fairydust.address, true);
        await fairydust.connect(governance).initialize(adapter.address);
        await fEth.connect(deployer).setCeiling(fairydust.address, ceilingAmt);
        await token.connect(minter).deposit({value: depositAmt});
        await token.connect(minter).approve(fairydust.address, depositAmt);
        await fEth.connect(minter).approve(transmuterContract.address, depositAmt);
        await fairydust.connect(minter).deposit(depositAmt, false);
        await fairydust.connect(minter).mint(mintAmt);
        await transmuterContract.connect(minter).stake(stakeAmt);
        await fairydust.connect(deployer).flush();
      });

      it("reverts if the caller is not whitelisted", async () => {
        expect(fairydust.connect(minter).harvest(0)).revertedWith("fairydust: only keepers.")
      })

      it("harvests yield from the vault", async () => {
        await token.connect(deployer).deposit({value: yieldAmt});
        await token.connect(deployer).transfer(adapter.address, yieldAmt);
        await fairydust.connect(deployer).harvest(0);
        let transmuterBal = await token.balanceOf(transmuterContract.address);
        expect(transmuterBal).equal(yieldAmt.sub(yieldAmt.div(pctReso/harvestFee)));
        let vaultBal = await token.balanceOf(adapter.address);
        expect(vaultBal).equal(depositAmt);
      })

      it("sends the harvest fee to the rewards address", async () => {
        await token.connect(deployer).deposit({value: yieldAmt});
        await token.connect(deployer).transfer(adapter.address, yieldAmt);
        await fairydust.connect(deployer).harvest(0);
        let rewardsBal = await token.balanceOf(await rewards.getAddress());
        expect(rewardsBal).equal(yieldAmt.mul(100).div(harvestFee));
      })

      it("does not update any balances if there is nothing to harvest", async () => {
        let initTransBal = await token.balanceOf(transmuterContract.address);
        let initRewardsBal = await token.balanceOf(await rewards.getAddress());
        await fairydust.connect(deployer).harvest(0);
        let endTransBal = await token.balanceOf(transmuterContract.address);
        let endRewardsBal = await token.balanceOf(await rewards.getAddress());
        expect(initTransBal).equal(endTransBal);
        expect(initRewardsBal).equal(endRewardsBal);
      })
    })

    describe("convert", () => {
      let convertAmt = parseEther("500");
      let ceilingAmt = parseEther("1000");
      let epsilon = parseEther(".1") // margin of difference for gas

      beforeEach(async () => {
        await fairydust.connect(governance).setEmergencyExit(false);
        await fairydust.connect(governance).setKeepers([await deployer.getAddress()], [true]);
        adapter = (await VaultAdapterMockFactory.connect(deployer).deploy(
          token.address
        )) as VaultAdapterMock;

        await fairydust.connect(governance).initialize(adapter.address);

        await fEth.connect(deployer).setCeiling(fairydust.address, ceilingAmt);
      });

      beforeEach(async () => {
        await fEth.connect(deployer).setWhitelist(fairydust.address, true);
        await token.connect(minter).deposit({value: convertAmt})
        await token.connect(deployer).deposit({value: convertAmt})
        await token.connect(minter).approve(fairydust.address, convertAmt);
        await token.connect(deployer).approve(fairydust.address, convertAmt);
      });

      it("reverts if the fairydust convert call is paused", async () => {
        expect(fairydust.connect(minter).convert(convertAmt, false)).revertedWith(
          "fairydust: conversions are paused."
        );
      });

      context("convert() is unpaused", () => {
        beforeEach(async () => {
          await fairydust.connect(governance).setPauseConvert(false);
        })

        it("reverts if the fairydust is paused", async () => {
          await fEth.connect(deployer).pausefairydust(fairydust.address, true);
          expect(fairydust.connect(minter).convert(convertAmt, false)).revertedWith(
            "fEth: fairydust is currently paused."
          );
        });
  
        it("reverts if ETH is sent with the convert() call", async () => {
          expect(fairydust.connect(minter).convert(convertAmt, false, {value: convertAmt})).revertedWith(
            "msg.value != 0"
          );
        });
  
        it("does not revert if the ceiling was breached", async () => {
          let lowCeilingAmt = parseEther("100");
          await fEth.connect(deployer).setCeiling(fairydust.address, lowCeilingAmt);
          await fairydust.connect(minter).convert(convertAmt, false)
          // test passes if does not revert
        });
  
        it("mints successfully to depositor (ETH input)", async () => {
          let balBefore = await minter.getBalance();
          await fairydust.connect(minter).convert(convertAmt, true, {value: convertAmt});
          let balAfter = await minter.getBalance();
  
          expect(balAfter.sub(balBefore.sub(convertAmt))).lt(epsilon);
          expect(await fEth.balanceOf(await minter.getAddress())).equal(convertAmt);
        });
  
        it("mints successfully to depositor (WETH input)", async () => {
          let balBefore = await token.balanceOf(await minter.getAddress());
          await fairydust.connect(minter).convert(convertAmt, false);
          let balAfter = await token.balanceOf(await minter.getAddress());
  
          expect(balAfter).equal(balBefore.sub(convertAmt));
          expect(await fEth.balanceOf(await minter.getAddress())).equal(convertAmt);
        });
  
        it("user's credit and debt do not change", async () => {
          // harvest yield to produce credit
          let deployerDepositAmt = parseEther("100")
          let yieldAmt = parseEther("500");
          await token.connect(deployer).deposit({value: yieldAmt});
          await token.connect(deployer).transfer(adapter.address, yieldAmt);
          await fairydust.connect(deployer).deposit(deployerDepositAmt, true, {value: deployerDepositAmt})
          await fairydust.connect(deployer).mint(deployerDepositAmt.div(4))
          await fairydust.connect(deployer).harvest(0);
  
          let creditBeforeConvert = await fairydust.getCdpTotalCredit(await minter.getAddress())
          let debtBeforeConvert = await fairydust.getCdpTotalCredit(await minter.getAddress())
          await fairydust.connect(minter).convert(convertAmt, false)
          let creditAfterConvert = await fairydust.getCdpTotalCredit(await minter.getAddress())
          let debtAfterConvert = await fairydust.getCdpTotalCredit(await minter.getAddress())
  
          expect(creditAfterConvert).equal(creditBeforeConvert);
          expect(debtAfterConvert).equal(debtBeforeConvert);
        });
  
        it("deposited funds get sent to the transmuter", async () => {
          let balBefore = await token.balanceOf(transmuterContract.address);
          await fairydust.connect(minter).convert(convertAmt, false);
          let balAfter = await token.balanceOf(transmuterContract.address);
          expect(balBefore).equal(0)
          expect(balAfter).equal(convertAmt);
        });

      })


    });
  });
});
