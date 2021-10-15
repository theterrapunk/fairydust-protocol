"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var chai_subset_1 = __importDefault(require("chai-subset"));
var ethereum_waffle_1 = require("ethereum-waffle");
var hardhat_1 = require("hardhat");
var ethers_1 = require("ethers");
var helpers_1 = require("../utils/helpers");
chai_1.default.use(ethereum_waffle_1.solidity);
chai_1.default.use(chai_subset_1.default);
var expect = chai_1.default.expect;
var StakingPoolsFactory;
var ERC20MockFactory;
describe("StakingPools", function () {
    var deployer;
    var governance;
    var newGovernance;
    var signers;
    var pools;
    var reward;
    var rewardRate = 5000;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getContractFactory("StakingPools")];
                case 1:
                    StakingPoolsFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("ERC20Mock")];
                case 2:
                    ERC20MockFactory = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getSigners()];
                case 1:
                    _a = _b.sent(), deployer = _a[0], governance = _a[1], newGovernance = _a[2], signers = _a.slice(3);
                    return [4 /*yield*/, ERC20MockFactory.connect(deployer).deploy("Test Token", "TEST", 18)];
                case 2:
                    reward = (_b.sent());
                    return [4 /*yield*/, StakingPoolsFactory.connect(deployer).deploy(reward.address, governance.getAddress())];
                case 3:
                    pools = (_b.sent());
                    return [2 /*return*/];
            }
        });
    }); });
    describe("set governance", function () {
        it("only allows governance", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = expect;
                        _c = (_b = pools).setPendingGovernance;
                        return [4 /*yield*/, newGovernance.getAddress()];
                    case 1:
                        _a.apply(void 0, [_c.apply(_b, [_d.sent()])]).revertedWith("StakingPools: only governance");
                        return [2 /*return*/];
                }
            });
        }); });
        context("when caller is governance", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    pools = pools.connect(governance);
                    return [2 /*return*/];
                });
            }); });
            it("prevents getting stuck", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    expect(pools.setPendingGovernance(helpers_1.ZERO_ADDRESS)).revertedWith("StakingPools: pending governance address cannot be 0x0");
                    return [2 /*return*/];
                });
            }); });
            it("sets the pending governance", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            _b = (_a = pools).setPendingGovernance;
                            return [4 /*yield*/, newGovernance.getAddress()];
                        case 1: return [4 /*yield*/, _b.apply(_a, [_f.sent()])];
                        case 2:
                            _f.sent();
                            _d = expect;
                            return [4 /*yield*/, pools.governance()];
                        case 3:
                            _e = (_c = _d.apply(void 0, [_f.sent()])).equal;
                            return [4 /*yield*/, governance.getAddress()];
                        case 4:
                            _e.apply(_c, [_f.sent()]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("updates governance upon acceptance", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            _b = (_a = pools).setPendingGovernance;
                            return [4 /*yield*/, newGovernance.getAddress()];
                        case 1: return [4 /*yield*/, _b.apply(_a, [_f.sent()])];
                        case 2:
                            _f.sent();
                            return [4 /*yield*/, pools.connect(newGovernance).acceptGovernance()];
                        case 3:
                            _f.sent();
                            _d = expect;
                            return [4 /*yield*/, pools.governance()];
                        case 4:
                            _e = (_c = _d.apply(void 0, [_f.sent()])).equal;
                            return [4 /*yield*/, newGovernance.getAddress()];
                        case 5:
                            _e.apply(_c, [_f.sent()]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("emits GovernanceUpdated event", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _b = (_a = pools).setPendingGovernance;
                            return [4 /*yield*/, newGovernance.getAddress()];
                        case 1: return [4 /*yield*/, _b.apply(_a, [_e.sent()])];
                        case 2:
                            _e.sent();
                            _d = (_c = expect(pools.connect(newGovernance).acceptGovernance())
                                .emit(pools, "GovernanceUpdated")).withArgs;
                            return [4 /*yield*/, newGovernance.getAddress()];
                        case 3:
                            _d.apply(_c, [_e.sent()]);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe("set reward rate", function () {
        var newRewardRate = 100000;
        it("only allows governance to call", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                expect(pools.setRewardRate(newRewardRate)).revertedWith("StakingPools: only governance");
                return [2 /*return*/];
            });
        }); });
        context("when caller is governance", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, (pools = pools.connect(governance))];
            }); }); });
            it("updates reward rate", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, pools.setRewardRate(newRewardRate)];
                        case 1:
                            _b.sent();
                            _a = expect;
                            return [4 /*yield*/, pools.rewardRate()];
                        case 2:
                            _a.apply(void 0, [_b.sent()]).equal(newRewardRate);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("emits RewardRateUpdated event", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    expect(pools.setRewardRate(newRewardRate))
                        .emit(pools, "RewardRateUpdated")
                        .withArgs(newRewardRate);
                    return [2 /*return*/];
                });
            }); });
        });
    });
    describe("create pool", function () {
        var token;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ERC20MockFactory.connect(deployer).deploy("Staking Token", "STAKE", 18)];
                    case 1:
                        token = (_a.sent());
                        return [2 /*return*/];
                }
            });
        }); });
        it("only allows governance to call", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                expect(pools.createPool(token.address)).revertedWith("StakingPools: only governance");
                return [2 /*return*/];
            });
        }); });
        context("when caller is governance", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, (pools = pools.connect(governance))];
                }); }); });
                it("emits PoolCreated event", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(pools.createPool(token.address))
                            .emit(pools, "PoolCreated")
                            .withArgs(0, token.address);
                        return [2 /*return*/];
                    });
                }); });
                context("when reusing token", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        it("reverts", function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, pools.createPool(token.address)];
                                    case 1:
                                        _a.sent();
                                        expect(pools.createPool(token.address)).revertedWith("StakingPools: token already has a pool");
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
    });
    describe("set pool reward weights", function () {
        it("only allows governance to call", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                expect(pools.setRewardRate([1])).revertedWith("StakingPools: only governance");
                return [2 /*return*/];
            });
        }); });
        context("when caller is governance", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, (pools = pools.connect(governance))];
            }); }); });
            var shouldBehaveLikeSetRewardWeights = function (rewardWeights) {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, pools.setRewardWeights(rewardWeights)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("updates the total reward weight", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var totalWeight, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                totalWeight = rewardWeights
                                    .map(function (value) { return ethers_1.BigNumber.from(value); })
                                    .reduce(function (acc, value) { return acc.add(value); }, ethers_1.BigNumber.from(0));
                                _a = expect;
                                return [4 /*yield*/, pools.totalRewardWeight()];
                            case 1:
                                _a.apply(void 0, [_b.sent()]).equal(totalWeight);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("updates the reward weights", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var poolId, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                poolId = 0;
                                _b.label = 1;
                            case 1:
                                if (!(poolId < rewardWeights.length)) return [3 /*break*/, 4];
                                _a = expect;
                                return [4 /*yield*/, pools.getPoolRewardWeight(poolId)];
                            case 2:
                                _a.apply(void 0, [_b.sent()]).equal(rewardWeights[poolId]);
                                _b.label = 3;
                            case 3:
                                poolId++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
            };
            it("reverts when weight array length mismatches", function () {
                expect(pools.setRewardWeights([1])).revertedWith("StakingPools: weights length mismatch");
            });
            context("with one pool", function () { return __awaiter(void 0, void 0, void 0, function () {
                var token;
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, ERC20MockFactory.connect(deployer).deploy("Staking Token", "STAKE", 18)];
                                case 1:
                                    token = (_a.sent());
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, pools.connect(governance).createPool(token.address)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    shouldBehaveLikeSetRewardWeights([10000]);
                    return [2 /*return*/];
                });
            }); });
            context("with many pools", function () { return __awaiter(void 0, void 0, void 0, function () {
                var numberPools, tokens;
                return __generator(this, function (_a) {
                    numberPools = 5;
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var i, _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    tokens = new Array();
                                    i = 0;
                                    _c.label = 1;
                                case 1:
                                    if (!(i < numberPools)) return [3 /*break*/, 4];
                                    _b = (_a = tokens).push;
                                    return [4 /*yield*/, ERC20MockFactory.connect(deployer).deploy("Staking Token", "STAKE", 18)];
                                case 2:
                                    _b.apply(_a, [(_c.sent())]);
                                    _c.label = 3;
                                case 3:
                                    i++;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var n;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    n = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(n < numberPools)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, pools
                                            .connect(governance)
                                            .createPool(tokens[n].address)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    n++;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    shouldBehaveLikeSetRewardWeights([
                        10000,
                        20000,
                        30000,
                        40000,
                        50000,
                    ]);
                    return [2 /*return*/];
                });
            }); });
        });
    });
    describe("deposit tokens", function () {
        var depositor;
        var token;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = signers, depositor = _a[0], signers = _a.slice(1);
                        return [4 /*yield*/, ERC20MockFactory.connect(deployer).deploy("Staking Token", "STAKE", 18)];
                    case 1:
                        token = (_b.sent());
                        return [4 /*yield*/, pools.connect(governance).createPool(token.address)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, pools.connect(governance).setRewardWeights([1])];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        var shouldBehaveLikeDeposit = function (poolId, amount) {
            var startingTokenBalance;
            var startingTotalDeposited;
            var startingDeposited;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _b = (_a = token).balanceOf;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 1: return [4 /*yield*/, _b.apply(_a, [_e.sent()])];
                        case 2:
                            startingTokenBalance = _e.sent();
                            return [4 /*yield*/, pools.getPoolTotalDeposited(0)];
                        case 3:
                            startingTotalDeposited = _e.sent();
                            _d = (_c = pools).getStakeTotalDeposited;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 4: return [4 /*yield*/, _d.apply(_c, [_e.sent(), 0])];
                        case 5:
                            startingDeposited = _e.sent();
                            return [4 /*yield*/, token.approve(pools.address, amount)];
                        case 6:
                            _e.sent();
                            return [4 /*yield*/, pools.deposit(poolId, amount)];
                        case 7:
                            _e.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("increments total deposited amount", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = expect;
                            return [4 /*yield*/, pools.getPoolTotalDeposited(0)];
                        case 1:
                            _a.apply(void 0, [_b.sent()])
                                .equal(startingTotalDeposited.add(amount));
                            return [2 /*return*/];
                    }
                });
            }); });
            it("increments deposited amount", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = expect;
                            _c = (_b = pools).getStakeTotalDeposited;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 1: return [4 /*yield*/, _c.apply(_b, [_d.sent(), 0])];
                        case 2:
                            _a.apply(void 0, [_d.sent()])
                                .equal(startingDeposited.add(amount));
                            return [2 /*return*/];
                    }
                });
            }); });
            it("transfers deposited tokens", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = expect;
                            _c = (_b = token).balanceOf;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 1: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                        case 2:
                            _a.apply(void 0, [_d.sent()])
                                .equal(startingTokenBalance.sub(amount));
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        context("with no previous deposits", function () { return __awaiter(void 0, void 0, void 0, function () {
            var depositAmount;
            return __generator(this, function (_a) {
                depositAmount = 50000;
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, (pools = pools.connect(depositor))];
                }); }); });
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, (token = token.connect(depositor))];
                }); }); });
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = token).mint;
                                return [4 /*yield*/, depositor.getAddress()];
                            case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent(), depositAmount])];
                            case 2:
                                _c.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                shouldBehaveLikeDeposit(0, depositAmount);
                it("does not reward tokens", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _a = expect;
                                _c = (_b = pools).getStakeTotalUnclaimed;
                                return [4 /*yield*/, depositor.getAddress()];
                            case 1: return [4 /*yield*/, _c.apply(_b, [_d.sent(), 0])];
                            case 2:
                                _a.apply(void 0, [_d.sent()])
                                    .equal(0);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
        context("with previous deposits", function () { return __awaiter(void 0, void 0, void 0, function () {
            var initialDepositAmount, depositAmount;
            return __generator(this, function (_a) {
                initialDepositAmount = 50000;
                depositAmount = 100000;
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, (pools = pools.connect(depositor))];
                }); }); });
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, (token = token.connect(depositor))];
                }); }); });
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = token).mint;
                                return [4 /*yield*/, depositor.getAddress()];
                            case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent(), initialDepositAmount + depositAmount])];
                            case 2:
                                _c.sent();
                                return [4 /*yield*/, token.approve(pools.address, initialDepositAmount)];
                            case 3:
                                _c.sent();
                                return [4 /*yield*/, pools.deposit(0, initialDepositAmount)];
                            case 4:
                                _c.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                shouldBehaveLikeDeposit(0, depositAmount);
                return [2 /*return*/];
            });
        }); });
    });
    describe("withdraw tokens", function () {
        var depositor;
        var token;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = signers, depositor = _a[0], signers = _a.slice(1);
                        return [4 /*yield*/, ERC20MockFactory.connect(deployer).deploy("Staking Token", "STAKE", 18)];
                    case 1:
                        token = (_b.sent());
                        return [4 /*yield*/, pools.connect(governance).createPool(token.address)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, pools.connect(governance).setRewardWeights([1])];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        var shouldBehaveLikeWithdraw = function (poolId, amount) {
            var startingTokenBalance;
            var startingTotalDeposited;
            var startingDeposited;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _b = (_a = token).balanceOf;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 1: return [4 /*yield*/, _b.apply(_a, [_e.sent()])];
                        case 2:
                            startingTokenBalance = _e.sent();
                            return [4 /*yield*/, pools.getPoolTotalDeposited(0)];
                        case 3:
                            startingTotalDeposited = _e.sent();
                            _d = (_c = pools).getStakeTotalDeposited;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 4: return [4 /*yield*/, _d.apply(_c, [_e.sent(), 0])];
                        case 5:
                            startingDeposited = _e.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, pools.withdraw(poolId, amount)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("decrements total deposited amount", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = expect;
                            return [4 /*yield*/, pools.getPoolTotalDeposited(0)];
                        case 1:
                            _a.apply(void 0, [_b.sent()])
                                .equal(startingTotalDeposited.sub(amount));
                            return [2 /*return*/];
                    }
                });
            }); });
            it("decrements deposited amount", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = expect;
                            _c = (_b = pools).getStakeTotalDeposited;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 1: return [4 /*yield*/, _c.apply(_b, [_d.sent(), 0])];
                        case 2:
                            _a.apply(void 0, [_d.sent()])
                                .equal(startingDeposited.sub(amount));
                            return [2 /*return*/];
                    }
                });
            }); });
            it("transfers deposited tokens", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = expect;
                            _c = (_b = token).balanceOf;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 1: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                        case 2:
                            _a.apply(void 0, [_d.sent()]).equal(startingTokenBalance.add(amount));
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        context("with previous deposits", function () { return __awaiter(void 0, void 0, void 0, function () {
            var depositAmount, withdrawAmount;
            return __generator(this, function (_a) {
                depositAmount = 50000;
                withdrawAmount = 25000;
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                token = token.connect(depositor);
                                _b = (_a = token.connect(deployer)).mint;
                                return [4 /*yield*/, depositor.getAddress()];
                            case 1: return [4 /*yield*/, _b.apply(_a, [_e.sent(), helpers_1.MAXIMUM_U256])];
                            case 2:
                                _e.sent();
                                return [4 /*yield*/, token.connect(depositor).approve(pools.address, helpers_1.MAXIMUM_U256)];
                            case 3:
                                _e.sent();
                                _d = (_c = token).mint;
                                return [4 /*yield*/, depositor.getAddress()];
                            case 4: return [4 /*yield*/, _d.apply(_c, [_e.sent(), depositAmount])];
                            case 5:
                                _e.sent();
                                return [4 /*yield*/, token.approve(pools.address, depositAmount)];
                            case 6:
                                _e.sent();
                                pools = pools.connect(depositor);
                                return [4 /*yield*/, pools.deposit(0, depositAmount)];
                            case 7:
                                _e.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                shouldBehaveLikeWithdraw(0, withdrawAmount);
                return [2 /*return*/];
            });
        }); });
    });
    describe("claim tokens", function () {
        var depositor;
        var token;
        var rewardWeight = 1;
        var depositAmount = 50000;
        var rewardRate = 1000;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = signers, depositor = _a[0], signers = _a.slice(1);
                        return [4 /*yield*/, ERC20MockFactory.connect(deployer).deploy("Staking Token", "STAKE", 18)];
                    case 1:
                        token = (_b.sent());
                        return [2 /*return*/];
                }
            });
        }); });
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, (token = token.connect(depositor))];
        }); }); });
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = token).mint;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent(), helpers_1.MAXIMUM_U256])];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, token.approve(pools.address, helpers_1.MAXIMUM_U256)];
                    case 3:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, (pools = pools.connect(governance))];
        }); }); });
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pools.createPool(token.address)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, pools.setRewardWeights([rewardWeight])];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        context("with deposit", function () {
            var EPSILON = 5;
            var elapsedBlocks = 1000;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, pools.connect(governance).setRewardRate(rewardRate)];
                        case 1:
                            _a.sent();
                            pools = pools.connect(depositor);
                            return [4 /*yield*/, pools.deposit(0, depositAmount)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, elapsedBlocks)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, pools.claim(0)];
                        case 4:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("mints reward tokens", function () { return __awaiter(void 0, void 0, void 0, function () {
                var rewardAmount, _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            rewardAmount = rewardRate * (elapsedBlocks + 1);
                            _a = expect;
                            _c = (_b = reward).balanceOf;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 1: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                        case 2:
                            _a.apply(void 0, [_d.sent()])
                                .gte(rewardAmount - EPSILON)
                                .lte(rewardAmount);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("clears unclaimed amount", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = expect;
                            _c = (_b = pools).getStakeTotalUnclaimed;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 1: return [4 /*yield*/, _c.apply(_b, [_d.sent(), 0])];
                        case 2:
                            _a.apply(void 0, [_d.sent()]).equal(0);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        context("with multiple deposits", function () {
            var EPSILON = 5;
            var elapsedBlocks = 100;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, pools.connect(governance).setRewardRate(rewardRate)];
                        case 1:
                            _a.sent();
                            pools = pools.connect(depositor);
                            return [4 /*yield*/, pools.deposit(0, depositAmount)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, elapsedBlocks)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, pools.deposit(0, depositAmount)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, elapsedBlocks)];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, pools.claim(0)];
                        case 6:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("mints reward tokens", function () { return __awaiter(void 0, void 0, void 0, function () {
                var rewardAmount, _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            rewardAmount = rewardRate * (elapsedBlocks + elapsedBlocks + 2);
                            _a = expect;
                            _c = (_b = reward).balanceOf;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 1: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                        case 2:
                            _a.apply(void 0, [_d.sent()])
                                .gte(rewardAmount - EPSILON)
                                .lte(rewardAmount);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("clears unclaimed amount", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = expect;
                            _c = (_b = pools).getStakeTotalUnclaimed;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 1: return [4 /*yield*/, _c.apply(_b, [_d.sent(), 0])];
                        case 2:
                            _a.apply(void 0, [_d.sent()]).equal(0);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe("get stake unclaimed amount", function () {
        var depositor;
        var token;
        var rewardWeight = 1;
        var depositAmount = 50000;
        var rewardRate = 5000;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = signers, depositor = _a[0], signers = _a.slice(1);
                        return [4 /*yield*/, ERC20MockFactory.connect(deployer).deploy("Staking Token", "STAKE", 18)];
                    case 1:
                        token = (_b.sent());
                        return [2 /*return*/];
                }
            });
        }); });
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, (token = token.connect(depositor))];
        }); }); });
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = token).mint;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent(), helpers_1.MAXIMUM_U256])];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, token.approve(pools.address, helpers_1.MAXIMUM_U256)];
                    case 3:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, (pools = pools.connect(governance))];
        }); }); });
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pools.createPool(token.address)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, pools.setRewardWeights([rewardWeight])];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, pools.setRewardRate(rewardRate)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        context("with deposit", function () {
            var EPSILON = 5;
            var elapsedBlocks = 100;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, (pools = pools.connect(depositor))];
            }); }); });
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pools.deposit(0, depositAmount)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); });
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, elapsedBlocks)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("properly calculates the balance", function () { return __awaiter(void 0, void 0, void 0, function () {
                var rewardAmount, _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            rewardAmount = rewardRate * elapsedBlocks;
                            _a = expect;
                            _c = (_b = pools).getStakeTotalUnclaimed;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 1: return [4 /*yield*/, _c.apply(_b, [_d.sent(), 0])];
                        case 2:
                            _a.apply(void 0, [_d.sent()]).equal(rewardAmount);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        context("with multiple deposits", function () {
            var EPSILON = 5;
            var elapsedBlocks = 100;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, (pools = pools.connect(depositor))];
            }); }); });
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, pools.deposit(0, depositAmount)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, elapsedBlocks)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, pools.deposit(0, depositAmount)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, elapsedBlocks)];
                        case 4:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("properly calculates the balance", function () { return __awaiter(void 0, void 0, void 0, function () {
                var rewardAmount, _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            rewardAmount = rewardRate * (elapsedBlocks + elapsedBlocks + 1);
                            _a = expect;
                            _c = (_b = pools).getStakeTotalUnclaimed;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 1: return [4 /*yield*/, _c.apply(_b, [_d.sent(), 0])];
                        case 2:
                            _a.apply(void 0, [_d.sent()])
                                .gte(rewardAmount - EPSILON)
                                .lte(rewardAmount);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
