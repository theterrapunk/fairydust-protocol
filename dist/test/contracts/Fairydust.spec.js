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
var FUSDFactory;
var ERC20MockFactory;
var VaultAdapterMockFactory;
var TransmuterFactory;
var YearnVaultAdapterFactory;
var YearnVaultMockFactory;
var YearnControllerMockFactory;
describe("Fairydust", function () {
    var signers;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getContractFactory("Fairydust")];
                case 1:
                    FairydustFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("Transmuter")];
                case 2:
                    TransmuterFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("FToken")];
                case 3:
                    FUSDFactory = _a.sent();
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
        var deployer, governance, sentinel, token, fUsd, Fairydust;
        return __generator(this, function (_a) {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = signers, deployer = _a[0], governance = _a[1], sentinel = _a[2], signers = _a.slice(3);
                            return [4 /*yield*/, ERC20MockFactory.connect(deployer).deploy("Mock DAI", "DAI", 18)];
                        case 1:
                            token = (_b.sent());
                            return [4 /*yield*/, FUSDFactory.connect(deployer).deploy()];
                        case 2:
                            fUsd = (_b.sent());
                            return [2 /*return*/];
                    }
                });
            }); });
            // it("copies the decimals of the base asset", async () => {
            //   expect(await Fairydust.decimals()).equal(await token.decimals());
            // });
            context("when governance is the zero address", function () {
                it("reverts", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                _a = expect;
                                _c = (_b = FairydustFactory.connect(deployer)).deploy;
                                _d = [token.address,
                                    fUsd.address,
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
        var fUsd;
        var Fairydust;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _d = signers, deployer = _d[0], governance = _d[1], newGovernance = _d[2], rewards = _d[3], sentinel = _d[4], transmuter = _d[5], signers = _d.slice(6);
                        return [4 /*yield*/, ERC20MockFactory.connect(deployer).deploy("Mock DAI", "DAI", 18)];
                    case 1:
                        token = (_e.sent());
                        return [4 /*yield*/, FUSDFactory.connect(deployer).deploy()];
                    case 2:
                        fUsd = (_e.sent());
                        _b = (_a = FairydustFactory.connect(deployer)).deploy;
                        _c = [token.address,
                            fUsd.address];
                        return [4 /*yield*/, governance.getAddress()];
                    case 3:
                        _c = _c.concat([_e.sent()]);
                        return [4 /*yield*/, sentinel.getAddress()];
                    case 4: return [4 /*yield*/, _b.apply(_a, _c.concat([_e.sent()]))];
                    case 5:
                        Fairydust = (_e.sent());
                        return [2 /*return*/];
                }
            });
        }); });
        describe("set governance", function () {
            context("when caller is not current governance", function () {
                beforeEach(function () { return (Fairydust = Fairydust.connect(deployer)); });
                it("reverts", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _a = expect;
                                _c = (_b = Fairydust).setPendingGovernance;
                                return [4 /*yield*/, newGovernance.getAddress()];
                            case 1:
                                _a.apply(void 0, [_c.apply(_b, [_d.sent()])]).revertedWith("Fairydust: only governance");
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            context("when caller is current governance", function () {
                beforeEach(function () { return (Fairydust = Fairydust.connect(governance)); });
                it("reverts when setting governance to zero address", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(Fairydust.setPendingGovernance(helpers_1.ZERO_ADDRESS)).revertedWith("Fairydust: governance address cannot be 0x0.");
                        return [2 /*return*/];
                    });
                }); });
                it("updates rewards", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c, _d, _e;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                _b = (_a = Fairydust).setRewards;
                                return [4 /*yield*/, rewards.getAddress()];
                            case 1: return [4 /*yield*/, _b.apply(_a, [_f.sent()])];
                            case 2:
                                _f.sent();
                                _d = expect;
                                return [4 /*yield*/, Fairydust.rewards()];
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
                                _c = (_b = Fairydust).setTransmuter;
                                return [4 /*yield*/, transmuter.getAddress()];
                            case 1:
                                _a.apply(void 0, [_c.apply(_b, [_d.sent()])]).revertedWith("Fairydust: only governance");
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            context("when caller is current governance", function () {
                beforeEach(function () { return (Fairydust = Fairydust.connect(governance)); });
                it("reverts when setting transmuter to zero address", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(Fairydust.setTransmuter(helpers_1.ZERO_ADDRESS)).revertedWith("Fairydust: transmuter address cannot be 0x0.");
                        return [2 /*return*/];
                    });
                }); });
                it("updates transmuter", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c, _d, _e;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                _b = (_a = Fairydust).setTransmuter;
                                return [4 /*yield*/, transmuter.getAddress()];
                            case 1: return [4 /*yield*/, _b.apply(_a, [_f.sent()])];
                            case 2:
                                _f.sent();
                                _d = expect;
                                return [4 /*yield*/, Fairydust.transmuter()];
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
                beforeEach(function () { return (Fairydust = Fairydust.connect(deployer)); });
                it("reverts", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _a = expect;
                                _c = (_b = Fairydust).setRewards;
                                return [4 /*yield*/, rewards.getAddress()];
                            case 1:
                                _a.apply(void 0, [_c.apply(_b, [_d.sent()])]).revertedWith("Fairydust: only governance");
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            context("when caller is current governance", function () {
                beforeEach(function () { return (Fairydust = Fairydust.connect(governance)); });
                it("reverts when setting rewards to zero address", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(Fairydust.setRewards(helpers_1.ZERO_ADDRESS)).revertedWith("Fairydust: rewards address cannot be 0x0.");
                        return [2 /*return*/];
                    });
                }); });
                it("updates rewards", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c, _d, _e;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                _b = (_a = Fairydust).setRewards;
                                return [4 /*yield*/, rewards.getAddress()];
                            case 1: return [4 /*yield*/, _b.apply(_a, [_f.sent()])];
                            case 2:
                                _f.sent();
                                _d = expect;
                                return [4 /*yield*/, Fairydust.rewards()];
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
                beforeEach(function () { return (Fairydust = Fairydust.connect(deployer)); });
                it("reverts", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(Fairydust.setHarvestFee(1)).revertedWith("Fairydust: only governance");
                        return [2 /*return*/];
                    });
                }); });
            });
            context("when caller is current governance", function () {
                beforeEach(function () { return (Fairydust = Fairydust.connect(governance)); });
                it("reverts when performance fee greater than maximum", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var MAXIMUM_VALUE;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Fairydust.PERCENT_RESOLUTION()];
                            case 1:
                                MAXIMUM_VALUE = _a.sent();
                                expect(Fairydust.setHarvestFee(MAXIMUM_VALUE.add(1))).revertedWith("Fairydust: harvest fee above maximum");
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("updates performance fee", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, Fairydust.setHarvestFee(1)];
                            case 1:
                                _b.sent();
                                _a = expect;
                                return [4 /*yield*/, Fairydust.harvestFee()];
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
                beforeEach(function () { return (Fairydust = Fairydust.connect(deployer)); });
                it("reverts", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var collateralizationLimit;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Fairydust.MINIMUM_COLLATERALIZATION_LIMIT()];
                            case 1:
                                collateralizationLimit = _a.sent();
                                expect(Fairydust.setCollateralizationLimit(collateralizationLimit)).revertedWith("Fairydust: only governance");
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            context("when caller is current governance", function () {
                beforeEach(function () { return (Fairydust = Fairydust.connect(governance)); });
                it("reverts when performance fee less than minimum", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var MINIMUM_LIMIT;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Fairydust.MINIMUM_COLLATERALIZATION_LIMIT()];
                            case 1:
                                MINIMUM_LIMIT = _a.sent();
                                expect(Fairydust.setCollateralizationLimit(MINIMUM_LIMIT.sub(1))).revertedWith("Fairydust: collateralization limit below minimum.");
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("reverts when performance fee greater than maximum", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var MAXIMUM_LIMIT;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Fairydust.MAXIMUM_COLLATERALIZATION_LIMIT()];
                            case 1:
                                MAXIMUM_LIMIT = _a.sent();
                                expect(Fairydust.setCollateralizationLimit(MAXIMUM_LIMIT.add(1))).revertedWith("Fairydust: collateralization limit above maximum");
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("updates collateralization limit", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var collateralizationLimit, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, Fairydust.MINIMUM_COLLATERALIZATION_LIMIT()];
                            case 1:
                                collateralizationLimit = _b.sent();
                                return [4 /*yield*/, Fairydust.setCollateralizationLimit(collateralizationLimit)];
                            case 2:
                                _b.sent();
                                _a = expect;
                                return [4 /*yield*/, Fairydust.collateralizationLimit()];
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
        var fUsd;
        var Fairydust;
        var adapter;
        var harvestFee = 1000;
        var pctReso = 10000;
        var transmuterContract;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            var _o;
            return __generator(this, function (_p) {
                switch (_p.label) {
                    case 0:
                        _o = signers, deployer = _o[0], governance = _o[1], sentinel = _o[2], rewards = _o[3], transmuter = _o[4], minter = _o[5], user = _o[6], signers = _o.slice(7);
                        return [4 /*yield*/, ERC20MockFactory.connect(deployer).deploy("Mock DAI", "DAI", 18)];
                    case 1:
                        token = (_p.sent());
                        return [4 /*yield*/, FUSDFactory.connect(deployer).deploy()];
                    case 2:
                        fUsd = (_p.sent());
                        _b = (_a = FairydustFactory.connect(deployer)).deploy;
                        _c = [token.address,
                            fUsd.address];
                        return [4 /*yield*/, governance.getAddress()];
                    case 3:
                        _c = _c.concat([_p.sent()]);
                        return [4 /*yield*/, sentinel.getAddress()];
                    case 4: return [4 /*yield*/, _b.apply(_a, _c.concat([_p.sent()]))];
                    case 5:
                        Fairydust = (_p.sent());
                        _e = (_d = Fairydust
                            .connect(governance)).setTransmuter;
                        return [4 /*yield*/, transmuter.getAddress()];
                    case 6: return [4 /*yield*/, _e.apply(_d, [_p.sent()])];
                    case 7:
                        _p.sent();
                        _g = (_f = Fairydust
                            .connect(governance)).setRewards;
                        return [4 /*yield*/, rewards.getAddress()];
                    case 8: return [4 /*yield*/, _g.apply(_f, [_p.sent()])];
                    case 9:
                        _p.sent();
                        return [4 /*yield*/, Fairydust.connect(governance).setHarvestFee(harvestFee)];
                    case 10:
                        _p.sent();
                        _j = (_h = TransmuterFactory.connect(deployer)).deploy;
                        _k = [fUsd.address,
                            token.address];
                        return [4 /*yield*/, governance.getAddress()];
                    case 11: return [4 /*yield*/, _j.apply(_h, _k.concat([_p.sent()]))];
                    case 12:
                        transmuterContract = (_p.sent());
                        return [4 /*yield*/, Fairydust.connect(governance).setTransmuter(transmuterContract.address)];
                    case 13:
                        _p.sent();
                        return [4 /*yield*/, transmuterContract.connect(governance).setWhitelist(Fairydust.address, true)];
                    case 14:
                        _p.sent();
                        _m = (_l = token).mint;
                        return [4 /*yield*/, minter.getAddress()];
                    case 15: return [4 /*yield*/, _m.apply(_l, [_p.sent(), parseEther("10000")])];
                    case 16:
                        _p.sent();
                        return [4 /*yield*/, token.connect(minter).approve(Fairydust.address, parseEther("10000"))];
                    case 17:
                        _p.sent();
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
                            return [4 /*yield*/, Fairydust.connect(governance).initialize(adapter.address)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            context("when caller is not current governance", function () {
                beforeEach(function () { return (Fairydust = Fairydust.connect(deployer)); });
                it("reverts", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(Fairydust.migrate(adapter.address)).revertedWith("Fairydust: only governance");
                        return [2 /*return*/];
                    });
                }); });
            });
            context("when caller is current governance", function () {
                beforeEach(function () { return (Fairydust = Fairydust.connect(governance)); });
                context("when adapter is zero address", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        it("reverts", function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                expect(Fairydust.migrate(helpers_1.ZERO_ADDRESS)).revertedWith("Fairydust: active vault address cannot be 0x0.");
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
                            expect(Fairydust.migrate(invalidAdapter.address)).revertedWith("Fairydust: token mismatch");
                            return [2 /*return*/];
                        });
                    }); });
                });
                context("when conditions are met", function () {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Fairydust.migrate(adapter.address)];
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
                                    return [4 /*yield*/, Fairydust.vaultCount()];
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
                                    return [4 /*yield*/, Fairydust.getVaultAdapter(0)];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]).equal(adapter.address);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
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
                            case 0: return [4 /*yield*/, YearnControllerMockFactory
                                    .connect(deployer)
                                    .deploy()];
                            case 1:
                                controllerMock = (_c.sent());
                                return [4 /*yield*/, YearnVaultMockFactory
                                        .connect(deployer)
                                        .deploy(token.address, controllerMock.address)];
                            case 2:
                                vaultMock = (_c.sent());
                                return [4 /*yield*/, YearnVaultAdapterFactory
                                        .connect(deployer)
                                        .deploy(vaultMock.address, Fairydust.address)];
                            case 3:
                                adapter = (_c.sent());
                                _b = (_a = token).mint;
                                return [4 /*yield*/, deployer.getAddress()];
                            case 4: return [4 /*yield*/, _b.apply(_a, [_c.sent(), parseEther("10000")])];
                            case 5:
                                _c.sent();
                                return [4 /*yield*/, token.approve(vaultMock.address, parseEther("10000"))];
                            case 6:
                                _c.sent();
                                return [4 /*yield*/, Fairydust.connect(governance).initialize(adapter.address)];
                            case 7:
                                _c.sent();
                                return [4 /*yield*/, Fairydust.connect(minter).deposit(depositAmt)];
                            case 8:
                                _c.sent();
                                return [4 /*yield*/, Fairydust.flush()];
                            case 9:
                                _c.sent();
                                // need at least one other deposit in the vault to not get underflow errors
                                return [4 /*yield*/, vaultMock.connect(deployer).deposit(parseEther("100"))];
                            case 10:
                                // need at least one other deposit in the vault to not get underflow errors
                                _c.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("reverts when not an emergency, not governance, and user does not have permission to recall funds from active vault", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(Fairydust.connect(minter).recall(0, 0))
                            .revertedWith("Fairydust: not an emergency, not governance, and user does not have permission to recall funds from active vault");
                        return [2 /*return*/];
                    });
                }); });
                it("governance can recall some of the funds", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var beforeBal, afterBal;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, token.connect(governance).balanceOf(Fairydust.address)];
                            case 1:
                                beforeBal = _a.sent();
                                return [4 /*yield*/, Fairydust.connect(governance).recall(0, recallAmt)];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, token.connect(governance).balanceOf(Fairydust.address)];
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
                            case 0: return [4 /*yield*/, Fairydust.connect(governance).recallAll(0)];
                            case 1:
                                _b.sent();
                                _a = expect;
                                return [4 /*yield*/, token.connect(governance).balanceOf(Fairydust.address)];
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
                                    case 0: return [4 /*yield*/, Fairydust.connect(governance).setEmergencyExit(true)];
                                    case 1:
                                        _b.sent();
                                        return [4 /*yield*/, Fairydust.connect(minter).recallAll(0)];
                                    case 2:
                                        _b.sent();
                                        _a = expect;
                                        return [4 /*yield*/, token.connect(governance).balanceOf(Fairydust.address)];
                                    case 3:
                                        _a.apply(void 0, [_b.sent()]).equal(depositAmt);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        it("after some usage", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, Fairydust.connect(minter).deposit(mintAmt)];
                                    case 1:
                                        _b.sent();
                                        return [4 /*yield*/, Fairydust.connect(governance).flush()];
                                    case 2:
                                        _b.sent();
                                        return [4 /*yield*/, token.mint(adapter.address, parseEther("500"))];
                                    case 3:
                                        _b.sent();
                                        return [4 /*yield*/, Fairydust.connect(governance).setEmergencyExit(true)];
                                    case 4:
                                        _b.sent();
                                        return [4 /*yield*/, Fairydust.connect(minter).recallAll(0)];
                                    case 5:
                                        _b.sent();
                                        _a = expect;
                                        return [4 /*yield*/, token.connect(governance).balanceOf(Fairydust.address)];
                                    case 6:
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
                                return [4 /*yield*/, Fairydust.connect(governance).initialize(inactiveAdapter.address)];
                            case 3:
                                _c.sent();
                                _b = (_a = token).mint;
                                return [4 /*yield*/, minter.getAddress()];
                            case 4: return [4 /*yield*/, _b.apply(_a, [_c.sent(), depositAmt])];
                            case 5:
                                _c.sent();
                                return [4 /*yield*/, token.connect(minter).approve(Fairydust.address, depositAmt)];
                            case 6:
                                _c.sent();
                                return [4 /*yield*/, Fairydust.connect(minter).deposit(depositAmt)];
                            case 7:
                                _c.sent();
                                return [4 /*yield*/, Fairydust.connect(minter).flush()];
                            case 8:
                                _c.sent();
                                return [4 /*yield*/, Fairydust.connect(governance).migrate(activeAdapter.address)];
                            case 9:
                                _c.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("anyone can recall some of the funds to the contract", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, Fairydust.connect(minter).recall(0, recallAmt)];
                            case 1:
                                _b.sent();
                                _a = expect;
                                return [4 /*yield*/, token.balanceOf(Fairydust.address)];
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
                            case 0: return [4 /*yield*/, Fairydust.connect(minter).recallAll(0)];
                            case 1:
                                _b.sent();
                                _a = expect;
                                return [4 /*yield*/, token.balanceOf(Fairydust.address)];
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
                                    case 0: return [4 /*yield*/, Fairydust.connect(governance).setEmergencyExit(true)];
                                    case 1:
                                        _b.sent();
                                        return [4 /*yield*/, Fairydust.connect(minter).recallAll(0)];
                                    case 2:
                                        _b.sent();
                                        _a = expect;
                                        return [4 /*yield*/, token.connect(governance).balanceOf(Fairydust.address)];
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
            context("when the Fairydust is not initialized", function () {
                it("reverts", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(Fairydust.flush()).revertedWith("Fairydust: not initialized.");
                        return [2 /*return*/];
                    });
                }); });
            });
            context("when there is at least one vault to flush to", function () {
                context("when there is one vault", function () {
                    var adapter;
                    var mintAmount = parseEther("5000");
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                                case 1:
                                    adapter = (_a.sent());
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, token.mint(Fairydust.address, mintAmount)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, Fairydust.connect(governance).initialize(adapter.address)];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, Fairydust.flush()];
                                case 3:
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
                });
                context("when there are multiple vaults", function () {
                    var inactiveAdapter;
                    var activeAdapter;
                    var mintAmount = parseEther("5000");
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                                case 1:
                                    inactiveAdapter = (_a.sent());
                                    return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                                case 2:
                                    activeAdapter = (_a.sent());
                                    return [4 /*yield*/, token.mint(Fairydust.address, mintAmount)];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, Fairydust
                                            .connect(governance)
                                            .initialize(inactiveAdapter.address)];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, Fairydust.connect(governance).migrate(activeAdapter.address)];
                                case 5:
                                    _a.sent();
                                    return [4 /*yield*/, Fairydust.flush()];
                                case 6:
                                    _a.sent();
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
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                        case 1:
                            adapter = (_c.sent());
                            return [4 /*yield*/, Fairydust.connect(governance).initialize(adapter.address)];
                        case 2:
                            _c.sent();
                            return [4 /*yield*/, Fairydust
                                    .connect(governance)
                                    .setCollateralizationLimit(collateralizationLimit)];
                        case 3:
                            _c.sent();
                            return [4 /*yield*/, fUsd.connect(deployer).setWhitelist(Fairydust.address, true)];
                        case 4:
                            _c.sent();
                            return [4 /*yield*/, fUsd.connect(deployer).setCeiling(Fairydust.address, ceilingAmt)];
                        case 5:
                            _c.sent();
                            _b = (_a = token).mint;
                            return [4 /*yield*/, minter.getAddress()];
                        case 6: return [4 /*yield*/, _b.apply(_a, [_c.sent(), depositAmt])];
                        case 7:
                            _c.sent();
                            return [4 /*yield*/, token.connect(minter).approve(Fairydust.address, parseEther("100000000"))];
                        case 8:
                            _c.sent();
                            return [4 /*yield*/, fUsd.connect(minter).approve(Fairydust.address, parseEther("100000000"))];
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
                        case 0: 
                        // let address = await deployer.getAddress();
                        return [4 /*yield*/, Fairydust.connect(minter).deposit(depositAmt)];
                        case 1:
                            // let address = await deployer.getAddress();
                            _d.sent();
                            _a = expect;
                            _c = (_b = Fairydust
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
                            return [4 /*yield*/, Fairydust.connect(minter).deposit(depositAmt)];
                        case 3:
                            _e.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).withdraw(depositAmt)];
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
            it("reverts when withdrawing too much", function () { return __awaiter(void 0, void 0, void 0, function () {
                var overdraft;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            overdraft = depositAmt.add(parseEther("1000"));
                            return [4 /*yield*/, Fairydust.connect(minter).deposit(depositAmt)];
                        case 1:
                            _a.sent();
                            expect(Fairydust.connect(minter).withdraw(overdraft)).revertedWith("ERC20: transfer amount exceeds balance");
                            return [2 /*return*/];
                    }
                });
            }); });
            it("reverts when cdp is undercollateralized", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Fairydust.connect(minter).deposit(depositAmt)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).mint(mintAmt)];
                        case 2:
                            _a.sent();
                            expect(Fairydust.connect(minter).withdraw(depositAmt)).revertedWith("Action blocked: unhealthy collateralization ratio");
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
                            return [4 /*yield*/, Fairydust.connect(minter).deposit(depositAmt)];
                        case 3:
                            _e.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).mint(mintAmt)];
                        case 4:
                            _e.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).repay(0, mintAmt)];
                        case 5:
                            _e.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).withdraw(depositAmt)];
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
            it("deposits 5000 DAI, mints 1000 fUsd, and withdraws 3000 DAI", function () { return __awaiter(void 0, void 0, void 0, function () {
                var withdrawAmt, _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            withdrawAmt = depositAmt.sub(mintAmt.mul(2));
                            return [4 /*yield*/, Fairydust.connect(minter).deposit(depositAmt)];
                        case 1:
                            _d.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).mint(mintAmt)];
                        case 2:
                            _d.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).withdraw(withdrawAmt)];
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
            describe("flushActivator", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a, _b, _c, _d;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0: return [4 /*yield*/, token.connect(deployer).approve(Fairydust.address, parseEther("1"))];
                                case 1:
                                    _e.sent();
                                    _b = (_a = token).mint;
                                    return [4 /*yield*/, deployer.getAddress()];
                                case 2: return [4 /*yield*/, _b.apply(_a, [_e.sent(), parseEther("1")])];
                                case 3:
                                    _e.sent();
                                    _d = (_c = token).mint;
                                    return [4 /*yield*/, minter.getAddress()];
                                case 4: return [4 /*yield*/, _d.apply(_c, [_e.sent(), parseEther("100000")])];
                                case 5:
                                    _e.sent();
                                    return [4 /*yield*/, Fairydust.connect(deployer).deposit(parseEther("1"))];
                                case 6:
                                    _e.sent();
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
                                    return [4 /*yield*/, Fairydust.connect(minter).deposit(parseEther("100000"))];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, token.balanceOf(adapter.address)];
                                case 3:
                                    balAfterWhale = _a.sent();
                                    expect(balBeforeWhale).equal(0);
                                    expect(balAfterWhale).equal(parseEther("100001"));
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
                                    return [4 /*yield*/, Fairydust.connect(minter).deposit(parseEther("99999"))];
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
                    it("withdraw() flushes funds if amount >= flushActivator", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var balBeforeWhaleWithdraw, balAfterWhaleWithdraw;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Fairydust.connect(minter).deposit(parseEther("50000"))];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, Fairydust.connect(minter).deposit(parseEther("50000"))];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, token.balanceOf(adapter.address)];
                                case 3:
                                    balBeforeWhaleWithdraw = _a.sent();
                                    return [4 /*yield*/, Fairydust.connect(minter).withdraw(parseEther("100000"))];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, token.balanceOf(adapter.address)];
                                case 5:
                                    balAfterWhaleWithdraw = _a.sent();
                                    expect(balBeforeWhaleWithdraw).equal(0);
                                    expect(balAfterWhaleWithdraw).equal(parseEther("1"));
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it("withdraw() does not flush funds if amount < flushActivator", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var balBeforeWhaleWithdraw, balAfterWhaleWithdraw;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Fairydust.connect(minter).deposit(parseEther("50000"))];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, Fairydust.connect(minter).deposit(parseEther("50000"))];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, token.balanceOf(adapter.address)];
                                case 3:
                                    balBeforeWhaleWithdraw = _a.sent();
                                    return [4 /*yield*/, Fairydust.connect(minter).withdraw(parseEther("99999"))];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, token.balanceOf(adapter.address)];
                                case 5:
                                    balAfterWhaleWithdraw = _a.sent();
                                    expect(balBeforeWhaleWithdraw).equal(0);
                                    expect(balAfterWhaleWithdraw).equal(0);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
        });
        describe("repay and liquidate tokens", function () {
            var depositAmt = parseEther("5000");
            var mintAmt = parseEther("1000");
            var ceilingAmt = parseEther("10000");
            var collateralizationLimit = "2000000000000000000"; // this should be set in the deploy sequence
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                        case 1:
                            adapter = (_c.sent());
                            return [4 /*yield*/, Fairydust.connect(governance).initialize(adapter.address)];
                        case 2:
                            _c.sent();
                            return [4 /*yield*/, Fairydust
                                    .connect(governance)
                                    .setCollateralizationLimit(collateralizationLimit)];
                        case 3:
                            _c.sent();
                            return [4 /*yield*/, fUsd.connect(deployer).setWhitelist(Fairydust.address, true)];
                        case 4:
                            _c.sent();
                            return [4 /*yield*/, fUsd.connect(deployer).setCeiling(Fairydust.address, ceilingAmt)];
                        case 5:
                            _c.sent();
                            _b = (_a = token).mint;
                            return [4 /*yield*/, minter.getAddress()];
                        case 6: return [4 /*yield*/, _b.apply(_a, [_c.sent(), ceilingAmt])];
                        case 7:
                            _c.sent();
                            return [4 /*yield*/, token.connect(minter).approve(Fairydust.address, ceilingAmt)];
                        case 8:
                            _c.sent();
                            return [4 /*yield*/, fUsd.connect(minter).approve(Fairydust.address, parseEther("100000000"))];
                        case 9:
                            _c.sent();
                            return [4 /*yield*/, token.connect(minter).approve(transmuterContract.address, ceilingAmt)];
                        case 10:
                            _c.sent();
                            return [4 /*yield*/, fUsd.connect(minter).approve(transmuterContract.address, depositAmt)];
                        case 11:
                            _c.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("repay with dai reverts when nothing is minted and transmuter has no fUsd deposits", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Fairydust.connect(minter).deposit(depositAmt.sub(parseEther("1000")))];
                        case 1:
                            _a.sent();
                            expect(Fairydust.connect(minter).repay(mintAmt, 0)).revertedWith("SafeMath: subtraction overflow");
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
                            return [4 /*yield*/, Fairydust.connect(minter).deposit(depositAmt)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).mint(mintAmt)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, transmuterContract.connect(minter).stake(mintAmt)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).liquidate(liqAmt)];
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
                var liqAmt, FairydustTokenBalPre, FairydustTokenBalPost, transmuterEndingTokenBal;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            liqAmt = parseEther("600");
                            return [4 /*yield*/, Fairydust.connect(minter).deposit(depositAmt)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, Fairydust.connect(governance).flush()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).deposit(mintAmt.div(2))];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).mint(mintAmt)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, transmuterContract.connect(minter).stake(mintAmt)];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, token.balanceOf(Fairydust.address)];
                        case 6:
                            FairydustTokenBalPre = _a.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).liquidate(liqAmt)];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, token.balanceOf(Fairydust.address)];
                        case 8:
                            FairydustTokenBalPost = _a.sent();
                            return [4 /*yield*/, token.balanceOf(transmuterContract.address)];
                        case 9:
                            transmuterEndingTokenBal = _a.sent();
                            expect(FairydustTokenBalPost).equal(0);
                            expect(transmuterEndingTokenBal).equal(liqAmt);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("liquidates the minimum necessary from the Fairydust buffer", function () { return __awaiter(void 0, void 0, void 0, function () {
                var dep2Amt, liqAmt, FairydustTokenBalPre, FairydustTokenBalPost, transmuterEndingTokenBal;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            dep2Amt = parseEther("500");
                            liqAmt = parseEther("200");
                            return [4 /*yield*/, Fairydust.connect(minter).deposit(parseEther("2000"))];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, Fairydust.connect(governance).flush()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).deposit(dep2Amt)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).mint(parseEther("1000"))];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, transmuterContract.connect(minter).stake(parseEther("1000"))];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, token.balanceOf(Fairydust.address)];
                        case 6:
                            FairydustTokenBalPre = _a.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).liquidate(liqAmt)];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, token.balanceOf(Fairydust.address)];
                        case 8:
                            FairydustTokenBalPost = _a.sent();
                            return [4 /*yield*/, token.balanceOf(transmuterContract.address)];
                        case 9:
                            transmuterEndingTokenBal = _a.sent();
                            expect(FairydustTokenBalPost).equal(dep2Amt.sub(liqAmt));
                            expect(transmuterEndingTokenBal).equal(liqAmt);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("deposits, mints fUsd, repays, and has no outstanding debt", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, Fairydust.connect(minter).deposit(depositAmt.sub(parseEther("1000")))];
                        case 1:
                            _d.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).mint(mintAmt)];
                        case 2:
                            _d.sent();
                            return [4 /*yield*/, transmuterContract.connect(minter).stake(mintAmt)];
                        case 3:
                            _d.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).repay(mintAmt, 0)];
                        case 4:
                            _d.sent();
                            _a = expect;
                            _c = (_b = Fairydust.connect(minter)).getCdpTotalDebt;
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
                        case 0: return [4 /*yield*/, Fairydust.connect(minter).deposit(depositAmt)];
                        case 1:
                            _d.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).mint(mintAmt)];
                        case 2:
                            _d.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).repay(0, mintAmt)];
                        case 3:
                            _d.sent();
                            _a = expect;
                            _c = (_b = Fairydust
                                .connect(minter)).getCdpTotalDebt;
                            return [4 /*yield*/, minter.getAddress()];
                        case 4: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                        case 5:
                            _a.apply(void 0, [_d.sent()]).equal(0);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("deposits, mints fUsd, repays with fUsd and DAI, and has no outstanding debt", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, Fairydust.connect(minter).deposit(depositAmt.sub(parseEther("1000")))];
                        case 1:
                            _d.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).mint(mintAmt)];
                        case 2:
                            _d.sent();
                            return [4 /*yield*/, transmuterContract.connect(minter).stake(parseEther("500"))];
                        case 3:
                            _d.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).repay(parseEther("500"), parseEther("500"))];
                        case 4:
                            _d.sent();
                            _a = expect;
                            _c = (_b = Fairydust.connect(minter)).getCdpTotalDebt;
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
                        case 0: return [4 /*yield*/, Fairydust.connect(minter).deposit(depositAmt)];
                        case 1:
                            _d.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).mint(mintAmt)];
                        case 2:
                            _d.sent();
                            return [4 /*yield*/, transmuterContract.connect(minter).stake(mintAmt)];
                        case 3:
                            _d.sent();
                            return [4 /*yield*/, Fairydust.connect(minter).liquidate(mintAmt)];
                        case 4:
                            _d.sent();
                            _a = expect;
                            _c = (_b = Fairydust.connect(minter)).getCdpTotalDeposited;
                            return [4 /*yield*/, minter.getAddress()];
                        case 5: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                        case 6:
                            _a.apply(void 0, [_d.sent()]).equal(depositAmt.sub(mintAmt));
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("mint", function () {
            var depositAmt = parseEther("5000");
            var mintAmt = parseEther("1000");
            var ceilingAmt = parseEther("1000");
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                        case 1:
                            adapter = (_c.sent());
                            return [4 /*yield*/, Fairydust.connect(governance).initialize(adapter.address)];
                        case 2:
                            _c.sent();
                            return [4 /*yield*/, fUsd.connect(deployer).setCeiling(Fairydust.address, ceilingAmt)];
                        case 3:
                            _c.sent();
                            _b = (_a = token).mint;
                            return [4 /*yield*/, minter.getAddress()];
                        case 4: return [4 /*yield*/, _b.apply(_a, [_c.sent(), depositAmt])];
                        case 5:
                            _c.sent();
                            return [4 /*yield*/, token.connect(minter).approve(Fairydust.address, depositAmt)];
                        case 6:
                            _c.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("reverts if the Fairydust is not whitelisted", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Fairydust.connect(minter).deposit(depositAmt)];
                        case 1:
                            _a.sent();
                            expect(Fairydust.connect(minter).mint(mintAmt)).revertedWith("fUsd: Fairydust is not whitelisted");
                            return [2 /*return*/];
                    }
                });
            }); });
            context("is whitelisted", function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fUsd.connect(deployer).setWhitelist(Fairydust.address, true)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("reverts if the Fairydust is blacklisted", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fUsd.connect(deployer).setBlacklist(Fairydust.address)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, Fairydust.connect(minter).deposit(depositAmt)];
                            case 2:
                                _a.sent();
                                expect(Fairydust.connect(minter).mint(mintAmt)).revertedWith("fUsd: Fairydust is blacklisted");
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("reverts when trying to mint too much", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        expect(Fairydust.connect(minter).mint(parseEther("2000"))).revertedWith("Loan-to-value ratio breached");
                        return [2 /*return*/];
                    });
                }); });
                it("reverts if the ceiling was breached", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var lowCeilingAmt;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                lowCeilingAmt = parseEther("100");
                                return [4 /*yield*/, fUsd
                                        .connect(deployer)
                                        .setCeiling(Fairydust.address, lowCeilingAmt)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, Fairydust.connect(minter).deposit(depositAmt)];
                            case 2:
                                _a.sent();
                                expect(Fairydust.connect(minter).mint(mintAmt)).revertedWith("fUsd: Fairydust's ceiling was breached");
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
                                return [4 /*yield*/, Fairydust.connect(minter).deposit(depositAmt)];
                            case 3:
                                _h.sent();
                                return [4 /*yield*/, Fairydust.connect(minter).mint(mintAmt)];
                            case 4:
                                _h.sent();
                                _d = (_c = token).balanceOf;
                                return [4 /*yield*/, minter.getAddress()];
                            case 5: return [4 /*yield*/, _d.apply(_c, [_h.sent()])];
                            case 6:
                                balAfter = _h.sent();
                                expect(balAfter).equal(balBefore.sub(depositAmt));
                                _e = expect;
                                _g = (_f = fUsd).balanceOf;
                                return [4 /*yield*/, minter.getAddress()];
                            case 7: return [4 /*yield*/, _g.apply(_f, [_h.sent()])];
                            case 8:
                                _e.apply(void 0, [_h.sent()]).equal(mintAmt);
                                return [2 /*return*/];
                        }
                    });
                }); });
                describe("flushActivator", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, fUsd.connect(deployer).setCeiling(Fairydust.address, parseEther("200000"))];
                                    case 1:
                                        _c.sent();
                                        _b = (_a = token).mint;
                                        return [4 /*yield*/, minter.getAddress()];
                                    case 2: return [4 /*yield*/, _b.apply(_a, [_c.sent(), parseEther("200000")])];
                                    case 3:
                                        _c.sent();
                                        return [4 /*yield*/, token.connect(minter).approve(Fairydust.address, parseEther("200000"))];
                                    case 4:
                                        _c.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        it("mint() flushes funds if amount >= flushActivator", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var balBeforeWhale, balAfterWhale;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, Fairydust.connect(minter).deposit(parseEther("50000"))];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, Fairydust.connect(minter).deposit(parseEther("50000"))];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, Fairydust.connect(minter).deposit(parseEther("50000"))];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, Fairydust.connect(minter).deposit(parseEther("50000"))];
                                    case 4:
                                        _a.sent();
                                        return [4 /*yield*/, token.balanceOf(adapter.address)];
                                    case 5:
                                        balBeforeWhale = _a.sent();
                                        return [4 /*yield*/, Fairydust.connect(minter).mint(parseEther("100000"))];
                                    case 6:
                                        _a.sent();
                                        return [4 /*yield*/, token.balanceOf(adapter.address)];
                                    case 7:
                                        balAfterWhale = _a.sent();
                                        expect(balBeforeWhale).equal(0);
                                        expect(balAfterWhale).equal(parseEther("200000"));
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        it("mint() does not flush funds if amount < flushActivator", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var balBeforeWhale, balAfterWhale;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, Fairydust.connect(minter).deposit(parseEther("50000"))];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, Fairydust.connect(minter).deposit(parseEther("50000"))];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, Fairydust.connect(minter).deposit(parseEther("50000"))];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, Fairydust.connect(minter).deposit(parseEther("50000"))];
                                    case 4:
                                        _a.sent();
                                        return [4 /*yield*/, token.balanceOf(adapter.address)];
                                    case 5:
                                        balBeforeWhale = _a.sent();
                                        return [4 /*yield*/, Fairydust.connect(minter).mint(parseEther("99999"))];
                                    case 6:
                                        _a.sent();
                                        return [4 /*yield*/, token.balanceOf(adapter.address)];
                                    case 7:
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
                        case 0: return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                        case 1:
                            adapter = (_c.sent());
                            return [4 /*yield*/, fUsd.connect(deployer).setWhitelist(Fairydust.address, true)];
                        case 2:
                            _c.sent();
                            return [4 /*yield*/, Fairydust.connect(governance).initialize(adapter.address)];
                        case 3:
                            _c.sent();
                            return [4 /*yield*/, fUsd.connect(deployer).setCeiling(Fairydust.address, ceilingAmt)];
                        case 4:
                            _c.sent();
                            _b = (_a = token).mint;
                            return [4 /*yield*/, user.getAddress()];
                        case 5: return [4 /*yield*/, _b.apply(_a, [_c.sent(), depositAmt])];
                        case 6:
                            _c.sent();
                            return [4 /*yield*/, token.connect(user).approve(Fairydust.address, depositAmt)];
                        case 7:
                            _c.sent();
                            return [4 /*yield*/, fUsd.connect(user).approve(transmuterContract.address, depositAmt)];
                        case 8:
                            _c.sent();
                            return [4 /*yield*/, Fairydust.connect(user).deposit(depositAmt)];
                        case 9:
                            _c.sent();
                            return [4 /*yield*/, Fairydust.connect(user).mint(mintAmt)];
                        case 10:
                            _c.sent();
                            return [4 /*yield*/, transmuterContract.connect(user).stake(stakeAmt)];
                        case 11:
                            _c.sent();
                            return [4 /*yield*/, Fairydust.flush()];
                        case 12:
                            _c.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("harvests yield from the vault", function () { return __awaiter(void 0, void 0, void 0, function () {
                var transmuterBal, vaultBal;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, token.mint(adapter.address, yieldAmt)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, Fairydust.harvest(0)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, token.balanceOf(transmuterContract.address)];
                        case 3:
                            transmuterBal = _a.sent();
                            expect(transmuterBal).equal(yieldAmt.sub(yieldAmt.div(pctReso / harvestFee)));
                            return [4 /*yield*/, token.balanceOf(adapter.address)];
                        case 4:
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
                        case 0: return [4 /*yield*/, token.mint(adapter.address, yieldAmt)];
                        case 1:
                            _c.sent();
                            return [4 /*yield*/, Fairydust.harvest(0)];
                        case 2:
                            _c.sent();
                            _b = (_a = token).balanceOf;
                            return [4 /*yield*/, rewards.getAddress()];
                        case 3: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                        case 4:
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
                            return [4 /*yield*/, Fairydust.harvest(0)];
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
    });
});
