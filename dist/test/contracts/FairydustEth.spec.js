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
var parseEther = ethers_1.utils.parseEther, formatEther = ethers_1.utils.formatEther;
chai_1.default.use(ethereum_waffle_1.solidity);
chai_1.default.use(chai_subset_1.default);
var expect = chai_1.default.expect;
var FairydustFactory;
var FETHFactory;
var ERC20MockFactory;
var VaultAdapterMockFactory;
var TransmuterFactory;
var YearnVaultAdapterFactory;
var YearnVaultMockFactory;
var YearnControllerMockFactory;
var Weth9Factory;
describe("FairydustEth", function () {
    var signers;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getContractFactory("FairydustEth")];
                case 1:
                    FairydustFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("Transmuter")];
                case 2:
                    TransmuterFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("FdETH")];
                case 3:
                    FETHFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("ERC20Mock")];
                case 4:
                    ERC20MockFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("VaultAdapterMock")];
                case 5:
                    VaultAdapterMockFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("YearnVaultAdapter")];
                case 6:
                    YearnVaultAdapterFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("YearnVaultMock")];
                case 7:
                    YearnVaultMockFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("YearnControllerMock")];
                case 8:
                    YearnControllerMockFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("WETH9")];
                case 9:
                    Weth9Factory = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getSigners()];
                case 1:
                    signers = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe("constructor", function () { return __awaiter(void 0, void 0, void 0, function () {
        var deployer, governance, sentinel, token, fEth, fairydust;
        return __generator(this, function (_a) {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = signers, deployer = _a[0], governance = _a[1], sentinel = _a[2], signers = _a.slice(3);
                            return [4 /*yield*/, Weth9Factory.connect(deployer).deploy()];
                        case 1:
                            token = (_b.sent());
                            return [4 /*yield*/, FETHFactory.connect(deployer).deploy()];
                        case 2:
                            fEth = (_b.sent());
                            return [2 /*return*/];
                    }
                });
            }); });
            context("when governance is the zero address", function () {
                it("reverts", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                _a = expect;
                                _c = (_b = FairydustFactory.connect(deployer)).deploy;
                                _d = [token.address,
                                    fEth.address,
                                    helpers_1.ZERO_ADDRESS];
                                return [4 /*yield*/, sentinel.getAddress()];
                            case 1:
                                _a.apply(void 0, [_c.apply(_b, _d.concat([_e.sent()]))]).revertedWith("Fairydust: governance address cannot be 0x0.");
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            return [2 /*return*/];
        });
    }); });
    describe("update Fairydust addys and variables", function () {
        var deployer;
        var governance;
        var newGovernance;
        var rewards;
        var sentinel;
        var transmuter;
        var token;
        var fEth;
        var fairydust;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _d = signers, deployer = _d[0], governance = _d[1], newGovernance = _d[2], rewards = _d[3], sentinel = _d[4], transmuter = _d[5], signers = _d.slice(6);
                        return [4 /*yield*/, Weth9Factory.connect(deployer).deploy()];
                    case 1:
                        token = (_e.sent());
                        return [4 /*yield*/, FETHFactory.connect(deployer).deploy()];
                    case 2:
                        fEth = (_e.sent());
                        _b = (_a = FairydustFactory.connect(deployer)).deploy;
                        _c = [token.address,
                            fEth.address];
                        return [4 /*yield*/, governance.getAddress()];
                    case 3:
                        _c = _c.concat([_e.sent()]);
                        return [4 /*yield*/, sentinel.getAddress()];
                    case 4: return [4 /*yield*/, _b.apply(_a, _c.concat([_e.sent()]))];
                    case 5:
                        fairydust = (_e.sent());
                        return [4 /*yield*/, fairydust.connect(governance).setEmergencyExit(false)];
                    case 6:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        describe("set governance", function () {
            context("when caller is not current governance", function () {
                beforeEach(function () { return (fairydust = fairydust.connect(deployer)); });
                it("reverts", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _a = expect;
                                _c = (_b = fairydust).setPendingGovernance;
                                return [4 /*yield*/, newGovernance.getAddress()];
                            case 1:
                                _a.apply(void 0, [_c.apply(_b, [_d.sent()])]).revertedWith("Fairydust: only governance");
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            context("when caller is current governance", function () {
                beforeEach(function () { return (fairydust = fairydust.connect(governance)); });
                it("reverts when setting governance to zero address", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(fairydust.setPendingGovernance(helpers_1.ZERO_ADDRESS)).revertedWith("fairydust: governance address cannot be 0x0.");
                        return [2 /*return*/];
                    });
                }); });
                it("updates rewards", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c, _d, _e;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                _b = (_a = fairydust).setRewards;
                                return [4 /*yield*/, rewards.getAddress()];
                            case 1: return [4 /*yield*/, _b.apply(_a, [_f.sent()])];
                            case 2:
                                _f.sent();
                                _d = expect;
                                return [4 /*yield*/, fairydust.rewards()];
                            case 3:
                                _e = (_c = _d.apply(void 0, [_f.sent()])).equal;
                                return [4 /*yield*/, rewards.getAddress()];
                            case 4:
                                _e.apply(_c, [_f.sent()]);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe("set transmuter", function () {
            context("when caller is not current governance", function () {
                it("reverts", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _a = expect;
                                _c = (_b = fairydust).setTransmuter;
                                return [4 /*yield*/, transmuter.getAddress()];
                            case 1:
                                _a.apply(void 0, [_c.apply(_b, [_d.sent()])]).revertedWith("fairydust: only governance");
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            context("when caller is current governance", function () {
                beforeEach(function () { return (fairydust = fairydust.connect(governance)); });
                it("reverts when setting transmuter to zero address", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(fairydust.setTransmuter(helpers_1.ZERO_ADDRESS)).revertedWith("fairydust: transmuter address cannot be 0x0.");
                        return [2 /*return*/];
                    });
                }); });
                it("updates transmuter", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c, _d, _e;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                _b = (_a = fairydust).setTransmuter;
                                return [4 /*yield*/, transmuter.getAddress()];
                            case 1: return [4 /*yield*/, _b.apply(_a, [_f.sent()])];
                            case 2:
                                _f.sent();
                                _d = expect;
                                return [4 /*yield*/, fairydust.transmuter()];
                            case 3:
                                _e = (_c = _d.apply(void 0, [_f.sent()])).equal;
                                return [4 /*yield*/, transmuter.getAddress()];
                            case 4:
                                _e.apply(_c, [_f.sent()]);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe("set rewards", function () {
            context("when caller is not current governance", function () {
                beforeEach(function () { return (fairydust = fairydust.connect(deployer)); });
                it("reverts", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _a = expect;
                                _c = (_b = fairydust).setRewards;
                                return [4 /*yield*/, rewards.getAddress()];
                            case 1:
                                _a.apply(void 0, [_c.apply(_b, [_d.sent()])]).revertedWith("fairydust: only governance");
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            context("when caller is current governance", function () {
                beforeEach(function () { return (fairydust = fairydust.connect(governance)); });
                it("reverts when setting rewards to zero address", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(fairydust.setRewards(helpers_1.ZERO_ADDRESS)).revertedWith("fairydust: rewards address cannot be 0x0.");
                        return [2 /*return*/];
                    });
                }); });
                it("updates rewards", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c, _d, _e;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                _b = (_a = fairydust).setRewards;
                                return [4 /*yield*/, rewards.getAddress()];
                            case 1: return [4 /*yield*/, _b.apply(_a, [_f.sent()])];
                            case 2:
                                _f.sent();
                                _d = expect;
                                return [4 /*yield*/, fairydust.rewards()];
                            case 3:
                                _e = (_c = _d.apply(void 0, [_f.sent()])).equal;
                                return [4 /*yield*/, rewards.getAddress()];
                            case 4:
                                _e.apply(_c, [_f.sent()]);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe("set peformance fee", function () {
            context("when caller is not current governance", function () {
                beforeEach(function () { return (fairydust = fairydust.connect(deployer)); });
                it("reverts", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(fairydust.setHarvestFee(1)).revertedWith("fairydust: only governance");
                        return [2 /*return*/];
                    });
                }); });
            });
            context("when caller is current governance", function () {
                beforeEach(function () { return (fairydust = fairydust.connect(governance)); });
                it("reverts when performance fee greater than maximum", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var MAXIMUM_VALUE;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fairydust.PERCENT_RESOLUTION()];
                            case 1:
                                MAXIMUM_VALUE = _a.sent();
                                expect(fairydust.setHarvestFee(MAXIMUM_VALUE.add(1))).revertedWith("fairydust: harvest fee above maximum");
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("updates performance fee", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, fairydust.setHarvestFee(1)];
                            case 1:
                                _b.sent();
                                _a = expect;
                                return [4 /*yield*/, fairydust.harvestFee()];
                            case 2:
                                _a.apply(void 0, [_b.sent()]).equal(1);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe("set collateralization limit", function () {
            context("when caller is not current governance", function () {
                beforeEach(function () { return (fairydust = fairydust.connect(deployer)); });
                it("reverts", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var collateralizationLimit;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fairydust.MINIMUM_COLLATERALIZATION_LIMIT()];
                            case 1:
                                collateralizationLimit = _a.sent();
                                expect(fairydust.setCollateralizationLimit(collateralizationLimit)).revertedWith("fairydust: only governance");
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            context("when caller is current governance", function () {
                beforeEach(function () { return (fairydust = fairydust.connect(governance)); });
                it("reverts when performance fee less than minimum", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var MINIMUM_LIMIT;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fairydust.MINIMUM_COLLATERALIZATION_LIMIT()];
                            case 1:
                                MINIMUM_LIMIT = _a.sent();
                                expect(fairydust.setCollateralizationLimit(MINIMUM_LIMIT.sub(1))).revertedWith("fairydust: collateralization limit below minimum.");
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("reverts when performance fee greater than maximum", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var MAXIMUM_LIMIT;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fairydust.MAXIMUM_COLLATERALIZATION_LIMIT()];
                            case 1:
                                MAXIMUM_LIMIT = _a.sent();
                                expect(fairydust.setCollateralizationLimit(MAXIMUM_LIMIT.add(1))).revertedWith("fairydust: collateralization limit above maximum");
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("updates collateralization limit", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var collateralizationLimit, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, fairydust.MINIMUM_COLLATERALIZATION_LIMIT()];
                            case 1:
                                collateralizationLimit = _b.sent();
                                return [4 /*yield*/, fairydust.setCollateralizationLimit(collateralizationLimit)];
                            case 2:
                                _b.sent();
                                _a = expect;
                                return [4 /*yield*/, fairydust.collateralizationLimit()];
                            case 3:
                                _a.apply(void 0, [_b.sent()]).containSubset([
                                    collateralizationLimit,
                                ]);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
    });
    describe("vault actions", function () {
        var deployer;
        var governance;
        var sentinel;
        var rewards;
        var transmuter;
        var minter;
        var user;
        var token;
        var fEth;
        var fairydust;
        var adapter;
        var newAdapter;
        var harvestFee = 1000;
        var pctReso = 10000;
        var transmuterContract;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            var _l;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        _l = signers, deployer = _l[0], governance = _l[1], sentinel = _l[2], rewards = _l[3], transmuter = _l[4], minter = _l[5], user = _l[6], signers = _l.slice(7);
                        return [4 /*yield*/, Weth9Factory.connect(deployer).deploy()];
                    case 1:
                        token = (_m.sent());
                        return [4 /*yield*/, FETHFactory.connect(deployer).deploy()];
                    case 2:
                        fEth = (_m.sent());
                        _b = (_a = FairydustFactory.connect(deployer)).deploy;
                        _c = [token.address,
                            fEth.address];
                        return [4 /*yield*/, governance.getAddress()];
                    case 3:
                        _c = _c.concat([_m.sent()]);
                        return [4 /*yield*/, sentinel.getAddress()];
                    case 4: return [4 /*yield*/, _b.apply(_a, _c.concat([_m.sent()]))];
                    case 5:
                        fairydust = (_m.sent());
                        _e = (_d = fairydust
                            .connect(governance)).setTransmuter;
                        return [4 /*yield*/, transmuter.getAddress()];
                    case 6: return [4 /*yield*/, _e.apply(_d, [_m.sent()])];
                    case 7:
                        _m.sent();
                        _g = (_f = fairydust
                            .connect(governance)).setRewards;
                        return [4 /*yield*/, rewards.getAddress()];
                    case 8: return [4 /*yield*/, _g.apply(_f, [_m.sent()])];
                    case 9:
                        _m.sent();
                        return [4 /*yield*/, fairydust.connect(governance).setHarvestFee(harvestFee)];
                    case 10:
                        _m.sent();
                        _j = (_h = TransmuterFactory.connect(deployer)).deploy;
                        _k = [fEth.address,
                            token.address];
                        return [4 /*yield*/, governance.getAddress()];
                    case 11: return [4 /*yield*/, _j.apply(_h, _k.concat([_m.sent()]))];
                    case 12:
                        transmuterContract = (_m.sent());
                        return [4 /*yield*/, fairydust.connect(governance).setTransmuter(transmuterContract.address)];
                    case 13:
                        _m.sent();
                        return [4 /*yield*/, transmuterContract.connect(governance).setWhitelist(fairydust.address, true)];
                    case 14:
                        _m.sent();
                        return [4 /*yield*/, token.connect(minter).deposit({ value: parseEther("10000") })];
                    case 15:
                        _m.sent();
                        return [4 /*yield*/, token.connect(minter).approve(fairydust.address, parseEther("10000"))];
                    case 16:
                        _m.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        describe("migrate", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                        case 1:
                            adapter = (_a.sent());
                            return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                        case 2:
                            newAdapter = (_a.sent());
                            return [4 /*yield*/, fairydust.connect(governance).initialize(adapter.address)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            context("when caller is not current governance", function () {
                beforeEach(function () { return (fairydust = fairydust.connect(deployer)); });
                it("reverts", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(fairydust.migrate(newAdapter.address)).revertedWith("fairydust: only governance");
                        return [2 /*return*/];
                    });
                }); });
            });
            context("when caller is current governance", function () {
                beforeEach(function () { return (fairydust = fairydust.connect(governance)); });
                context("when adapter is zero address", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        it("reverts", function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                expect(fairydust.migrate(helpers_1.ZERO_ADDRESS)).revertedWith("fairydust: active vault address cannot be 0x0.");
                                return [2 /*return*/];
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); });
                context("when adapter token mismatches", function () {
                    var tokenAddress = hardhat_1.ethers.utils.getAddress("0xffffffffffffffffffffffffffffffffffffffff");
                    var invalidAdapter;
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(tokenAddress)];
                                case 1:
                                    invalidAdapter = (_a.sent());
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it("reverts", function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            expect(fairydust.migrate(invalidAdapter.address)).revertedWith("fairydust: token mismatch");
                            return [2 /*return*/];
                        });
                    }); });
                });
                context("when conditions are met", function () {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, fairydust.migrate(newAdapter.address)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it("increments the vault count", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = expect;
                                    return [4 /*yield*/, fairydust.vaultCount()];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]).equal(2);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it("sets the vaults adapter", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = expect;
                                    return [4 /*yield*/, fairydust.getVaultAdapter(0)];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]).equal(adapter.address);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it("sets the vaults adapter", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = expect;
                                    return [4 /*yield*/, fairydust.getVaultAdapter(1)];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]).equal(newAdapter.address);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                context("when adaptor is already defined in another vault", function () {
                    it("reverts", function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            expect(fairydust.migrate(adapter.address)).revertedWith('Adapter already in use');
                            return [2 /*return*/];
                        });
                    }); });
                });
            });
            context("on successful deployment", function () {
                it("fairydust is paused", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(fairydust.connect(deployer).deposit(parseEther("1"), true, { value: parseEther("1") })).revertedWith("emergency pause enabled");
                        return [2 /*return*/];
                    });
                }); });
            });
        });
        describe("recall funds", function () {
            context("from the active vault", function () {
                var adapter;
                var controllerMock;
                var vaultMock;
                var depositAmt = parseEther("5000");
                var mintAmt = parseEther("1000");
                var recallAmt = parseEther("500");
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(governance).setEmergencyExit(false)];
                            case 1:
                                _c.sent();
                                _b = (_a = fairydust.connect(governance)).setKeepers;
                                return [4 /*yield*/, deployer.getAddress()];
                            case 2: return [4 /*yield*/, _b.apply(_a, [[_c.sent()], [true]])];
                            case 3:
                                _c.sent();
                                return [4 /*yield*/, YearnControllerMockFactory
                                        .connect(deployer)
                                        .deploy()];
                            case 4:
                                controllerMock = (_c.sent());
                                return [4 /*yield*/, YearnVaultMockFactory
                                        .connect(deployer)
                                        .deploy(token.address, controllerMock.address)];
                            case 5:
                                vaultMock = (_c.sent());
                                return [4 /*yield*/, YearnVaultAdapterFactory
                                        .connect(deployer)
                                        .deploy(vaultMock.address, fairydust.address)];
                            case 6:
                                adapter = (_c.sent());
                                return [4 /*yield*/, token.connect(deployer).deposit({ value: parseEther("10000") })];
                            case 7:
                                _c.sent();
                                return [4 /*yield*/, token.approve(vaultMock.address, parseEther("10000"))];
                            case 8:
                                _c.sent();
                                return [4 /*yield*/, fairydust.connect(governance).initialize(adapter.address)];
                            case 9:
                                _c.sent();
                                return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, false)];
                            case 10:
                                _c.sent();
                                return [4 /*yield*/, fairydust.connect(deployer).flush()];
                            case 11:
                                _c.sent();
                                // need at least one other deposit in the vault to not get underflow errors
                                return [4 /*yield*/, vaultMock.connect(deployer).deposit(parseEther("100"))];
                            case 12:
                                // need at least one other deposit in the vault to not get underflow errors
                                _c.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("reverts when not an emergency, not governance, and user does not have permission to recall funds from active vault", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(fairydust.connect(minter).recall(0, 0))
                            .revertedWith("fairydust: not an emergency, not governance, and user does not have permission to recall funds from active vault");
                        return [2 /*return*/];
                    });
                }); });
                it("governance can recall some of the funds", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var beforeBal, afterBal;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, token.connect(governance).balanceOf(fairydust.address)];
                            case 1:
                                beforeBal = _a.sent();
                                return [4 /*yield*/, fairydust.connect(governance).recall(0, recallAmt)];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, token.connect(governance).balanceOf(fairydust.address)];
                            case 3:
                                afterBal = _a.sent();
                                expect(beforeBal).equal(0);
                                expect(afterBal).equal(recallAmt);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("governance can recall all of the funds", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(governance).recallAll(0)];
                            case 1:
                                _b.sent();
                                _a = expect;
                                return [4 /*yield*/, token.connect(governance).balanceOf(fairydust.address)];
                            case 2:
                                _a.apply(void 0, [_b.sent()]).equal(depositAmt);
                                return [2 /*return*/];
                        }
                    });
                }); });
                describe("in an emergency", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        it("anyone can recall funds", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, fairydust.connect(governance).setEmergencyExit(true)];
                                    case 1:
                                        _b.sent();
                                        return [4 /*yield*/, fairydust.connect(minter).recallAll(0)];
                                    case 2:
                                        _b.sent();
                                        _a = expect;
                                        return [4 /*yield*/, token.connect(governance).balanceOf(fairydust.address)];
                                    case 3:
                                        _a.apply(void 0, [_b.sent()]).equal(depositAmt);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        it("after some usage", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var yieldAmt, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, fairydust.connect(minter).deposit(mintAmt, false)];
                                    case 1:
                                        _b.sent();
                                        return [4 /*yield*/, fairydust.connect(deployer).flush()];
                                    case 2:
                                        _b.sent();
                                        yieldAmt = parseEther("500");
                                        return [4 /*yield*/, token.connect(deployer).deposit({ value: yieldAmt })];
                                    case 3:
                                        _b.sent();
                                        return [4 /*yield*/, token.connect(deployer).transfer(adapter.address, yieldAmt)];
                                    case 4:
                                        _b.sent();
                                        return [4 /*yield*/, fairydust.connect(governance).setEmergencyExit(true)];
                                    case 5:
                                        _b.sent();
                                        return [4 /*yield*/, fairydust.connect(minter).recallAll(0)];
                                    case 6:
                                        _b.sent();
                                        _a = expect;
                                        return [4 /*yield*/, token.connect(governance).balanceOf(fairydust.address)];
                                    case 7:
                                        _a.apply(void 0, [_b.sent()]).equal(depositAmt.add(mintAmt));
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); });
            });
            context("from an inactive vault", function () {
                var inactiveAdapter;
                var activeAdapter;
                var depositAmt = parseEther("5000");
                var mintAmt = parseEther("1000");
                var recallAmt = parseEther("500");
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                            case 1:
                                inactiveAdapter = (_c.sent());
                                return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                            case 2:
                                activeAdapter = (_c.sent());
                                return [4 /*yield*/, fairydust.connect(governance).setEmergencyExit(false)];
                            case 3:
                                _c.sent();
                                _b = (_a = fairydust.connect(governance)).setKeepers;
                                return [4 /*yield*/, deployer.getAddress()];
                            case 4: return [4 /*yield*/, _b.apply(_a, [[_c.sent()], [true]])];
                            case 5:
                                _c.sent();
                                return [4 /*yield*/, fairydust.connect(governance).initialize(inactiveAdapter.address)];
                            case 6:
                                _c.sent();
                                return [4 /*yield*/, token.connect(minter).deposit({ value: depositAmt })];
                            case 7:
                                _c.sent();
                                return [4 /*yield*/, token.connect(minter).approve(fairydust.address, depositAmt)];
                            case 8:
                                _c.sent();
                                return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, false)];
                            case 9:
                                _c.sent();
                                return [4 /*yield*/, fairydust.connect(deployer).flush()];
                            case 10:
                                _c.sent();
                                return [4 /*yield*/, fairydust.connect(governance).migrate(activeAdapter.address)];
                            case 11:
                                _c.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("anyone can recall some of the funds to the contract", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(minter).recall(0, recallAmt)];
                            case 1:
                                _b.sent();
                                _a = expect;
                                return [4 /*yield*/, token.balanceOf(fairydust.address)];
                            case 2:
                                _a.apply(void 0, [_b.sent()]).equal(recallAmt);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("anyone can recall all of the funds to the contract", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(minter).recallAll(0)];
                            case 1:
                                _b.sent();
                                _a = expect;
                                return [4 /*yield*/, token.balanceOf(fairydust.address)];
                            case 2:
                                _a.apply(void 0, [_b.sent()]).equal(depositAmt);
                                return [2 /*return*/];
                        }
                    });
                }); });
                describe("in an emergency", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        it("anyone can recall funds", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, fairydust.connect(governance).setEmergencyExit(true)];
                                    case 1:
                                        _b.sent();
                                        return [4 /*yield*/, fairydust.connect(minter).recallAll(0)];
                                    case 2:
                                        _b.sent();
                                        _a = expect;
                                        return [4 /*yield*/, token.connect(governance).balanceOf(fairydust.address)];
                                    case 3:
                                        _a.apply(void 0, [_b.sent()]).equal(depositAmt);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); });
            });
        });
        describe("flush funds", function () {
            var adapter;
            context("when the fairydust is not initialized", function () {
                it("reverts", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(fairydust.connect(deployer).flush()).revertedWith("fairydust: not initialized.");
                        return [2 /*return*/];
                    });
                }); });
            });
            context("when there is at least one vault to flush to", function () {
                context("when there is one vault", function () {
                    var adapter;
                    var mintAmount = parseEther("5000");
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0: return [4 /*yield*/, fairydust.connect(governance).setEmergencyExit(false)];
                                case 1:
                                    _c.sent();
                                    _b = (_a = fairydust.connect(governance)).setKeepers;
                                    return [4 /*yield*/, deployer.getAddress()];
                                case 2: return [4 /*yield*/, _b.apply(_a, [[_c.sent()], [true]])];
                                case 3:
                                    _c.sent();
                                    return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                                case 4:
                                    adapter = (_c.sent());
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, token.connect(deployer).deposit({ value: mintAmount })];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, token.connect(deployer).transfer(fairydust.address, mintAmount)];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, fairydust.connect(governance).initialize(adapter.address)];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, fairydust.connect(deployer).flush()];
                                case 4:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it("flushes funds to the vault", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = expect;
                                    return [4 /*yield*/, token.balanceOf(adapter.address)];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]).equal(mintAmount);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it("reverts if the caller is not whitelisted", function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            expect(fairydust.connect(minter).flush()).revertedWith("fairydust: only keepers.");
                            return [2 /*return*/];
                        });
                    }); });
                });
                context("when there are multiple vaults", function () {
                    var inactiveAdapter;
                    var activeAdapter;
                    var mintAmount = parseEther("5");
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0: return [4 /*yield*/, fairydust.connect(governance).setEmergencyExit(false)];
                                case 1:
                                    _c.sent();
                                    _b = (_a = fairydust.connect(governance)).setKeepers;
                                    return [4 /*yield*/, deployer.getAddress()];
                                case 2: return [4 /*yield*/, _b.apply(_a, [[_c.sent()], [true]])];
                                case 3:
                                    _c.sent();
                                    return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                                case 4:
                                    inactiveAdapter = (_c.sent());
                                    return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                                case 5:
                                    activeAdapter = (_c.sent());
                                    return [4 /*yield*/, token.connect(deployer).deposit({ value: mintAmount })];
                                case 6:
                                    _c.sent();
                                    return [4 /*yield*/, token.connect(deployer).transfer(fairydust.address, mintAmount)];
                                case 7:
                                    _c.sent();
                                    return [4 /*yield*/, fairydust
                                            .connect(governance)
                                            .initialize(inactiveAdapter.address)];
                                case 8:
                                    _c.sent();
                                    return [4 /*yield*/, fairydust.connect(governance).migrate(activeAdapter.address)];
                                case 9:
                                    _c.sent();
                                    return [4 /*yield*/, fairydust.connect(deployer).flush()];
                                case 10:
                                    _c.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it("flushes funds to the active vault", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = expect;
                                    return [4 /*yield*/, token.balanceOf(activeAdapter.address)];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]).equal(mintAmount);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
            });
        });
        describe("deposit and withdraw tokens", function () {
            var depositAmt = parseEther("5000");
            var mintAmt = parseEther("1000");
            var ceilingAmt = parseEther("10000");
            var collateralizationLimit = "2000000000000000000"; // this should be set in the deploy sequence
            var epsilon = parseEther(".1"); // margin of difference for gas
            describe("WETH", function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(governance).setEmergencyExit(false)];
                            case 1:
                                _c.sent();
                                _b = (_a = fairydust.connect(governance)).setKeepers;
                                return [4 /*yield*/, deployer.getAddress()];
                            case 2: return [4 /*yield*/, _b.apply(_a, [[_c.sent()], [true]])];
                            case 3:
                                _c.sent();
                                return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                            case 4:
                                adapter = (_c.sent());
                                return [4 /*yield*/, fairydust.connect(governance).initialize(adapter.address)];
                            case 5:
                                _c.sent();
                                return [4 /*yield*/, fairydust
                                        .connect(governance)
                                        .setCollateralizationLimit(collateralizationLimit)];
                            case 6:
                                _c.sent();
                                return [4 /*yield*/, fEth.connect(deployer).setWhitelist(fairydust.address, true)];
                            case 7:
                                _c.sent();
                                return [4 /*yield*/, fEth.connect(deployer).setCeiling(fairydust.address, ceilingAmt)];
                            case 8:
                                _c.sent();
                                return [4 /*yield*/, token.connect(minter).deposit({ value: depositAmt })];
                            case 9:
                                _c.sent();
                                return [4 /*yield*/, token.connect(minter).approve(fairydust.address, parseEther("100000000"))];
                            case 10:
                                _c.sent();
                                return [4 /*yield*/, fEth.connect(minter).approve(fairydust.address, parseEther("100000000"))];
                            case 11:
                                _c.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("deposited amount is accounted for correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: 
                            // let address = await deployer.getAddress();
                            return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, false)];
                            case 1:
                                // let address = await deployer.getAddress();
                                _d.sent();
                                _a = expect;
                                _c = (_b = fairydust
                                    .connect(minter)).getCdpTotalDeposited;
                                return [4 /*yield*/, minter.getAddress()];
                            case 2: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                            case 3:
                                _a.apply(void 0, [_d.sent()]).equal(depositAmt);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("deposits token and then withdraws all", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var balBefore, _a, _b, balAfter, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                _b = (_a = token).balanceOf;
                                return [4 /*yield*/, minter.getAddress()];
                            case 1: return [4 /*yield*/, _b.apply(_a, [_e.sent()])];
                            case 2:
                                balBefore = _e.sent();
                                return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, false)];
                            case 3:
                                _e.sent();
                                return [4 /*yield*/, fairydust.connect(minter).withdraw(depositAmt, false)];
                            case 4:
                                _e.sent();
                                _d = (_c = token).balanceOf;
                                return [4 /*yield*/, minter.getAddress()];
                            case 5: return [4 /*yield*/, _d.apply(_c, [_e.sent()])];
                            case 6:
                                balAfter = _e.sent();
                                expect(balBefore).equal(balAfter);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("reverts if ETH is sent with the deposit() call", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(fairydust.connect(minter).deposit(depositAmt, false, { value: depositAmt })).revertedWith("msg.value != 0");
                        return [2 /*return*/];
                    });
                }); });
                it("reverts when withdrawing too much", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var overdraft;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                overdraft = depositAmt.add(parseEther("1000"));
                                return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, false)];
                            case 1:
                                _a.sent();
                                expect(fairydust.connect(minter).withdraw(overdraft, false)).revertedWith("SafeERC20: low-level call failed");
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("reverts when cdp is undercollateralized", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, false)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 2:
                                _a.sent();
                                expect(fairydust.connect(minter).withdraw(depositAmt, false)).revertedWith("Action blocked: unhealthy collateralization ratio");
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("reverts if ETH is sent when repaying with WETH", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, false)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 2:
                                _a.sent();
                                expect(fairydust.connect(minter).repay(0, mintAmt, false, { value: mintAmt })).revertedWith("blackhole ETH");
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("deposits, mints, repays, and withdraws", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var balBefore, _a, _b, balAfter, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                _b = (_a = token).balanceOf;
                                return [4 /*yield*/, minter.getAddress()];
                            case 1: return [4 /*yield*/, _b.apply(_a, [_e.sent()])];
                            case 2:
                                balBefore = _e.sent();
                                return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, false)];
                            case 3:
                                _e.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 4:
                                _e.sent();
                                return [4 /*yield*/, fairydust.connect(minter).repay(0, mintAmt, false)];
                            case 5:
                                _e.sent();
                                return [4 /*yield*/, fairydust.connect(minter).withdraw(depositAmt, false)];
                            case 6:
                                _e.sent();
                                _d = (_c = token).balanceOf;
                                return [4 /*yield*/, minter.getAddress()];
                            case 7: return [4 /*yield*/, _d.apply(_c, [_e.sent()])];
                            case 8:
                                balAfter = _e.sent();
                                expect(balBefore).equal(balAfter);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("deposits 5000 DAI, mints 1000 alUSD, and withdraws 3000 DAI", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var withdrawAmt, _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                withdrawAmt = depositAmt.sub(mintAmt.mul(2));
                                return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, false)];
                            case 1:
                                _d.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 2:
                                _d.sent();
                                return [4 /*yield*/, fairydust.connect(minter).withdraw(withdrawAmt, false)];
                            case 3:
                                _d.sent();
                                _a = expect;
                                _c = (_b = token).balanceOf;
                                return [4 /*yield*/, minter.getAddress()];
                            case 4: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                            case 5:
                                _a.apply(void 0, [_d.sent()]).equal(parseEther("13000"));
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("withdraws funds from the vault if needed", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var withdrawAmt, _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                withdrawAmt = depositAmt.sub(mintAmt.mul(2));
                                return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, false)];
                            case 1:
                                _d.sent();
                                return [4 /*yield*/, fairydust.connect(deployer).flush()];
                            case 2:
                                _d.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 3:
                                _d.sent();
                                return [4 /*yield*/, fairydust.connect(minter).withdraw(withdrawAmt, false)];
                            case 4:
                                _d.sent();
                                _a = expect;
                                _c = (_b = token).balanceOf;
                                return [4 /*yield*/, minter.getAddress()];
                            case 5: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                            case 6:
                                _a.apply(void 0, [_d.sent()]).equal(parseEther("13000"));
                                return [2 /*return*/];
                        }
                    });
                }); });
                describe("flushActivator", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, fairydust.connect(governance).setFlushActivator(parseEther("1000"))];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, token.connect(deployer).approve(fairydust.address, parseEther("1"))];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, token.connect(deployer).deposit({ value: parseEther("1") })];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, token.connect(minter).deposit({ value: parseEther("1000") })];
                                    case 4:
                                        _a.sent();
                                        return [4 /*yield*/, fairydust.connect(deployer).deposit(parseEther("1"), false)];
                                    case 5:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        it("deposit() flushes funds if amount >= flushActivator", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var balBeforeWhale, balAfterWhale;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, token.balanceOf(adapter.address)];
                                    case 1:
                                        balBeforeWhale = _a.sent();
                                        return [4 /*yield*/, fairydust.connect(minter).deposit(parseEther("1000"), false)];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, token.balanceOf(adapter.address)];
                                    case 3:
                                        balAfterWhale = _a.sent();
                                        expect(balBeforeWhale).equal(0);
                                        expect(balAfterWhale).equal(parseEther("1001"));
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        it("deposit() does not flush funds if amount < flushActivator", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var balBeforeWhale, balAfterWhale;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, token.balanceOf(adapter.address)];
                                    case 1:
                                        balBeforeWhale = _a.sent();
                                        return [4 /*yield*/, fairydust.connect(minter).deposit(parseEther("999"), false)];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, token.balanceOf(adapter.address)];
                                    case 3:
                                        balAfterWhale = _a.sent();
                                        expect(balBeforeWhale).equal(0);
                                        expect(balAfterWhale).equal(0);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); });
            });
            describe("ETH", function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(governance).setEmergencyExit(false)];
                            case 1:
                                _c.sent();
                                _b = (_a = fairydust.connect(governance)).setKeepers;
                                return [4 /*yield*/, deployer.getAddress()];
                            case 2: return [4 /*yield*/, _b.apply(_a, [[_c.sent()], [true]])];
                            case 3:
                                _c.sent();
                                return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                            case 4:
                                adapter = (_c.sent());
                                return [4 /*yield*/, fairydust.connect(governance).initialize(adapter.address)];
                            case 5:
                                _c.sent();
                                return [4 /*yield*/, fairydust
                                        .connect(governance)
                                        .setCollateralizationLimit(collateralizationLimit)];
                            case 6:
                                _c.sent();
                                return [4 /*yield*/, fEth.connect(deployer).setWhitelist(fairydust.address, true)];
                            case 7:
                                _c.sent();
                                return [4 /*yield*/, fEth.connect(deployer).setCeiling(fairydust.address, ceilingAmt)];
                            case 8:
                                _c.sent();
                                return [4 /*yield*/, fEth.connect(minter).approve(fairydust.address, parseEther("100000000"))];
                            case 9:
                                _c.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("deposited amount is accounted for correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, true, { value: depositAmt })];
                            case 1:
                                _d.sent();
                                _a = expect;
                                _c = (_b = fairydust
                                    .connect(minter)).getCdpTotalDeposited;
                                return [4 /*yield*/, minter.getAddress()];
                            case 2: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                            case 3:
                                _a.apply(void 0, [_d.sent()]).equal(depositAmt);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("deposits token and then withdraws all", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var balBefore, balAfter;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, minter.getBalance()];
                            case 1:
                                balBefore = _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, true, { value: depositAmt })];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).withdraw(depositAmt, true)];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, minter.getBalance()];
                            case 4:
                                balAfter = _a.sent();
                                expect(balBefore.sub(balAfter)).lt(epsilon);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("reverts when withdrawing too much", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var overdraft;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                overdraft = depositAmt.add(parseEther("1000"));
                                return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, true, { value: depositAmt })];
                            case 1:
                                _a.sent();
                                expect(fairydust.connect(minter).withdraw(overdraft, true)).revertedWith("SafeERC20: low-level call failed");
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("reverts when cdp is undercollateralized", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, true, { value: depositAmt })];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 2:
                                _a.sent();
                                expect(fairydust.connect(minter).withdraw(depositAmt, true)).revertedWith("Action blocked: unhealthy collateralization ratio");
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("reverts if ETH is sent when repaying with 0 ETH", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, false)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 2:
                                _a.sent();
                                expect(fairydust.connect(minter).repay(0, mintAmt, true, { value: mintAmt })).revertedWith("blackhole ETH");
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("deposits, mints, repays, and withdraws", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var balBefore, balAfter;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, minter.getBalance()];
                            case 1:
                                balBefore = _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, true, { value: depositAmt })];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).repay(0, mintAmt, true, { value: 0 })];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).withdraw(depositAmt, true)];
                            case 5:
                                _a.sent();
                                return [4 /*yield*/, minter.getBalance()];
                            case 6:
                                balAfter = _a.sent();
                                expect(balBefore.sub(balAfter)).lt(epsilon);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("deposits 5000 DAI, mints 1000 alUSD, and withdraws 3000 DAI", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var withdrawAmt, balBefore, balAfterDeposit, balAfterWithdrawl, amtWithdrawn;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                withdrawAmt = depositAmt.sub(mintAmt.mul(2));
                                return [4 /*yield*/, minter.getBalance()];
                            case 1:
                                balBefore = _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, true, { value: depositAmt })];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, minter.getBalance()];
                            case 3:
                                balAfterDeposit = _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).withdraw(withdrawAmt, true)];
                            case 5:
                                _a.sent();
                                return [4 /*yield*/, minter.getBalance()];
                            case 6:
                                balAfterWithdrawl = _a.sent();
                                amtWithdrawn = balAfterDeposit.sub(balAfterWithdrawl);
                                expect(amtWithdrawn.sub(parseEther("3000"))).lt(epsilon);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("withdraws funds from the vault if needed", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var withdrawAmt, balAfterDeposit, balAfterWithdrawl, amtWithdrawn;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                withdrawAmt = depositAmt.sub(mintAmt.mul(2));
                                return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, true, { value: depositAmt })];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(deployer).flush()];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, minter.getBalance()];
                            case 3:
                                balAfterDeposit = _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).withdraw(withdrawAmt, true)];
                            case 5:
                                _a.sent();
                                return [4 /*yield*/, minter.getBalance()];
                            case 6:
                                balAfterWithdrawl = _a.sent();
                                amtWithdrawn = balAfterDeposit.sub(balAfterWithdrawl);
                                expect(amtWithdrawn.sub(parseEther("3000"))).lt(epsilon);
                                return [2 /*return*/];
                        }
                    });
                }); });
                describe("flushActivator", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, fairydust.connect(governance).setFlushActivator(parseEther("1000"))];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, token.connect(deployer).approve(fairydust.address, parseEther("1"))];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, token.connect(deployer).deposit({ value: parseEther("1") })];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, token.connect(minter).deposit({ value: parseEther("1000") })];
                                    case 4:
                                        _a.sent();
                                        return [4 /*yield*/, fairydust.connect(deployer).deposit(parseEther("1"), true, { value: parseEther("1") })];
                                    case 5:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        it("depositEth() flushes funds if amount >= flushActivator", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var balBeforeWhale, alchBalBefore, balAfterWhale, alchBalAfter;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, token.balanceOf(adapter.address)];
                                    case 1:
                                        balBeforeWhale = _a.sent();
                                        return [4 /*yield*/, token.balanceOf(fairydust.address)];
                                    case 2:
                                        alchBalBefore = _a.sent();
                                        return [4 /*yield*/, fairydust.connect(minter).deposit(parseEther("1000"), true, { value: parseEther("1000") })];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, token.balanceOf(adapter.address)];
                                    case 4:
                                        balAfterWhale = _a.sent();
                                        return [4 /*yield*/, token.balanceOf(fairydust.address)];
                                    case 5:
                                        alchBalAfter = _a.sent();
                                        expect(balBeforeWhale).equal(0);
                                        expect(balAfterWhale).equal(parseEther("1001"));
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        it("depositEth() does not flush funds if amount < flushActivator", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var balBeforeWhale, balAfterWhale;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, token.balanceOf(adapter.address)];
                                    case 1:
                                        balBeforeWhale = _a.sent();
                                        return [4 /*yield*/, fairydust.connect(minter).deposit(parseEther("999"), true, { value: parseEther("999") })];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, token.balanceOf(adapter.address)];
                                    case 3:
                                        balAfterWhale = _a.sent();
                                        expect(balBeforeWhale).equal(0);
                                        expect(balAfterWhale).equal(0);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); });
            });
        });
        describe("repay and liquidate tokens", function () {
            var depositAmt = parseEther("5000");
            var mintAmt = parseEther("1000");
            var ceilingAmt = parseEther("10000");
            var collateralizationLimit = "2000000000000000000"; // this should be set in the deploy sequence
            describe("WETH", function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(governance).setEmergencyExit(false)];
                            case 1:
                                _c.sent();
                                _b = (_a = fairydust.connect(governance)).setKeepers;
                                return [4 /*yield*/, deployer.getAddress()];
                            case 2: return [4 /*yield*/, _b.apply(_a, [[_c.sent()], [true]])];
                            case 3:
                                _c.sent();
                                return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                            case 4:
                                adapter = (_c.sent());
                                return [4 /*yield*/, fairydust.connect(governance).initialize(adapter.address)];
                            case 5:
                                _c.sent();
                                return [4 /*yield*/, fairydust
                                        .connect(governance)
                                        .setCollateralizationLimit(collateralizationLimit)];
                            case 6:
                                _c.sent();
                                return [4 /*yield*/, fEth.connect(deployer).setWhitelist(fairydust.address, true)];
                            case 7:
                                _c.sent();
                                return [4 /*yield*/, fEth.connect(deployer).setCeiling(fairydust.address, ceilingAmt)];
                            case 8:
                                _c.sent();
                                return [4 /*yield*/, token.connect(minter).deposit({ value: ceilingAmt })];
                            case 9:
                                _c.sent();
                                return [4 /*yield*/, token.connect(minter).approve(fairydust.address, ceilingAmt)];
                            case 10:
                                _c.sent();
                                return [4 /*yield*/, fEth.connect(minter).approve(fairydust.address, parseEther("100000000"))];
                            case 11:
                                _c.sent();
                                return [4 /*yield*/, token.connect(minter).approve(transmuterContract.address, ceilingAmt)];
                            case 12:
                                _c.sent();
                                return [4 /*yield*/, fEth.connect(minter).approve(transmuterContract.address, depositAmt)];
                            case 13:
                                _c.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("repay with dai reverts when repayment amount is greater than debt", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt.sub(parseEther("1000")), false)];
                            case 1:
                                _a.sent();
                                expect(fairydust.connect(minter).repay(mintAmt, 0, false)).revertedWith("SafeMath: subtraction overflow");
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("liquidate max amount possible if trying to liquidate too much", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var liqAmt, transBal;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                liqAmt = depositAmt;
                                return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, false)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, transmuterContract.connect(minter).stake(mintAmt)];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).liquidate(liqAmt)];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, token.balanceOf(transmuterContract.address)];
                            case 5:
                                transBal = _a.sent();
                                expect(transBal).equal(mintAmt);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("liquidates funds from vault if not enough in the buffer", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var liqAmt, fairydustTokenBalPre, fairydustTokenBalPost, transmuterEndingTokenBal;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                liqAmt = parseEther("600");
                                return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, false)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(deployer).flush()];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).deposit(mintAmt.div(2), false)];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, transmuterContract.connect(minter).stake(mintAmt)];
                            case 5:
                                _a.sent();
                                return [4 /*yield*/, token.balanceOf(fairydust.address)];
                            case 6:
                                fairydustTokenBalPre = _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).liquidate(liqAmt)];
                            case 7:
                                _a.sent();
                                return [4 /*yield*/, token.balanceOf(fairydust.address)];
                            case 8:
                                fairydustTokenBalPost = _a.sent();
                                return [4 /*yield*/, token.balanceOf(transmuterContract.address)];
                            case 9:
                                transmuterEndingTokenBal = _a.sent();
                                expect(fairydustTokenBalPost).equal(0);
                                expect(transmuterEndingTokenBal).equal(liqAmt);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("liquidates the minimum necessary from the fairydust buffer", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var dep2Amt, liqAmt, fairydustTokenBalPre, fairydustTokenBalPost, transmuterEndingTokenBal;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                dep2Amt = parseEther("50");
                                liqAmt = parseEther("20");
                                return [4 /*yield*/, fairydust.connect(minter).deposit(parseEther("200"), false)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(deployer).flush()];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).deposit(dep2Amt, false)];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(parseEther("100"))];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, transmuterContract.connect(minter).stake(parseEther("100"))];
                            case 5:
                                _a.sent();
                                return [4 /*yield*/, token.balanceOf(fairydust.address)];
                            case 6:
                                fairydustTokenBalPre = _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).liquidate(liqAmt)];
                            case 7:
                                _a.sent();
                                return [4 /*yield*/, token.balanceOf(fairydust.address)];
                            case 8:
                                fairydustTokenBalPost = _a.sent();
                                return [4 /*yield*/, token.balanceOf(transmuterContract.address)];
                            case 9:
                                transmuterEndingTokenBal = _a.sent();
                                expect(fairydustTokenBalPre).equal(dep2Amt);
                                expect(fairydustTokenBalPost).equal(dep2Amt.sub(liqAmt));
                                expect(transmuterEndingTokenBal).equal(liqAmt);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("deposits, mints fEth, repays, and has no outstanding debt", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt.sub(parseEther("1000")), false)];
                            case 1:
                                _d.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 2:
                                _d.sent();
                                return [4 /*yield*/, transmuterContract.connect(minter).stake(mintAmt)];
                            case 3:
                                _d.sent();
                                return [4 /*yield*/, fairydust.connect(minter).repay(mintAmt, 0, false)];
                            case 4:
                                _d.sent();
                                _a = expect;
                                _c = (_b = fairydust.connect(minter)).getCdpTotalDebt;
                                return [4 /*yield*/, minter.getAddress()];
                            case 5: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                            case 6:
                                _a.apply(void 0, [_d.sent()]).equal(0);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("deposits, mints, repays, and has no outstanding debt", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, false)];
                            case 1:
                                _d.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 2:
                                _d.sent();
                                return [4 /*yield*/, fairydust.connect(minter).repay(0, mintAmt, false)];
                            case 3:
                                _d.sent();
                                _a = expect;
                                _c = (_b = fairydust
                                    .connect(minter)).getCdpTotalDebt;
                                return [4 /*yield*/, minter.getAddress()];
                            case 4: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                            case 5:
                                _a.apply(void 0, [_d.sent()]).equal(0);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("deposits, mints fEth, repays with fEth and DAI, and has no outstanding debt", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt.sub(parseEther("1000")), false)];
                            case 1:
                                _d.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 2:
                                _d.sent();
                                return [4 /*yield*/, transmuterContract.connect(minter).stake(parseEther("500"))];
                            case 3:
                                _d.sent();
                                return [4 /*yield*/, fairydust.connect(minter).repay(parseEther("500"), parseEther("500"), false)];
                            case 4:
                                _d.sent();
                                _a = expect;
                                _c = (_b = fairydust.connect(minter)).getCdpTotalDebt;
                                return [4 /*yield*/, minter.getAddress()];
                            case 5: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                            case 6:
                                _a.apply(void 0, [_d.sent()]).equal(0);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("deposits and liquidates DAI", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, false)];
                            case 1:
                                _d.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 2:
                                _d.sent();
                                return [4 /*yield*/, transmuterContract.connect(minter).stake(mintAmt)];
                            case 3:
                                _d.sent();
                                return [4 /*yield*/, fairydust.connect(minter).liquidate(mintAmt)];
                            case 4:
                                _d.sent();
                                _a = expect;
                                _c = (_b = fairydust.connect(minter)).getCdpTotalDeposited;
                                return [4 /*yield*/, minter.getAddress()];
                            case 5: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                            case 6:
                                _a.apply(void 0, [_d.sent()]).equal(depositAmt.sub(mintAmt));
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe("ETH", function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(governance).setEmergencyExit(false)];
                            case 1:
                                _c.sent();
                                _b = (_a = fairydust.connect(governance)).setKeepers;
                                return [4 /*yield*/, deployer.getAddress()];
                            case 2: return [4 /*yield*/, _b.apply(_a, [[_c.sent()], [true]])];
                            case 3:
                                _c.sent();
                                return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                            case 4:
                                adapter = (_c.sent());
                                return [4 /*yield*/, fairydust.connect(governance).initialize(adapter.address)];
                            case 5:
                                _c.sent();
                                return [4 /*yield*/, fairydust
                                        .connect(governance)
                                        .setCollateralizationLimit(collateralizationLimit)];
                            case 6:
                                _c.sent();
                                return [4 /*yield*/, fEth.connect(deployer).setWhitelist(fairydust.address, true)];
                            case 7:
                                _c.sent();
                                return [4 /*yield*/, fEth.connect(deployer).setCeiling(fairydust.address, ceilingAmt)];
                            case 8:
                                _c.sent();
                                return [4 /*yield*/, fEth.connect(minter).approve(fairydust.address, parseEther("100000000"))];
                            case 9:
                                _c.sent();
                                return [4 /*yield*/, fEth.connect(minter).approve(transmuterContract.address, depositAmt)];
                            case 10:
                                _c.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("repay with dai reverts when repayment amount is greater than debt", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt.sub(parseEther("1000")), true, { value: depositAmt.sub(parseEther("1000")) })];
                            case 1:
                                _a.sent();
                                expect(fairydust.connect(minter).repay(mintAmt, 0, true, { value: mintAmt })).revertedWith("SafeMath: subtraction overflow");
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("liquidate max amount possible if trying to liquidate too much", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var liqAmt, transBal;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                liqAmt = depositAmt;
                                return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, true, { value: depositAmt })];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, transmuterContract.connect(minter).stake(mintAmt)];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).liquidate(liqAmt)];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, token.balanceOf(transmuterContract.address)];
                            case 5:
                                transBal = _a.sent();
                                expect(transBal).equal(mintAmt);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("liquidates funds from vault if not enough in the buffer", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var liqAmt, fairydustTokenBalPre, fairydustTokenBalPost, transmuterEndingTokenBal;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                liqAmt = parseEther("600");
                                return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, true, { value: depositAmt })];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(deployer).flush()];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).deposit(mintAmt.div(2), true, { value: mintAmt.div(2) })];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, transmuterContract.connect(minter).stake(mintAmt)];
                            case 5:
                                _a.sent();
                                return [4 /*yield*/, token.balanceOf(fairydust.address)];
                            case 6:
                                fairydustTokenBalPre = _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).liquidate(liqAmt)];
                            case 7:
                                _a.sent();
                                return [4 /*yield*/, token.balanceOf(fairydust.address)];
                            case 8:
                                fairydustTokenBalPost = _a.sent();
                                return [4 /*yield*/, token.balanceOf(transmuterContract.address)];
                            case 9:
                                transmuterEndingTokenBal = _a.sent();
                                expect(fairydustTokenBalPost).equal(0);
                                expect(transmuterEndingTokenBal).equal(liqAmt);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("liquidates the minimum necessary from the fairydust buffer", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var dep2Amt, liqAmt, fairydustTokenBalPre, fairydustTokenBalPost, transmuterEndingTokenBal;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                dep2Amt = parseEther("50");
                                liqAmt = parseEther("20");
                                return [4 /*yield*/, fairydust.connect(minter).deposit(parseEther("200"), true, { value: parseEther("200") })];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(deployer).flush()];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).deposit(dep2Amt, true, { value: dep2Amt })];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(parseEther("100"))];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, transmuterContract.connect(minter).stake(parseEther("100"))];
                            case 5:
                                _a.sent();
                                return [4 /*yield*/, token.balanceOf(fairydust.address)];
                            case 6:
                                fairydustTokenBalPre = _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).liquidate(liqAmt)];
                            case 7:
                                _a.sent();
                                return [4 /*yield*/, token.balanceOf(fairydust.address)];
                            case 8:
                                fairydustTokenBalPost = _a.sent();
                                return [4 /*yield*/, token.balanceOf(transmuterContract.address)];
                            case 9:
                                transmuterEndingTokenBal = _a.sent();
                                expect(fairydustTokenBalPre).equal(dep2Amt);
                                expect(fairydustTokenBalPost).equal(dep2Amt.sub(liqAmt));
                                expect(transmuterEndingTokenBal).equal(liqAmt);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("deposits, mints fEth, repays, and has no outstanding debt", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt.sub(parseEther("1000")), true, { value: depositAmt.sub(parseEther("1000")) })];
                            case 1:
                                _d.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 2:
                                _d.sent();
                                return [4 /*yield*/, transmuterContract.connect(minter).stake(mintAmt)];
                            case 3:
                                _d.sent();
                                return [4 /*yield*/, fairydust.connect(minter).repay(mintAmt, 0, true, { value: mintAmt })];
                            case 4:
                                _d.sent();
                                _a = expect;
                                _c = (_b = fairydust.connect(minter)).getCdpTotalDebt;
                                return [4 /*yield*/, minter.getAddress()];
                            case 5: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                            case 6:
                                _a.apply(void 0, [_d.sent()]).equal(0);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("deposits, mints, repays, and has no outstanding debt", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, true, { value: depositAmt })];
                            case 1:
                                _d.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 2:
                                _d.sent();
                                return [4 /*yield*/, fairydust.connect(minter).repay(0, mintAmt, true, { value: 0 })];
                            case 3:
                                _d.sent();
                                _a = expect;
                                _c = (_b = fairydust
                                    .connect(minter)).getCdpTotalDebt;
                                return [4 /*yield*/, minter.getAddress()];
                            case 4: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                            case 5:
                                _a.apply(void 0, [_d.sent()]).equal(0);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("deposits, mints fEth, repays with fEth and ETH, and has no outstanding debt", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt.sub(parseEther("1000")), false)];
                            case 1:
                                _d.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 2:
                                _d.sent();
                                return [4 /*yield*/, transmuterContract.connect(minter).stake(parseEther("500"))];
                            case 3:
                                _d.sent();
                                return [4 /*yield*/, fairydust.connect(minter).repay(parseEther("500"), parseEther("500"), true, { value: parseEther("500") })];
                            case 4:
                                _d.sent();
                                _a = expect;
                                _c = (_b = fairydust.connect(minter)).getCdpTotalDebt;
                                return [4 /*yield*/, minter.getAddress()];
                            case 5: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                            case 6:
                                _a.apply(void 0, [_d.sent()]).equal(0);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("deposits and liquidates DAI", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, false)];
                            case 1:
                                _d.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 2:
                                _d.sent();
                                return [4 /*yield*/, transmuterContract.connect(minter).stake(mintAmt)];
                            case 3:
                                _d.sent();
                                return [4 /*yield*/, fairydust.connect(minter).liquidate(mintAmt)];
                            case 4:
                                _d.sent();
                                _a = expect;
                                _c = (_b = fairydust.connect(minter)).getCdpTotalDeposited;
                                return [4 /*yield*/, minter.getAddress()];
                            case 5: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                            case 6:
                                _a.apply(void 0, [_d.sent()]).equal(depositAmt.sub(mintAmt));
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe("mint", function () {
            var depositAmt = parseEther("5000");
            var mintAmt = parseEther("1000");
            var ceilingAmt = parseEther("1000");
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, fairydust.connect(governance).setEmergencyExit(false)];
                        case 1:
                            _c.sent();
                            _b = (_a = fairydust.connect(governance)).setKeepers;
                            return [4 /*yield*/, deployer.getAddress()];
                        case 2: return [4 /*yield*/, _b.apply(_a, [[_c.sent()], [true]])];
                        case 3:
                            _c.sent();
                            return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                        case 4:
                            adapter = (_c.sent());
                            return [4 /*yield*/, fairydust.connect(governance).initialize(adapter.address)];
                        case 5:
                            _c.sent();
                            return [4 /*yield*/, fEth.connect(deployer).setCeiling(fairydust.address, ceilingAmt)];
                        case 6:
                            _c.sent();
                            return [4 /*yield*/, token.connect(minter).deposit({ value: depositAmt })];
                        case 7:
                            _c.sent();
                            return [4 /*yield*/, token.connect(minter).approve(fairydust.address, depositAmt)];
                        case 8:
                            _c.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("reverts if the fairydust is not whitelisted", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, false)];
                        case 1:
                            _a.sent();
                            expect(fairydust.connect(minter).mint(mintAmt)).revertedWith("fEth: fairydust is not whitelisted");
                            return [2 /*return*/];
                    }
                });
            }); });
            context("is whitelisted", function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fEth.connect(deployer).setWhitelist(fairydust.address, true)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("reverts if the fairydust is paused", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fEth.connect(deployer).pausefairydust(fairydust.address, true)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, false)];
                            case 2:
                                _a.sent();
                                expect(fairydust.connect(minter).mint(mintAmt)).revertedWith("fEth: fairydust is currently paused.");
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("reverts when trying to mint too much", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(fairydust.connect(minter).mint(parseEther("2000"))).revertedWith("Loan-to-value ratio breached");
                        return [2 /*return*/];
                    });
                }); });
                it("reverts if the ceiling was breached", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var lowCeilingAmt;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                lowCeilingAmt = parseEther("100");
                                return [4 /*yield*/, fEth
                                        .connect(deployer)
                                        .setCeiling(fairydust.address, lowCeilingAmt)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, false)];
                            case 2:
                                _a.sent();
                                expect(fairydust.connect(minter).mint(mintAmt)).revertedWith("fEth: fairydust's ceiling was breached");
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("mints successfully to depositor", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var balBefore, _a, _b, balAfter, _c, _d, _e, _f, _g;
                    return __generator(this, function (_h) {
                        switch (_h.label) {
                            case 0:
                                _b = (_a = token).balanceOf;
                                return [4 /*yield*/, minter.getAddress()];
                            case 1: return [4 /*yield*/, _b.apply(_a, [_h.sent()])];
                            case 2:
                                balBefore = _h.sent();
                                return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, false)];
                            case 3:
                                _h.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 4:
                                _h.sent();
                                _d = (_c = token).balanceOf;
                                return [4 /*yield*/, minter.getAddress()];
                            case 5: return [4 /*yield*/, _d.apply(_c, [_h.sent()])];
                            case 6:
                                balAfter = _h.sent();
                                expect(balAfter).equal(balBefore.sub(depositAmt));
                                _e = expect;
                                _g = (_f = fEth).balanceOf;
                                return [4 /*yield*/, minter.getAddress()];
                            case 7: return [4 /*yield*/, _g.apply(_f, [_h.sent()])];
                            case 8:
                                _e.apply(void 0, [_h.sent()]).equal(mintAmt);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("reduces credit if user has credit", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var mintAmt, deployerDepositAmt, yieldAmt, creditAfterHarvest, _a, _b, creditAfterMint, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, false)];
                            case 1:
                                _e.sent();
                                mintAmt = parseEther("100");
                                deployerDepositAmt = parseEther("1000");
                                yieldAmt = parseEther("500");
                                return [4 /*yield*/, token.connect(deployer).deposit({ value: yieldAmt })];
                            case 2:
                                _e.sent();
                                return [4 /*yield*/, token.connect(deployer).transfer(adapter.address, yieldAmt)];
                            case 3:
                                _e.sent();
                                return [4 /*yield*/, fairydust.connect(deployer).deposit(deployerDepositAmt, true, { value: deployerDepositAmt })];
                            case 4:
                                _e.sent();
                                return [4 /*yield*/, fairydust.connect(deployer).mint(deployerDepositAmt.div(4))];
                            case 5:
                                _e.sent();
                                return [4 /*yield*/, fairydust.connect(deployer).harvest(0)];
                            case 6:
                                _e.sent();
                                _b = (_a = fairydust).getCdpTotalCredit;
                                return [4 /*yield*/, minter.getAddress()];
                            case 7: return [4 /*yield*/, _b.apply(_a, [_e.sent()])];
                            case 8:
                                creditAfterHarvest = _e.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                            case 9:
                                _e.sent();
                                _d = (_c = fairydust).getCdpTotalCredit;
                                return [4 /*yield*/, minter.getAddress()];
                            case 10: return [4 /*yield*/, _d.apply(_c, [_e.sent()])];
                            case 11:
                                creditAfterMint = _e.sent();
                                expect(creditAfterMint).equal(creditAfterHarvest.sub(mintAmt));
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("changing the min-c-ratio allows the user to borrow more", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var depositAmount, mintAmount, balAfter, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                depositAmount = parseEther("500");
                                mintAmount = depositAmount.div(4);
                                return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmount, false)];
                            case 1:
                                _c.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmount)];
                            case 2:
                                _c.sent();
                                expect(fairydust.connect(minter).mint(mintAmount)).revertedWith("fairydust: Loan-to-value ratio breached");
                                return [4 /*yield*/, fairydust.connect(governance).setCollateralizationLimit("2000000000000000000")];
                            case 3:
                                _c.sent();
                                return [4 /*yield*/, fairydust.connect(minter).mint(mintAmount)];
                            case 4:
                                _c.sent();
                                _b = (_a = fEth).balanceOf;
                                return [4 /*yield*/, minter.getAddress()];
                            case 5: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                            case 6:
                                balAfter = _c.sent();
                                expect(balAfter).equal(depositAmount.div(2));
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe("harvest", function () {
            var depositAmt = parseEther("5000");
            var mintAmt = parseEther("1000");
            var stakeAmt = mintAmt.div(2);
            var ceilingAmt = parseEther("10000");
            var yieldAmt = parseEther("100");
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, fairydust.connect(governance).setEmergencyExit(false)];
                        case 1:
                            _c.sent();
                            _b = (_a = fairydust.connect(governance)).setKeepers;
                            return [4 /*yield*/, deployer.getAddress()];
                        case 2: return [4 /*yield*/, _b.apply(_a, [[_c.sent()], [true]])];
                        case 3:
                            _c.sent();
                            return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                        case 4:
                            adapter = (_c.sent());
                            return [4 /*yield*/, fEth.connect(deployer).setWhitelist(fairydust.address, true)];
                        case 5:
                            _c.sent();
                            return [4 /*yield*/, fairydust.connect(governance).initialize(adapter.address)];
                        case 6:
                            _c.sent();
                            return [4 /*yield*/, fEth.connect(deployer).setCeiling(fairydust.address, ceilingAmt)];
                        case 7:
                            _c.sent();
                            return [4 /*yield*/, token.connect(minter).deposit({ value: depositAmt })];
                        case 8:
                            _c.sent();
                            return [4 /*yield*/, token.connect(minter).approve(fairydust.address, depositAmt)];
                        case 9:
                            _c.sent();
                            return [4 /*yield*/, fEth.connect(minter).approve(transmuterContract.address, depositAmt)];
                        case 10:
                            _c.sent();
                            return [4 /*yield*/, fairydust.connect(minter).deposit(depositAmt, false)];
                        case 11:
                            _c.sent();
                            return [4 /*yield*/, fairydust.connect(minter).mint(mintAmt)];
                        case 12:
                            _c.sent();
                            return [4 /*yield*/, transmuterContract.connect(minter).stake(stakeAmt)];
                        case 13:
                            _c.sent();
                            return [4 /*yield*/, fairydust.connect(deployer).flush()];
                        case 14:
                            _c.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("reverts if the caller is not whitelisted", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    expect(fairydust.connect(minter).harvest(0)).revertedWith("fairydust: only keepers.");
                    return [2 /*return*/];
                });
            }); });
            it("harvests yield from the vault", function () { return __awaiter(void 0, void 0, void 0, function () {
                var transmuterBal, vaultBal;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, token.connect(deployer).deposit({ value: yieldAmt })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, token.connect(deployer).transfer(adapter.address, yieldAmt)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, fairydust.connect(deployer).harvest(0)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, token.balanceOf(transmuterContract.address)];
                        case 4:
                            transmuterBal = _a.sent();
                            expect(transmuterBal).equal(yieldAmt.sub(yieldAmt.div(pctReso / harvestFee)));
                            return [4 /*yield*/, token.balanceOf(adapter.address)];
                        case 5:
                            vaultBal = _a.sent();
                            expect(vaultBal).equal(depositAmt);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("sends the harvest fee to the rewards address", function () { return __awaiter(void 0, void 0, void 0, function () {
                var rewardsBal, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, token.connect(deployer).deposit({ value: yieldAmt })];
                        case 1:
                            _c.sent();
                            return [4 /*yield*/, token.connect(deployer).transfer(adapter.address, yieldAmt)];
                        case 2:
                            _c.sent();
                            return [4 /*yield*/, fairydust.connect(deployer).harvest(0)];
                        case 3:
                            _c.sent();
                            _b = (_a = token).balanceOf;
                            return [4 /*yield*/, rewards.getAddress()];
                        case 4: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                        case 5:
                            rewardsBal = _c.sent();
                            expect(rewardsBal).equal(yieldAmt.mul(100).div(harvestFee));
                            return [2 /*return*/];
                    }
                });
            }); });
            it("does not update any balances if there is nothing to harvest", function () { return __awaiter(void 0, void 0, void 0, function () {
                var initTransBal, initRewardsBal, _a, _b, endTransBal, endRewardsBal, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, token.balanceOf(transmuterContract.address)];
                        case 1:
                            initTransBal = _e.sent();
                            _b = (_a = token).balanceOf;
                            return [4 /*yield*/, rewards.getAddress()];
                        case 2: return [4 /*yield*/, _b.apply(_a, [_e.sent()])];
                        case 3:
                            initRewardsBal = _e.sent();
                            return [4 /*yield*/, fairydust.connect(deployer).harvest(0)];
                        case 4:
                            _e.sent();
                            return [4 /*yield*/, token.balanceOf(transmuterContract.address)];
                        case 5:
                            endTransBal = _e.sent();
                            _d = (_c = token).balanceOf;
                            return [4 /*yield*/, rewards.getAddress()];
                        case 6: return [4 /*yield*/, _d.apply(_c, [_e.sent()])];
                        case 7:
                            endRewardsBal = _e.sent();
                            expect(initTransBal).equal(endTransBal);
                            expect(initRewardsBal).equal(endRewardsBal);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("convert", function () {
            var convertAmt = parseEther("500");
            var ceilingAmt = parseEther("1000");
            var epsilon = parseEther(".1"); // margin of difference for gas
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, fairydust.connect(governance).setEmergencyExit(false)];
                        case 1:
                            _c.sent();
                            _b = (_a = fairydust.connect(governance)).setKeepers;
                            return [4 /*yield*/, deployer.getAddress()];
                        case 2: return [4 /*yield*/, _b.apply(_a, [[_c.sent()], [true]])];
                        case 3:
                            _c.sent();
                            return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                        case 4:
                            adapter = (_c.sent());
                            return [4 /*yield*/, fairydust.connect(governance).initialize(adapter.address)];
                        case 5:
                            _c.sent();
                            return [4 /*yield*/, fEth.connect(deployer).setCeiling(fairydust.address, ceilingAmt)];
                        case 6:
                            _c.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fEth.connect(deployer).setWhitelist(fairydust.address, true)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, token.connect(minter).deposit({ value: convertAmt })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, token.connect(deployer).deposit({ value: convertAmt })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, token.connect(minter).approve(fairydust.address, convertAmt)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, token.connect(deployer).approve(fairydust.address, convertAmt)];
                        case 5:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("reverts if the fairydust convert call is paused", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    expect(fairydust.connect(minter).convert(convertAmt, false)).revertedWith("fairydust: conversions are paused.");
                    return [2 /*return*/];
                });
            }); });
            context("convert() is unpaused", function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fairydust.connect(governance).setPauseConvert(false)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("reverts if the fairydust is paused", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fEth.connect(deployer).pausefairydust(fairydust.address, true)];
                            case 1:
                                _a.sent();
                                expect(fairydust.connect(minter).convert(convertAmt, false)).revertedWith("fEth: fairydust is currently paused.");
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("reverts if ETH is sent with the convert() call", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(fairydust.connect(minter).convert(convertAmt, false, { value: convertAmt })).revertedWith("msg.value != 0");
                        return [2 /*return*/];
                    });
                }); });
                it("does not revert if the ceiling was breached", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var lowCeilingAmt;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                lowCeilingAmt = parseEther("100");
                                return [4 /*yield*/, fEth.connect(deployer).setCeiling(fairydust.address, lowCeilingAmt)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).convert(convertAmt, false)
                                    // test passes if does not revert
                                ];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("mints successfully to depositor (ETH input)", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var balBefore, balAfter, _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, minter.getBalance()];
                            case 1:
                                balBefore = _d.sent();
                                return [4 /*yield*/, fairydust.connect(minter).convert(convertAmt, true, { value: convertAmt })];
                            case 2:
                                _d.sent();
                                return [4 /*yield*/, minter.getBalance()];
                            case 3:
                                balAfter = _d.sent();
                                expect(balAfter.sub(balBefore.sub(convertAmt))).lt(epsilon);
                                _a = expect;
                                _c = (_b = fEth).balanceOf;
                                return [4 /*yield*/, minter.getAddress()];
                            case 4: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                            case 5:
                                _a.apply(void 0, [_d.sent()]).equal(convertAmt);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("mints successfully to depositor (WETH input)", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var balBefore, _a, _b, balAfter, _c, _d, _e, _f, _g;
                    return __generator(this, function (_h) {
                        switch (_h.label) {
                            case 0:
                                _b = (_a = token).balanceOf;
                                return [4 /*yield*/, minter.getAddress()];
                            case 1: return [4 /*yield*/, _b.apply(_a, [_h.sent()])];
                            case 2:
                                balBefore = _h.sent();
                                return [4 /*yield*/, fairydust.connect(minter).convert(convertAmt, false)];
                            case 3:
                                _h.sent();
                                _d = (_c = token).balanceOf;
                                return [4 /*yield*/, minter.getAddress()];
                            case 4: return [4 /*yield*/, _d.apply(_c, [_h.sent()])];
                            case 5:
                                balAfter = _h.sent();
                                expect(balAfter).equal(balBefore.sub(convertAmt));
                                _e = expect;
                                _g = (_f = fEth).balanceOf;
                                return [4 /*yield*/, minter.getAddress()];
                            case 6: return [4 /*yield*/, _g.apply(_f, [_h.sent()])];
                            case 7:
                                _e.apply(void 0, [_h.sent()]).equal(convertAmt);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("user's credit and debt do not change", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var deployerDepositAmt, yieldAmt, creditBeforeConvert, _a, _b, debtBeforeConvert, _c, _d, creditAfterConvert, _e, _f, debtAfterConvert, _g, _h;
                    return __generator(this, function (_j) {
                        switch (_j.label) {
                            case 0:
                                deployerDepositAmt = parseEther("100");
                                yieldAmt = parseEther("500");
                                return [4 /*yield*/, token.connect(deployer).deposit({ value: yieldAmt })];
                            case 1:
                                _j.sent();
                                return [4 /*yield*/, token.connect(deployer).transfer(adapter.address, yieldAmt)];
                            case 2:
                                _j.sent();
                                return [4 /*yield*/, fairydust.connect(deployer).deposit(deployerDepositAmt, true, { value: deployerDepositAmt })];
                            case 3:
                                _j.sent();
                                return [4 /*yield*/, fairydust.connect(deployer).mint(deployerDepositAmt.div(4))];
                            case 4:
                                _j.sent();
                                return [4 /*yield*/, fairydust.connect(deployer).harvest(0)];
                            case 5:
                                _j.sent();
                                _b = (_a = fairydust).getCdpTotalCredit;
                                return [4 /*yield*/, minter.getAddress()];
                            case 6: return [4 /*yield*/, _b.apply(_a, [_j.sent()])];
                            case 7:
                                creditBeforeConvert = _j.sent();
                                _d = (_c = fairydust).getCdpTotalCredit;
                                return [4 /*yield*/, minter.getAddress()];
                            case 8: return [4 /*yield*/, _d.apply(_c, [_j.sent()])];
                            case 9:
                                debtBeforeConvert = _j.sent();
                                return [4 /*yield*/, fairydust.connect(minter).convert(convertAmt, false)];
                            case 10:
                                _j.sent();
                                _f = (_e = fairydust).getCdpTotalCredit;
                                return [4 /*yield*/, minter.getAddress()];
                            case 11: return [4 /*yield*/, _f.apply(_e, [_j.sent()])];
                            case 12:
                                creditAfterConvert = _j.sent();
                                _h = (_g = fairydust).getCdpTotalCredit;
                                return [4 /*yield*/, minter.getAddress()];
                            case 13: return [4 /*yield*/, _h.apply(_g, [_j.sent()])];
                            case 14:
                                debtAfterConvert = _j.sent();
                                expect(creditAfterConvert).equal(creditBeforeConvert);
                                expect(debtAfterConvert).equal(debtBeforeConvert);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("deposited funds get sent to the transmuter", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var balBefore, balAfter;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, token.balanceOf(transmuterContract.address)];
                            case 1:
                                balBefore = _a.sent();
                                return [4 /*yield*/, fairydust.connect(minter).convert(convertAmt, false)];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, token.balanceOf(transmuterContract.address)];
                            case 3:
                                balAfter = _a.sent();
                                expect(balBefore).equal(0);
                                expect(balAfter).equal(convertAmt);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
    });
});
