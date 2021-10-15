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
var utils_1 = require("ethers/lib/utils");
var helpers_1 = require("../utils/helpers");
chai_1.default.use(ethereum_waffle_1.solidity);
chai_1.default.use(chai_subset_1.default);
var expect = chai_1.default.expect;
var FairydustFactory;
var TransmuterEthFactory;
var ERC20MockFactory;
var FdEthFactory;
var VaultAdapterMockWithIndirectionFactory;
var VaultAdapterMockFactory;
var Weth9Factory;
describe("TransmuterEth", function () {
    var deployer;
    var depositor;
    var signers;
    var fairydust;
    var governance;
    var minter;
    var rewards;
    var sentinel;
    var user;
    var mockFairydust;
    var token;
    var transmuter;
    var adapter;
    var transVaultAdaptor;
    var fEth;
    var harvestFee = 1000;
    var ceilingAmt = ethers_1.utils.parseEther("10000000");
    var collateralizationLimit = "2000000000000000000";
    var mintAmount = 5000;
    var mockFairydustAddress;
    var preTestTotalfUsdSupply;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getContractFactory("TransmuterEth")];
                case 1:
                    TransmuterEthFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("ERC20Mock")];
                case 2:
                    ERC20MockFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("FdEth")];
                case 3:
                    FdEthFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("FairydustEth")];
                case 4:
                    FairydustFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("VaultAdapterMockWithIndirection")];
                case 5:
                    VaultAdapterMockWithIndirectionFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("VaultAdapterMock")];
                case 6:
                    VaultAdapterMockFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("WETH9")];
                case 7:
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
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var _l;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getSigners()];
                case 1:
                    _l = _m.sent(), deployer = _l[0], rewards = _l[1], depositor = _l[2], sentinel = _l[3], minter = _l[4], governance = _l[5], mockFairydust = _l[6], user = _l[7], signers = _l.slice(8);
                    return [4 /*yield*/, Weth9Factory.connect(deployer).deploy()];
                case 2:
                    token = (_m.sent());
                    return [4 /*yield*/, FdEthFactory.connect(deployer).deploy()];
                case 3:
                    fEth = (_m.sent());
                    return [4 /*yield*/, mockFairydust.getAddress()];
                case 4:
                    mockFairydustAddress = _m.sent();
                    _b = (_a = FairydustFactory.connect(deployer)).deploy;
                    _c = [token.address,
                        fEth.address];
                    return [4 /*yield*/, governance.getAddress()];
                case 5:
                    _c = _c.concat([_m.sent()]);
                    return [4 /*yield*/, sentinel.getAddress()];
                case 6: return [4 /*yield*/, _b.apply(_a, _c.concat([_m.sent()]))];
                case 7:
                    fairydust = (_m.sent());
                    return [4 /*yield*/, fairydust.connect(governance).setEmergencyExit(false)];
                case 8:
                    _m.sent();
                    _e = (_d = TransmuterEthFactory.connect(deployer)).deploy;
                    _f = [fEth.address,
                        token.address];
                    return [4 /*yield*/, governance.getAddress()];
                case 9: return [4 /*yield*/, _e.apply(_d, _f.concat([_m.sent()]))];
                case 10:
                    transmuter = (_m.sent());
                    return [4 /*yield*/, transmuter.connect(governance).setPause(false)];
                case 11:
                    _m.sent();
                    return [4 /*yield*/, VaultAdapterMockWithIndirectionFactory.connect(deployer).deploy(token.address)];
                case 12:
                    transVaultAdaptor = (_m.sent());
                    return [4 /*yield*/, fairydust.connect(governance).setTransmuter(transmuter.address)];
                case 13:
                    _m.sent();
                    _h = (_g = fairydust.connect(governance)).setRewards;
                    return [4 /*yield*/, rewards.getAddress()];
                case 14: return [4 /*yield*/, _h.apply(_g, [_m.sent()])];
                case 15:
                    _m.sent();
                    return [4 /*yield*/, fairydust.connect(governance).setHarvestFee(harvestFee)];
                case 16:
                    _m.sent();
                    return [4 /*yield*/, transmuter.connect(governance).setWhitelist(mockFairydustAddress, true)];
                case 17:
                    _m.sent();
                    return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                case 18:
                    adapter = (_m.sent());
                    return [4 /*yield*/, fairydust.connect(governance).initialize(adapter.address)];
                case 19:
                    _m.sent();
                    return [4 /*yield*/, fairydust
                            .connect(governance)
                            .setCollateralizationLimit(collateralizationLimit)];
                case 20:
                    _m.sent();
                    return [4 /*yield*/, transmuter.connect(governance).setRewards(adapter.address)];
                case 21:
                    _m.sent();
                    return [4 /*yield*/, transmuter.connect(governance).initialize(transVaultAdaptor.address)];
                case 22:
                    _m.sent();
                    return [4 /*yield*/, transmuter.connect(governance).setTransmutationPeriod(40320)];
                case 23:
                    _m.sent();
                    _k = (_j = transmuter.connect(governance)).setSentinel;
                    return [4 /*yield*/, sentinel.getAddress()];
                case 24: return [4 /*yield*/, _k.apply(_j, [_m.sent()])];
                case 25:
                    _m.sent();
                    return [4 /*yield*/, fEth.connect(deployer).setWhitelist(fairydust.address, true)];
                case 26:
                    _m.sent();
                    return [4 /*yield*/, fEth.connect(deployer).setCeiling(fairydust.address, ceilingAmt)];
                case 27:
                    _m.sent();
                    return [4 /*yield*/, token.connect(mockFairydust).deposit({ value: ethers_1.utils.parseEther("10000") })];
                case 28:
                    _m.sent();
                    return [4 /*yield*/, token.connect(mockFairydust).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                case 29:
                    _m.sent();
                    return [4 /*yield*/, token.connect(depositor).deposit({ value: ethers_1.utils.parseEther("20000") })];
                case 30:
                    _m.sent();
                    return [4 /*yield*/, token.connect(minter).deposit({ value: ethers_1.utils.parseEther("20000") })];
                case 31:
                    _m.sent();
                    return [4 /*yield*/, token.connect(depositor).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                case 32:
                    _m.sent();
                    return [4 /*yield*/, fEth.connect(depositor).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                case 33:
                    _m.sent();
                    return [4 /*yield*/, token.connect(depositor).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                case 34:
                    _m.sent();
                    return [4 /*yield*/, fEth.connect(depositor).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                case 35:
                    _m.sent();
                    return [4 /*yield*/, token.connect(minter).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                case 36:
                    _m.sent();
                    return [4 /*yield*/, fEth.connect(minter).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                case 37:
                    _m.sent();
                    return [4 /*yield*/, token.connect(minter).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                case 38:
                    _m.sent();
                    return [4 /*yield*/, fEth.connect(minter).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                case 39:
                    _m.sent();
                    return [4 /*yield*/, fairydust.connect(depositor).deposit(ethers_1.utils.parseEther("10000"), false)];
                case 40:
                    _m.sent();
                    return [4 /*yield*/, fairydust.connect(depositor).mint(ethers_1.utils.parseEther("5000"))];
                case 41:
                    _m.sent();
                    return [4 /*yield*/, fairydust.connect(minter).deposit(ethers_1.utils.parseEther("10000"), false)];
                case 42:
                    _m.sent();
                    return [4 /*yield*/, fairydust.connect(minter).mint(ethers_1.utils.parseEther("5000"))];
                case 43:
                    _m.sent();
                    transmuter = transmuter.connect(depositor);
                    return [4 /*yield*/, fEth.totalSupply()];
                case 44:
                    preTestTotalfUsdSupply = _m.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe("initialize()", function () {
        it("reverts if the transmuter is already initialized", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                expect(transmuter.connect(governance).initialize(transVaultAdaptor.address)).revertedWith('Transmuter: already initialized');
                return [2 /*return*/];
            });
        }); });
    });
    describe("migrate()", function () {
        it("reverts if the new vault adaptor is already in use by another vault", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                expect(transmuter.connect(governance).migrate(transVaultAdaptor.address)).revertedWith('Adapter already in use');
                return [2 /*return*/];
            });
        }); });
        it("successfully updates the active vault to a new vault with a unique address", function () { return __awaiter(void 0, void 0, void 0, function () {
            var newAdaptor, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, VaultAdapterMockWithIndirectionFactory.connect(deployer).deploy(token.address)];
                    case 1:
                        newAdaptor = (_c.sent());
                        return [4 /*yield*/, transmuter.connect(governance).migrate(newAdaptor.address)];
                    case 2:
                        _c.sent();
                        _a = expect;
                        return [4 /*yield*/, transmuter.getVaultAdapter(0)];
                    case 3:
                        _a.apply(void 0, [_c.sent()]).equal(transVaultAdaptor.address);
                        _b = expect;
                        return [4 /*yield*/, transmuter.getVaultAdapter(1)];
                    case 4:
                        _b.apply(void 0, [_c.sent()]).equal(newAdaptor.address);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("stake()", function () {
        it("stakes 1000 fEth and reads the correct amount", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, transmuter.stake(1000)];
                    case 1:
                        _d.sent();
                        _a = expect;
                        _c = (_b = transmuter).depositedAlTokens;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 2: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                    case 3:
                        _a.apply(void 0, [_d.sent()]).equal(1000);
                        return [2 /*return*/];
                }
            });
        }); });
        it("stakes 1000 fEth two times and reads the correct amount", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, transmuter.stake(1000)];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, transmuter.stake(1000)];
                    case 2:
                        _d.sent();
                        _a = expect;
                        _c = (_b = transmuter).depositedAlTokens;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 3: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                    case 4:
                        _a.apply(void 0, [_d.sent()]).equal(2000);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("unstake()", function () {
        it("reverts on depositing and then unstaking balance greater than deposit", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, transmuter.stake(ethers_1.utils.parseEther("1000"))];
                    case 1:
                        _a.sent();
                        expect(transmuter.unstake(ethers_1.utils.parseEther("2000"))).revertedWith("Transmuter: unstake amount exceeds deposited amount");
                        return [2 /*return*/];
                }
            });
        }); });
        it("deposits and unstakes 1000 fUsd", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, transmuter.stake(ethers_1.utils.parseEther("1000"))];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, transmuter.unstake(ethers_1.utils.parseEther("1000"))];
                    case 2:
                        _d.sent();
                        _a = expect;
                        _c = (_b = transmuter).depositedAlTokens;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 3: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                    case 4:
                        _a.apply(void 0, [_d.sent()]).equal(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it("deposits 1000 fUsd and unstaked 500 fUsd", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, transmuter.stake(ethers_1.utils.parseEther("1000"))];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, transmuter.unstake(ethers_1.utils.parseEther("500"))];
                    case 2:
                        _d.sent();
                        _a = expect;
                        _c = (_b = transmuter).depositedAlTokens;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 3: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                    case 4:
                        _a.apply(void 0, [_d.sent()]).equal(ethers_1.utils.parseEther("500"));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("distributes correct amount", function () {
        var distributeAmt = ethers_1.utils.parseEther("1000");
        var stakeAmt = ethers_1.utils.parseEther("1000");
        var transmutationPeriod = 20;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, transmuter.connect(governance).setTransmutationPeriod(transmutationPeriod)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, token.connect(minter).deposit({ value: ethers_1.utils.parseEther("20000") })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, token.connect(minter).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, fEth.connect(minter).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, token.connect(minter).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, fEth.connect(minter).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, fairydust.connect(minter).deposit(ethers_1.utils.parseEther("10000"), false)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, fairydust.connect(minter).mint(ethers_1.utils.parseEther("5000"))];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, token.connect(rewards).deposit({ value: ethers_1.utils.parseEther("20000") })];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, token.connect(rewards).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, fEth.connect(rewards).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, token.connect(rewards).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, fEth.connect(rewards).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, fairydust.connect(rewards).deposit(ethers_1.utils.parseEther("10000"), false)];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, fairydust.connect(rewards).mint(ethers_1.utils.parseEther("5000"))];
                    case 15:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("deposits 100000 fUsd, distributes 1000 DAI, and the correct amount of tokens are distributed to depositor", function () { return __awaiter(void 0, void 0, void 0, function () {
            var numBlocks, userInfo, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        numBlocks = 5;
                        return [4 /*yield*/, transmuter.connect(depositor).stake(stakeAmt)];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, numBlocks)];
                    case 3:
                        _c.sent();
                        _b = (_a = transmuter).userInfo;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 4: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 5:
                        userInfo = _c.sent();
                        // pendingdivs should be (distributeAmt * (numBlocks / transmutationPeriod))
                        expect(userInfo.pendingdivs).equal(distributeAmt.div(4));
                        return [2 /*return*/];
                }
            });
        }); });
        it("two people deposit equal amounts and recieve equal amounts in distribution", function () { return __awaiter(void 0, void 0, void 0, function () {
            var userInfo1, _a, _b, userInfo2, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, transmuter.connect(depositor).stake(ethers_1.utils.parseEther("1000"))];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, transmuter.connect(minter).stake(ethers_1.utils.parseEther("1000"))];
                    case 2:
                        _e.sent();
                        return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                    case 3:
                        _e.sent();
                        return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                    case 4:
                        _e.sent();
                        _b = (_a = transmuter).userInfo;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 5: return [4 /*yield*/, _b.apply(_a, [_e.sent()])];
                    case 6:
                        userInfo1 = _e.sent();
                        _d = (_c = transmuter).userInfo;
                        return [4 /*yield*/, minter.getAddress()];
                    case 7: return [4 /*yield*/, _d.apply(_c, [_e.sent()])];
                    case 8:
                        userInfo2 = _e.sent();
                        expect(userInfo1.pendingdivs).gt(0);
                        expect(userInfo1.pendingdivs).equal(userInfo2.pendingdivs);
                        return [2 /*return*/];
                }
            });
        }); });
        it("deposits of 500, 250, and 250 from three people and distribution is correct", function () { return __awaiter(void 0, void 0, void 0, function () {
            var userInfo1, _a, _b, userInfo2, _c, _d, userInfo3, _e, _f, user2, user3, sumOfTwoUsers;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, transmuter.connect(depositor).stake(ethers_1.utils.parseEther("500"))];
                    case 1:
                        _g.sent();
                        return [4 /*yield*/, transmuter.connect(minter).stake(ethers_1.utils.parseEther("250"))];
                    case 2:
                        _g.sent();
                        return [4 /*yield*/, transmuter.connect(rewards).stake(ethers_1.utils.parseEther("250"))];
                    case 3:
                        _g.sent();
                        return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                    case 4:
                        _g.sent();
                        return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                    case 5:
                        _g.sent();
                        _b = (_a = transmuter).userInfo;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 6: return [4 /*yield*/, _b.apply(_a, [_g.sent()])];
                    case 7:
                        userInfo1 = _g.sent();
                        _d = (_c = transmuter).userInfo;
                        return [4 /*yield*/, minter.getAddress()];
                    case 8: return [4 /*yield*/, _d.apply(_c, [_g.sent()])];
                    case 9:
                        userInfo2 = _g.sent();
                        _f = (_e = transmuter).userInfo;
                        return [4 /*yield*/, rewards.getAddress()];
                    case 10: return [4 /*yield*/, _f.apply(_e, [_g.sent()])];
                    case 11:
                        userInfo3 = _g.sent();
                        user2 = userInfo2.pendingdivs;
                        user3 = userInfo3.pendingdivs;
                        sumOfTwoUsers = user2.add(user3);
                        expect(userInfo1.pendingdivs).gt(0);
                        expect(sumOfTwoUsers).equal(userInfo1.pendingdivs);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("transmute() claim() transmuteAndClaim()", function () {
        var distributeAmt = ethers_1.utils.parseEther("500");
        var transmutedAmt = ethers_1.BigNumber.from("12400793650793600");
        describe("WETH", function () {
            it("transmutes the correct amount", function () { return __awaiter(void 0, void 0, void 0, function () {
                var userInfo, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, transmuter.stake(ethers_1.utils.parseEther("1000"))];
                        case 1:
                            _c.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                        case 2:
                            _c.sent();
                            return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                        case 3:
                            _c.sent();
                            return [4 /*yield*/, transmuter.transmute()];
                        case 4:
                            _c.sent();
                            _b = (_a = transmuter).userInfo;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 5: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                        case 6:
                            userInfo = _c.sent();
                            expect(userInfo.realised).equal(transmutedAmt);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("burns the supply of fUsd on transmute()", function () { return __awaiter(void 0, void 0, void 0, function () {
                var fUsdTokenSupply;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, transmuter.stake(ethers_1.utils.parseEther("1000"))];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, transmuter.transmute()];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, fEth.totalSupply()];
                        case 5:
                            fUsdTokenSupply = _a.sent();
                            expect(fUsdTokenSupply).equal(preTestTotalfUsdSupply.sub(transmutedAmt));
                            return [2 /*return*/];
                    }
                });
            }); });
            it("moves DAI from pendingdivs to inbucket upon staking more", function () { return __awaiter(void 0, void 0, void 0, function () {
                var userInfo, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, transmuter.stake(ethers_1.utils.parseEther("1000"))];
                        case 1:
                            _c.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                        case 2:
                            _c.sent();
                            return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                        case 3:
                            _c.sent();
                            return [4 /*yield*/, transmuter.stake(ethers_1.utils.parseEther("100"))];
                        case 4:
                            _c.sent();
                            _b = (_a = transmuter).userInfo;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 5: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                        case 6:
                            userInfo = _c.sent();
                            expect(userInfo.inbucket).equal(transmutedAmt);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("transmutes and claims using transmute() and then claim(false)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var tokenBalanceBefore, _a, _b, tokenBalanceAfter, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, transmuter.stake(ethers_1.utils.parseEther("1000"))];
                        case 1:
                            _e.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                        case 2:
                            _e.sent();
                            return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                        case 3:
                            _e.sent();
                            _b = (_a = token.connect(depositor)).balanceOf;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 4: return [4 /*yield*/, _b.apply(_a, [_e.sent()])];
                        case 5:
                            tokenBalanceBefore = _e.sent();
                            return [4 /*yield*/, transmuter.transmute()];
                        case 6:
                            _e.sent();
                            return [4 /*yield*/, transmuter.claim(false)];
                        case 7:
                            _e.sent();
                            _d = (_c = token.connect(depositor)).balanceOf;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 8: return [4 /*yield*/, _d.apply(_c, [_e.sent()])];
                        case 9:
                            tokenBalanceAfter = _e.sent();
                            expect(tokenBalanceAfter).equal(tokenBalanceBefore.add(transmutedAmt));
                            return [2 /*return*/];
                    }
                });
            }); });
            it("transmutes and claims using transmuteAndClaim(false)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var tokenBalanceBefore, _a, _b, tokenBalanceAfter, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, transmuter.stake(ethers_1.utils.parseEther("1000"))];
                        case 1:
                            _e.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                        case 2:
                            _e.sent();
                            return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                        case 3:
                            _e.sent();
                            _b = (_a = token.connect(depositor)).balanceOf;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 4: return [4 /*yield*/, _b.apply(_a, [_e.sent()])];
                        case 5:
                            tokenBalanceBefore = _e.sent();
                            return [4 /*yield*/, transmuter.transmuteAndClaim(false)];
                        case 6:
                            _e.sent();
                            _d = (_c = token.connect(depositor)).balanceOf;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 7: return [4 /*yield*/, _d.apply(_c, [_e.sent()])];
                        case 8:
                            tokenBalanceAfter = _e.sent();
                            expect(tokenBalanceAfter).equal(tokenBalanceBefore.add(transmutedAmt));
                            return [2 /*return*/];
                    }
                });
            }); });
            it("transmutes the full buffer if a complete phase has passed", function () { return __awaiter(void 0, void 0, void 0, function () {
                var tokenBalanceBefore, _a, _b, tokenBalanceAfter, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, transmuter.stake(ethers_1.utils.parseEther("1000"))];
                        case 1:
                            _e.sent();
                            return [4 /*yield*/, transmuter.connect(governance).setTransmutationPeriod(10)];
                        case 2:
                            _e.sent();
                            return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                        case 3:
                            _e.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 11)];
                        case 4:
                            _e.sent();
                            _b = (_a = token.connect(depositor)).balanceOf;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 5: return [4 /*yield*/, _b.apply(_a, [_e.sent()])];
                        case 6:
                            tokenBalanceBefore = _e.sent();
                            return [4 /*yield*/, transmuter.connect(depositor).transmuteAndClaim(false)];
                        case 7:
                            _e.sent();
                            _d = (_c = token.connect(depositor)).balanceOf;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 8: return [4 /*yield*/, _d.apply(_c, [_e.sent()])];
                        case 9:
                            tokenBalanceAfter = _e.sent();
                            expect(tokenBalanceAfter).equal(tokenBalanceBefore.add(distributeAmt));
                            return [2 /*return*/];
                    }
                });
            }); });
            it("transmutes the staked amount and distributes overflow if a bucket overflows", function () { return __awaiter(void 0, void 0, void 0, function () {
                var distributeAmt0, distributeAmt1, depStakeAmt0, depStakeAmt1, minterInfo, _a, _b, minterBucketBefore, _c, _d, userInfo, _e, _f, minterBucketAfter;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            distributeAmt0 = ethers_1.utils.parseEther("90");
                            distributeAmt1 = ethers_1.utils.parseEther("60");
                            depStakeAmt0 = ethers_1.utils.parseEther("100");
                            depStakeAmt1 = ethers_1.utils.parseEther("200");
                            return [4 /*yield*/, transmuter.connect(governance).setTransmutationPeriod(10)];
                        case 1:
                            _g.sent();
                            return [4 /*yield*/, token.connect(minter).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                        case 2:
                            _g.sent();
                            return [4 /*yield*/, fEth.connect(minter).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                        case 3:
                            _g.sent();
                            return [4 /*yield*/, fEth.connect(user).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                        case 4:
                            _g.sent();
                            return [4 /*yield*/, token.connect(minter).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                        case 5:
                            _g.sent();
                            return [4 /*yield*/, token.connect(user).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                        case 6:
                            _g.sent();
                            return [4 /*yield*/, fEth.connect(minter).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                        case 7:
                            _g.sent();
                            return [4 /*yield*/, fEth.connect(user).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                        case 8:
                            _g.sent();
                            return [4 /*yield*/, token.connect(minter).deposit({ value: ethers_1.utils.parseEther("20000") })];
                        case 9:
                            _g.sent();
                            return [4 /*yield*/, fairydust.connect(minter).deposit(ethers_1.utils.parseEther("10000"), false)];
                        case 10:
                            _g.sent();
                            return [4 /*yield*/, fairydust.connect(minter).mint(ethers_1.utils.parseEther("5000"))];
                        case 11:
                            _g.sent();
                            return [4 /*yield*/, token.connect(user).deposit({ value: ethers_1.utils.parseEther("20000") })];
                        case 12:
                            _g.sent();
                            return [4 /*yield*/, fairydust.connect(user).deposit(ethers_1.utils.parseEther("10000"), false)];
                        case 13:
                            _g.sent();
                            return [4 /*yield*/, fairydust.connect(user).mint(ethers_1.utils.parseEther("5000"))];
                        case 14:
                            _g.sent();
                            // user 1 deposit
                            return [4 /*yield*/, transmuter.connect(depositor).stake(depStakeAmt0)];
                        case 15:
                            // user 1 deposit
                            _g.sent();
                            return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt0)];
                        case 16:
                            _g.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                        case 17:
                            _g.sent();
                            // user 2 deposit
                            return [4 /*yield*/, transmuter.connect(minter).stake(depStakeAmt1)];
                        case 18:
                            // user 2 deposit
                            _g.sent();
                            return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt1)];
                        case 19:
                            _g.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                        case 20:
                            _g.sent();
                            return [4 /*yield*/, transmuter.connect(user).stake(depStakeAmt1)];
                        case 21:
                            _g.sent();
                            _b = (_a = transmuter).userInfo;
                            return [4 /*yield*/, minter.getAddress()];
                        case 22: return [4 /*yield*/, _b.apply(_a, [_g.sent()])];
                        case 23:
                            minterInfo = _g.sent();
                            minterBucketBefore = minterInfo.inbucket;
                            return [4 /*yield*/, transmuter.connect(depositor).transmuteAndClaim(false)];
                        case 24:
                            _g.sent();
                            _d = (_c = transmuter).userInfo;
                            return [4 /*yield*/, minter.getAddress()];
                        case 25: return [4 /*yield*/, _d.apply(_c, [_g.sent()])];
                        case 26:
                            minterInfo = _g.sent();
                            _f = (_e = transmuter).userInfo;
                            return [4 /*yield*/, user.getAddress()];
                        case 27: return [4 /*yield*/, _f.apply(_e, [_g.sent()])];
                        case 28:
                            userInfo = _g.sent();
                            minterBucketAfter = minterInfo.inbucket;
                            expect(minterBucketAfter).equal(minterBucketBefore.add(utils_1.parseEther("5")));
                            expect(userInfo.inbucket).equal(utils_1.parseEther("5"));
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("ETH", function () {
            var epsilon = utils_1.parseEther(".1");
            it("transmutes the correct amount", function () { return __awaiter(void 0, void 0, void 0, function () {
                var userInfo, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, transmuter.stake(ethers_1.utils.parseEther("1000"))];
                        case 1:
                            _c.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                        case 2:
                            _c.sent();
                            return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                        case 3:
                            _c.sent();
                            return [4 /*yield*/, transmuter.transmute()];
                        case 4:
                            _c.sent();
                            _b = (_a = transmuter).userInfo;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 5: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                        case 6:
                            userInfo = _c.sent();
                            expect(userInfo.realised).equal(transmutedAmt);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("burns the supply of fUsd on transmute()", function () { return __awaiter(void 0, void 0, void 0, function () {
                var fUsdTokenSupply;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, transmuter.stake(ethers_1.utils.parseEther("1000"))];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, transmuter.transmute()];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, fEth.totalSupply()];
                        case 5:
                            fUsdTokenSupply = _a.sent();
                            expect(fUsdTokenSupply).equal(preTestTotalfUsdSupply.sub(transmutedAmt));
                            return [2 /*return*/];
                    }
                });
            }); });
            it("moves DAI from pendingdivs to inbucket upon staking more", function () { return __awaiter(void 0, void 0, void 0, function () {
                var userInfo, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, transmuter.stake(ethers_1.utils.parseEther("1000"))];
                        case 1:
                            _c.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                        case 2:
                            _c.sent();
                            return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                        case 3:
                            _c.sent();
                            return [4 /*yield*/, transmuter.stake(ethers_1.utils.parseEther("100"))];
                        case 4:
                            _c.sent();
                            _b = (_a = transmuter).userInfo;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 5: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                        case 6:
                            userInfo = _c.sent();
                            expect(userInfo.inbucket).equal(transmutedAmt);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("transmutes and claims using transmute() and then claim(true)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var tokenBalanceBefore, tokenBalanceAfter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, transmuter.stake(ethers_1.utils.parseEther("1000"))];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, depositor.getBalance()];
                        case 4:
                            tokenBalanceBefore = _a.sent();
                            return [4 /*yield*/, transmuter.transmute()];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, transmuter.claim(true)];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, depositor.getBalance()];
                        case 7:
                            tokenBalanceAfter = _a.sent();
                            expect(tokenBalanceBefore.add(transmutedAmt).sub(tokenBalanceAfter)).lt(epsilon);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("transmutes and claims using transmuteAndClaim(true)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var tokenBalanceBefore, tokenBalanceAfter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, transmuter.stake(ethers_1.utils.parseEther("1000"))];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, depositor.getBalance()];
                        case 4:
                            tokenBalanceBefore = _a.sent();
                            return [4 /*yield*/, transmuter.transmuteAndClaim(true)];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, depositor.getBalance()];
                        case 6:
                            tokenBalanceAfter = _a.sent();
                            expect(tokenBalanceBefore.add(transmutedAmt).sub(tokenBalanceAfter)).lt(epsilon);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("transmutes the full buffer if a complete phase has passed", function () { return __awaiter(void 0, void 0, void 0, function () {
                var tokenBalanceBefore, tokenBalanceAfter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, transmuter.stake(ethers_1.utils.parseEther("1000"))];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, transmuter.connect(governance).setTransmutationPeriod(10)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 11)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, depositor.getBalance()];
                        case 5:
                            tokenBalanceBefore = _a.sent();
                            return [4 /*yield*/, transmuter.connect(depositor).transmuteAndClaim(true)];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, depositor.getBalance()];
                        case 7:
                            tokenBalanceAfter = _a.sent();
                            expect(tokenBalanceBefore.add(distributeAmt).sub(tokenBalanceAfter)).lt(epsilon);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("transmutes the staked amount and distributes overflow if a bucket overflows", function () { return __awaiter(void 0, void 0, void 0, function () {
                var distributeAmt0, distributeAmt1, depStakeAmt0, depStakeAmt1, minterInfo, _a, _b, minterBucketBefore, _c, _d, userInfo, _e, _f, minterBucketAfter;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            distributeAmt0 = ethers_1.utils.parseEther("90");
                            distributeAmt1 = ethers_1.utils.parseEther("60");
                            depStakeAmt0 = ethers_1.utils.parseEther("100");
                            depStakeAmt1 = ethers_1.utils.parseEther("200");
                            return [4 /*yield*/, transmuter.connect(governance).setTransmutationPeriod(10)];
                        case 1:
                            _g.sent();
                            return [4 /*yield*/, token.connect(minter).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                        case 2:
                            _g.sent();
                            return [4 /*yield*/, fEth.connect(minter).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                        case 3:
                            _g.sent();
                            return [4 /*yield*/, fEth.connect(user).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                        case 4:
                            _g.sent();
                            return [4 /*yield*/, token.connect(minter).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                        case 5:
                            _g.sent();
                            return [4 /*yield*/, token.connect(user).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                        case 6:
                            _g.sent();
                            return [4 /*yield*/, fEth.connect(minter).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                        case 7:
                            _g.sent();
                            return [4 /*yield*/, fEth.connect(user).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                        case 8:
                            _g.sent();
                            return [4 /*yield*/, token.connect(minter).deposit({ value: ethers_1.utils.parseEther("20000") })];
                        case 9:
                            _g.sent();
                            return [4 /*yield*/, fairydust.connect(minter).deposit(ethers_1.utils.parseEther("10000"), false)];
                        case 10:
                            _g.sent();
                            return [4 /*yield*/, fairydust.connect(minter).mint(ethers_1.utils.parseEther("5000"))];
                        case 11:
                            _g.sent();
                            return [4 /*yield*/, token.connect(user).deposit({ value: ethers_1.utils.parseEther("20000") })];
                        case 12:
                            _g.sent();
                            return [4 /*yield*/, fairydust.connect(user).deposit(ethers_1.utils.parseEther("10000"), false)];
                        case 13:
                            _g.sent();
                            return [4 /*yield*/, fairydust.connect(user).mint(ethers_1.utils.parseEther("5000"))];
                        case 14:
                            _g.sent();
                            // user 1 deposit
                            return [4 /*yield*/, transmuter.connect(depositor).stake(depStakeAmt0)];
                        case 15:
                            // user 1 deposit
                            _g.sent();
                            return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt0)];
                        case 16:
                            _g.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                        case 17:
                            _g.sent();
                            // user 2 deposit
                            return [4 /*yield*/, transmuter.connect(minter).stake(depStakeAmt1)];
                        case 18:
                            // user 2 deposit
                            _g.sent();
                            return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt1)];
                        case 19:
                            _g.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                        case 20:
                            _g.sent();
                            return [4 /*yield*/, transmuter.connect(user).stake(depStakeAmt1)];
                        case 21:
                            _g.sent();
                            _b = (_a = transmuter).userInfo;
                            return [4 /*yield*/, minter.getAddress()];
                        case 22: return [4 /*yield*/, _b.apply(_a, [_g.sent()])];
                        case 23:
                            minterInfo = _g.sent();
                            minterBucketBefore = minterInfo.inbucket;
                            return [4 /*yield*/, transmuter.connect(depositor).transmuteAndClaim(true)];
                        case 24:
                            _g.sent();
                            _d = (_c = transmuter).userInfo;
                            return [4 /*yield*/, minter.getAddress()];
                        case 25: return [4 /*yield*/, _d.apply(_c, [_g.sent()])];
                        case 26:
                            minterInfo = _g.sent();
                            _f = (_e = transmuter).userInfo;
                            return [4 /*yield*/, user.getAddress()];
                        case 27: return [4 /*yield*/, _f.apply(_e, [_g.sent()])];
                        case 28:
                            userInfo = _g.sent();
                            minterBucketAfter = minterInfo.inbucket;
                            expect(minterBucketAfter).equal(minterBucketBefore.add(utils_1.parseEther("5")));
                            expect(userInfo.inbucket).equal(utils_1.parseEther("5"));
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("ensureSufficientFundsExistLocally()", function () { return __awaiter(void 0, void 0, void 0, function () {
            var distributeAmt, plantableThreshold, transmuterPreClaimBal, userPreClaimBal, vaultPreClaimBal;
            return __generator(this, function (_a) {
                distributeAmt = ethers_1.utils.parseEther("500");
                plantableThreshold = utils_1.parseEther("100");
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, transmuter.connect(governance).setPlantableThreshold(plantableThreshold)];
                            case 1:
                                _a.sent(); // 100
                                return [4 /*yield*/, transmuter.connect(governance).setTransmutationPeriod(10)];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                describe("transmuterPreClaimBal < claimAmount", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var stakeAmt;
                    return __generator(this, function (_a) {
                        stakeAmt = ethers_1.utils.parseEther("200");
                        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, transmuter.connect(depositor).stake(stakeAmt)];
                                    case 1:
                                        _c.sent();
                                        return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                                    case 2:
                                        _c.sent();
                                        return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                                    case 3:
                                        _c.sent();
                                        return [4 /*yield*/, transmuter.connect(depositor).transmute()];
                                    case 4:
                                        _c.sent();
                                        return [4 /*yield*/, token.balanceOf(transmuter.address)];
                                    case 5:
                                        transmuterPreClaimBal = _c.sent();
                                        _b = (_a = token).balanceOf;
                                        return [4 /*yield*/, depositor.getAddress()];
                                    case 6: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                                    case 7:
                                        userPreClaimBal = _c.sent();
                                        return [4 /*yield*/, transVaultAdaptor.totalValue()];
                                    case 8:
                                        vaultPreClaimBal = _c.sent();
                                        return [4 /*yield*/, transmuter.claim(false)];
                                    case 9:
                                        _c.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        it("recalls enough funds to handle the claim request", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var userPostClaimBal, _a, _b, claimAmt;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _b = (_a = token).balanceOf;
                                        return [4 /*yield*/, depositor.getAddress()];
                                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                                    case 2:
                                        userPostClaimBal = _c.sent();
                                        claimAmt = (userPostClaimBal).sub(userPreClaimBal);
                                        expect(transmuterPreClaimBal).lt(claimAmt);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        it("recalls enough funds to reach plantableThreshold", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var transmuterPostClaimBal, vaultPostClaimBal;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, token.balanceOf(transmuter.address)];
                                    case 1:
                                        transmuterPostClaimBal = _a.sent();
                                        expect(transmuterPostClaimBal).equal(plantableThreshold);
                                        return [4 /*yield*/, transVaultAdaptor.totalValue()];
                                    case 2:
                                        vaultPostClaimBal = _a.sent();
                                        expect(vaultPostClaimBal).equal(vaultPreClaimBal.sub(stakeAmt));
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        it("recalls all funds from the vault if the vault contains less than plantableThreshold", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var stakeAmt2, transmuterPostClaimBal, vaultPostClaimBal;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        stakeAmt2 = utils_1.parseEther("250");
                                        return [4 /*yield*/, transmuter.connect(depositor).stake(stakeAmt2)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, transmuter.connect(depositor).transmute()];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, transmuter.claim(false)];
                                    case 4:
                                        _a.sent();
                                        return [4 /*yield*/, token.balanceOf(transmuter.address)];
                                    case 5:
                                        transmuterPostClaimBal = _a.sent();
                                        expect(transmuterPostClaimBal).equal(distributeAmt.sub(stakeAmt.add(stakeAmt2)));
                                        return [4 /*yield*/, transVaultAdaptor.totalValue()];
                                    case 6:
                                        vaultPostClaimBal = _a.sent();
                                        expect(vaultPostClaimBal).equal(0);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); });
                describe("transmuterPreClaimBal >= claimAmount", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var stakeAmt;
                    return __generator(this, function (_a) {
                        stakeAmt = ethers_1.utils.parseEther("50");
                        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, transmuter.connect(depositor).stake(stakeAmt)];
                                    case 1:
                                        _c.sent();
                                        return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                                    case 2:
                                        _c.sent();
                                        return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                                    case 3:
                                        _c.sent();
                                        return [4 /*yield*/, transmuter.connect(depositor).transmute()];
                                    case 4:
                                        _c.sent();
                                        return [4 /*yield*/, token.balanceOf(transmuter.address)];
                                    case 5:
                                        transmuterPreClaimBal = _c.sent();
                                        _b = (_a = token).balanceOf;
                                        return [4 /*yield*/, depositor.getAddress()];
                                    case 6: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                                    case 7:
                                        userPreClaimBal = _c.sent();
                                        return [4 /*yield*/, transVaultAdaptor.totalValue()];
                                    case 8:
                                        vaultPreClaimBal = _c.sent();
                                        return [4 /*yield*/, transmuter.claim(false)];
                                    case 9:
                                        _c.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        it("does not recall funds from the vault if resulting balance is under plantableThreshold", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var vaultPostClaimBal;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, transVaultAdaptor.totalValue()];
                                    case 1:
                                        vaultPostClaimBal = _a.sent();
                                        expect(vaultPostClaimBal).equal(vaultPreClaimBal);
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
    describe("transmuteClaimAndWithdraw()", function () {
        var distributeAmt = ethers_1.utils.parseEther("500");
        var transmutedAmt = ethers_1.BigNumber.from("6200396825396800");
        var fEthBalanceBefore;
        var tokenBalanceBefore;
        describe("WETH", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _b = (_a = token.connect(depositor)).balanceOf;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 1: return [4 /*yield*/, _b.apply(_a, [_e.sent()])];
                        case 2:
                            tokenBalanceBefore = _e.sent();
                            _d = (_c = fEth.connect(depositor)).balanceOf;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 3: return [4 /*yield*/, _d.apply(_c, [_e.sent()])];
                        case 4:
                            fEthBalanceBefore = _e.sent();
                            return [4 /*yield*/, transmuter.stake(ethers_1.utils.parseEther("1000"))];
                        case 5:
                            _e.sent();
                            return [4 /*yield*/, transmuter.connect(minter).stake(ethers_1.utils.parseEther("1000"))];
                        case 6:
                            _e.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                        case 7:
                            _e.sent();
                            return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                        case 8:
                            _e.sent();
                            return [4 /*yield*/, transmuter.transmuteClaimAndWithdraw(false)];
                        case 9:
                            _e.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("has a staking balance of 0 fUsd after transmuteClaimAndWithdraw()", function () { return __awaiter(void 0, void 0, void 0, function () {
                var userInfo, _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            _b = (_a = transmuter).userInfo;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 1: return [4 /*yield*/, _b.apply(_a, [_f.sent()])];
                        case 2:
                            userInfo = _f.sent();
                            expect(userInfo.depositedAl).equal(0);
                            _c = expect;
                            _e = (_d = transmuter).depositedAlTokens;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 3: return [4 /*yield*/, _e.apply(_d, [_f.sent()])];
                        case 4:
                            _c.apply(void 0, [_f.sent()]).equal(0);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("returns the amount of fUsd staked less the transmuted amount", function () { return __awaiter(void 0, void 0, void 0, function () {
                var fEthBalanceAfter, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = (_a = fEth.connect(depositor)).balanceOf;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                        case 2:
                            fEthBalanceAfter = _c.sent();
                            expect(fEthBalanceAfter).equal(fEthBalanceBefore.sub(transmutedAmt));
                            return [2 /*return*/];
                    }
                });
            }); });
            it("burns the correct amount of transmuted fUsd using transmuteClaimAndWithdraw()", function () { return __awaiter(void 0, void 0, void 0, function () {
                var fUsdTokenSupply;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fEth.totalSupply()];
                        case 1:
                            fUsdTokenSupply = _a.sent();
                            expect(fUsdTokenSupply).equal(preTestTotalfUsdSupply.sub(transmutedAmt));
                            return [2 /*return*/];
                    }
                });
            }); });
            it("successfully sends DAI to owner using transmuteClaimAndWithdraw()", function () { return __awaiter(void 0, void 0, void 0, function () {
                var tokenBalanceAfter, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = (_a = token.connect(depositor)).balanceOf;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                        case 2:
                            tokenBalanceAfter = _c.sent();
                            expect(tokenBalanceAfter).equal(tokenBalanceBefore.add(transmutedAmt));
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("ETH", function () {
            var epsilon = utils_1.parseEther(".1");
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, depositor.getBalance()];
                        case 1:
                            tokenBalanceBefore = _c.sent();
                            _b = (_a = fEth.connect(depositor)).balanceOf;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 2: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                        case 3:
                            fEthBalanceBefore = _c.sent();
                            return [4 /*yield*/, transmuter.stake(ethers_1.utils.parseEther("1000"))];
                        case 4:
                            _c.sent();
                            return [4 /*yield*/, transmuter.connect(minter).stake(ethers_1.utils.parseEther("1000"))];
                        case 5:
                            _c.sent();
                            return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                        case 6:
                            _c.sent();
                            return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                        case 7:
                            _c.sent();
                            return [4 /*yield*/, transmuter.transmuteClaimAndWithdraw(true)];
                        case 8:
                            _c.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("has a staking balance of 0 fUsd after transmuteClaimAndWithdraw(true)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var userInfo, _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            _b = (_a = transmuter).userInfo;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 1: return [4 /*yield*/, _b.apply(_a, [_f.sent()])];
                        case 2:
                            userInfo = _f.sent();
                            expect(userInfo.depositedAl).equal(0);
                            _c = expect;
                            _e = (_d = transmuter).depositedAlTokens;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 3: return [4 /*yield*/, _e.apply(_d, [_f.sent()])];
                        case 4:
                            _c.apply(void 0, [_f.sent()]).equal(0);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("returns the amount of fUsd staked less the transmuted amount", function () { return __awaiter(void 0, void 0, void 0, function () {
                var fEthBalanceAfter, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = (_a = fEth.connect(depositor)).balanceOf;
                            return [4 /*yield*/, depositor.getAddress()];
                        case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                        case 2:
                            fEthBalanceAfter = _c.sent();
                            expect(fEthBalanceAfter).equal(fEthBalanceBefore.sub(transmutedAmt));
                            return [2 /*return*/];
                    }
                });
            }); });
            it("burns the correct amount of transmuted fUsd using transmuteClaimAndWithdraw(true)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var fUsdTokenSupply;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fEth.totalSupply()];
                        case 1:
                            fUsdTokenSupply = _a.sent();
                            expect(fUsdTokenSupply).equal(preTestTotalfUsdSupply.sub(transmutedAmt));
                            return [2 /*return*/];
                    }
                });
            }); });
            it("successfully sends ETH to owner using transmuteClaimAndWithdraw(true)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var tokenBalanceAfter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, depositor.getBalance()];
                        case 1:
                            tokenBalanceAfter = _a.sent();
                            expect(tokenBalanceBefore.add(transmutedAmt).sub(tokenBalanceAfter)).lt(epsilon);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe("exit()", function () {
        var distributeAmt = ethers_1.utils.parseEther("500");
        var transmutedAmt = ethers_1.BigNumber.from("6200396825396800");
        var fEthBalanceBefore;
        var tokenBalanceBefore;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = token.connect(depositor)).balanceOf;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_e.sent()])];
                    case 2:
                        tokenBalanceBefore = _e.sent();
                        _d = (_c = fEth.connect(depositor)).balanceOf;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 3: return [4 /*yield*/, _d.apply(_c, [_e.sent()])];
                    case 4:
                        fEthBalanceBefore = _e.sent();
                        return [4 /*yield*/, transmuter.stake(ethers_1.utils.parseEther("1000"))];
                    case 5:
                        _e.sent();
                        return [4 /*yield*/, transmuter.connect(minter).stake(ethers_1.utils.parseEther("1000"))];
                    case 6:
                        _e.sent();
                        return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                    case 7:
                        _e.sent();
                        return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                    case 8:
                        _e.sent();
                        return [4 /*yield*/, transmuter.exit()];
                    case 9:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("transmutes and then withdraws fUsd from staking", function () { return __awaiter(void 0, void 0, void 0, function () {
            var fEthBalanceAfter, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = fEth.connect(depositor)).balanceOf;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 2:
                        fEthBalanceAfter = _c.sent();
                        expect(fEthBalanceAfter).equal(fEthBalanceBefore.sub(transmutedAmt));
                        return [2 /*return*/];
                }
            });
        }); });
        it("transmutes and claimable DAI moves to realised value", function () { return __awaiter(void 0, void 0, void 0, function () {
            var userInfo, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = transmuter).userInfo;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 2:
                        userInfo = _c.sent();
                        expect(userInfo.realised).equal(transmutedAmt);
                        return [2 /*return*/];
                }
            });
        }); });
        it("does not claim the realized tokens", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tokenBalanceAfter, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = token.connect(depositor)).balanceOf;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 2:
                        tokenBalanceAfter = _c.sent();
                        expect(tokenBalanceAfter).equal(tokenBalanceBefore);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("forceTransmute()", function () {
        var distributeAmt = ethers_1.utils.parseEther("5000");
        var epsilon = utils_1.parseEther(".1");
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transmuter.connect(governance).setTransmutationPeriod(10);
                        return [4 /*yield*/, token.connect(minter).deposit({ value: ethers_1.utils.parseEther("20000") })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, token.connect(minter).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, fEth.connect(minter).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, token.connect(minter).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, fEth.connect(minter).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, fairydust.connect(minter).deposit(ethers_1.utils.parseEther("10000"), false)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, fairydust.connect(minter).mint(ethers_1.utils.parseEther("5000"))];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, transmuter.connect(depositor).stake(ethers_1.utils.parseEther(".01"))];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("User 'depositor' has fUsd overfilled, user 'minter' force transmutes user 'depositor' and user 'depositor' has ETH sent to his address", function () { return __awaiter(void 0, void 0, void 0, function () {
            var ethBalanceBefore, _a, _b, ethBalanceAfter;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, transmuter.connect(minter).stake(ethers_1.utils.parseEther("10"))];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, depositor.getBalance()];
                    case 4:
                        ethBalanceBefore = _c.sent();
                        _b = (_a = transmuter.connect(minter)).forceTransmute;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 5: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 6:
                        _c.sent();
                        return [4 /*yield*/, depositor.getBalance()];
                    case 7:
                        ethBalanceAfter = _c.sent();
                        expect(ethBalanceBefore).equal(ethBalanceAfter.sub(ethers_1.utils.parseEther("0.01")));
                        return [2 /*return*/];
                }
            });
        }); });
        it("User 'depositor' has fUsd overfilled, user 'minter' force transmutes user 'depositor' and user 'minter' overflow added inbucket", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, userInfo, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, transmuter.connect(minter).stake(ethers_1.utils.parseEther("10"))];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                    case 2:
                        _e.sent();
                        return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                    case 3:
                        _e.sent();
                        _b = (_a = transmuter.connect(minter)).forceTransmute;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 4: return [4 /*yield*/, _b.apply(_a, [_e.sent()])];
                    case 5:
                        _e.sent();
                        _d = (_c = transmuter.connect(minter)).userInfo;
                        return [4 /*yield*/, minter.getAddress()];
                    case 6: return [4 /*yield*/, _d.apply(_c, [_e.sent()])];
                    case 7:
                        userInfo = _e.sent();
                        // TODO calculate the expected value
                        expect(userInfo.inbucket).equal("4999989999999999999999");
                        return [2 /*return*/];
                }
            });
        }); });
        it("you can force transmute yourself", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tokenBalanceBefore, _a, _b, tokenBalanceAfter, expectedBalanceAfter;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, transmuter.connect(minter).stake(ethers_1.utils.parseEther("1"))];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, depositor.getBalance()];
                    case 4:
                        tokenBalanceBefore = _c.sent();
                        _b = (_a = transmuter.connect(depositor)).forceTransmute;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 5: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 6:
                        _c.sent();
                        return [4 /*yield*/, depositor.getBalance()];
                    case 7:
                        tokenBalanceAfter = _c.sent();
                        expectedBalanceAfter = tokenBalanceAfter.sub(ethers_1.utils.parseEther("0.01"));
                        expect(tokenBalanceBefore.sub(expectedBalanceAfter)).lt(epsilon);
                        return [2 /*return*/];
                }
            });
        }); });
        it("you can force transmute yourself even when you are the only one in the transmuter", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tokenBalanceBefore, _a, _b, tokenBalanceAfter, expectedBalanceAfter;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, depositor.getBalance()];
                    case 3:
                        tokenBalanceBefore = _c.sent();
                        _b = (_a = transmuter.connect(depositor)).forceTransmute;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 4: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, depositor.getBalance()];
                    case 6:
                        tokenBalanceAfter = _c.sent();
                        expectedBalanceAfter = tokenBalanceAfter.sub(ethers_1.utils.parseEther("0.01"));
                        expect(tokenBalanceBefore.sub(expectedBalanceAfter)).lt(epsilon);
                        return [2 /*return*/];
                }
            });
        }); });
        it("reverts when you are not overfilled", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, transmuter.connect(minter).stake(ethers_1.utils.parseEther("1000"))];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, ethers_1.utils.parseEther("1000"))];
                    case 2:
                        _d.sent();
                        _a = expect;
                        _c = (_b = transmuter.connect(minter)).forceTransmute;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 3:
                        _a.apply(void 0, [_c.apply(_b, [_d.sent()])]).revertedWith("Transmuter: !overflow");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    //not sure what this is actually testing.... REEEE
    describe("Multiple Users displays all overfilled users", function () {
        it("returns userInfo", function () { return __awaiter(void 0, void 0, void 0, function () {
            var multipleUsers, userList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, transmuter.stake(ethers_1.utils.parseEther("1000"))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, transmuter.connect(minter).stake(ethers_1.utils.parseEther("1000"))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, ethers_1.utils.parseEther("5000"))];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, transmuter.getMultipleUserInfo(0, 1)];
                    case 4:
                        multipleUsers = _a.sent();
                        userList = multipleUsers.theUserData;
                        expect(userList.length).equal(2);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("distribute()", function () {
        var transmutationPeriod = 20;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, transmuter.connect(governance).setTransmutationPeriod(transmutationPeriod)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("must be whitelisted to call distribute", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, transmuter.connect(depositor).stake(ethers_1.utils.parseEther("1000"))];
                    case 1:
                        _a.sent();
                        expect(transmuter.connect(depositor).distribute(fairydust.address, ethers_1.utils.parseEther("1000"))).revertedWith("Transmuter: !whitelisted");
                        return [2 /*return*/];
                }
            });
        }); });
        it("increases buffer size, but does not immediately increase allocations", function () { return __awaiter(void 0, void 0, void 0, function () {
            var userInfo, _a, _b, bufferInfo;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, transmuter.connect(depositor).stake(ethers_1.utils.parseEther("1000"))];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, ethers_1.utils.parseEther("1000"))];
                    case 2:
                        _c.sent();
                        _b = (_a = transmuter).userInfo;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 3: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 4:
                        userInfo = _c.sent();
                        return [4 /*yield*/, transmuter.bufferInfo()];
                    case 5:
                        bufferInfo = _c.sent();
                        expect(bufferInfo._buffer).equal(ethers_1.utils.parseEther("1000"));
                        expect(bufferInfo._deltaBlocks).equal(0);
                        expect(bufferInfo._toDistribute).equal(0);
                        expect(userInfo.pendingdivs).equal(0);
                        expect(userInfo.depositedAl).equal(ethers_1.utils.parseEther("1000"));
                        expect(userInfo.inbucket).equal(0);
                        expect(userInfo.realised).equal(0);
                        return [2 /*return*/];
                }
            });
        }); });
        describe("userInfo()", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                it("distribute increases allocations if the buffer is already > 0", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var blocksMined, stakeAmt, userInfo, _a, _b, bufferInfo;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                blocksMined = 10;
                                stakeAmt = ethers_1.utils.parseEther("1000");
                                return [4 /*yield*/, transmuter.connect(depositor).stake(stakeAmt)];
                            case 1:
                                _c.sent();
                                return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, ethers_1.utils.parseEther("1000"))];
                            case 2:
                                _c.sent();
                                return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, blocksMined)];
                            case 3:
                                _c.sent();
                                _b = (_a = transmuter).userInfo;
                                return [4 /*yield*/, depositor.getAddress()];
                            case 4: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                            case 5:
                                userInfo = _c.sent();
                                return [4 /*yield*/, transmuter.bufferInfo()];
                            case 6:
                                bufferInfo = _c.sent();
                                // 2 = transmutationPeriod / blocksMined
                                expect(bufferInfo._buffer).equal(stakeAmt);
                                expect(userInfo.pendingdivs).equal(stakeAmt.div(2));
                                expect(userInfo.depositedAl).equal(stakeAmt);
                                expect(userInfo.inbucket).equal(0);
                                expect(userInfo.realised).equal(0);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("increases buffer size, and userInfo() shows the correct state without an extra nudge", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var stakeAmt, userInfo, _a, _b, bufferInfo;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                stakeAmt = ethers_1.utils.parseEther("1000");
                                return [4 /*yield*/, transmuter.connect(depositor).stake(stakeAmt)];
                            case 1:
                                _c.sent();
                                return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, stakeAmt)];
                            case 2:
                                _c.sent();
                                return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                            case 3:
                                _c.sent();
                                _b = (_a = transmuter).userInfo;
                                return [4 /*yield*/, depositor.getAddress()];
                            case 4: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                            case 5:
                                userInfo = _c.sent();
                                return [4 /*yield*/, transmuter.bufferInfo()];
                            case 6:
                                bufferInfo = _c.sent();
                                expect(bufferInfo._buffer).equal("1000000000000000000000");
                                expect(userInfo.pendingdivs).equal(stakeAmt.div(2));
                                expect(userInfo.depositedAl).equal(stakeAmt);
                                expect(userInfo.inbucket).equal(0);
                                expect(userInfo.realised).equal(0);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
        describe("_plantOrRecallExcessFunds", function () { return __awaiter(void 0, void 0, void 0, function () {
            var stakeAmt, transmuterPreDistributeBal, transmuterPostDistributeBal, plantableThreshold, plantableMargin, vaultPreDistributeBal;
            return __generator(this, function (_a) {
                stakeAmt = utils_1.parseEther("50");
                plantableThreshold = utils_1.parseEther("100");
                plantableMargin = "10";
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, transmuter.connect(depositor).stake(stakeAmt)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, transmuter.connect(governance).setPlantableThreshold(plantableThreshold)];
                            case 2:
                                _a.sent(); // 100
                                return [4 /*yield*/, transmuter.connect(governance).setPlantableMargin(plantableMargin)];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, token.balanceOf(transmuter.address)];
                            case 4:
                                transmuterPreDistributeBal = _a.sent(); // 0
                                return [2 /*return*/];
                        }
                    });
                }); });
                describe("transmuterPostDistributeBal < plantableThreshold", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        it("does not send funds to the active vault", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var distributeAmt, vaultPostDistributeBal;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        distributeAmt = ethers_1.utils.parseEther("50");
                                        return [4 /*yield*/, transVaultAdaptor.totalValue()];
                                    case 1:
                                        vaultPreDistributeBal = _a.sent();
                                        return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, transVaultAdaptor.totalValue()];
                                    case 3:
                                        vaultPostDistributeBal = _a.sent();
                                        expect(vaultPostDistributeBal).equal(vaultPreDistributeBal);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        describe("vault has funds before distribute()", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var vaultPostDistributeBal;
                            return __generator(this, function (_a) {
                                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var distributeAmt0;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                distributeAmt0 = utils_1.parseEther("150");
                                                return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt0)];
                                            case 1:
                                                _a.sent();
                                                // transmuterBal = 100, vaultBal = 50
                                                // transmute and claim staked 50
                                                return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                                            case 2:
                                                // transmuterBal = 100, vaultBal = 50
                                                // transmute and claim staked 50
                                                _a.sent();
                                                return [4 /*yield*/, transmuter.connect(depositor).transmute()];
                                            case 3:
                                                _a.sent();
                                                return [4 /*yield*/, transmuter.claim(false)];
                                            case 4:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                it("recalls funds from the active vault if they are available", function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var distributeAmt1;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                distributeAmt1 = utils_1.parseEther("25");
                                                return [4 /*yield*/, transVaultAdaptor.totalValue()];
                                            case 1:
                                                vaultPreDistributeBal = _a.sent();
                                                return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt1)];
                                            case 2:
                                                _a.sent();
                                                return [4 /*yield*/, transVaultAdaptor.totalValue()];
                                            case 3:
                                                vaultPostDistributeBal = _a.sent();
                                                expect(vaultPostDistributeBal).equal(vaultPreDistributeBal.sub(utils_1.parseEther("25")));
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                it("recalls the exact amount of funds needed to reach plantableThreshold", function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var distributeAmt1;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                distributeAmt1 = utils_1.parseEther("25");
                                                return [4 /*yield*/, transVaultAdaptor.totalValue()];
                                            case 1:
                                                vaultPreDistributeBal = _a.sent();
                                                return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt1)];
                                            case 2:
                                                _a.sent();
                                                return [4 /*yield*/, token.balanceOf(transmuter.address)];
                                            case 3:
                                                transmuterPostDistributeBal = _a.sent();
                                                expect(transmuterPostDistributeBal).equal(plantableThreshold);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                it("does not recall funds if below by less than plantableMargin", function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var distributeAmt1;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                distributeAmt1 = utils_1.parseEther("45");
                                                return [4 /*yield*/, transVaultAdaptor.totalValue()];
                                            case 1:
                                                vaultPreDistributeBal = _a.sent();
                                                return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt1)];
                                            case 2:
                                                _a.sent();
                                                return [4 /*yield*/, transVaultAdaptor.totalValue()];
                                            case 3:
                                                vaultPostDistributeBal = _a.sent();
                                                expect(vaultPostDistributeBal).equal(vaultPreDistributeBal);
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
                describe("transmuterPostDistributeBal > plantableThreshold", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var vaultPreDistributeBal;
                    return __generator(this, function (_a) {
                        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, transVaultAdaptor.totalValue()];
                                    case 1:
                                        vaultPreDistributeBal = _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        it("sends excess funds to the active vault", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var distributeAmt, vaultPostDistributeBal;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        distributeAmt = utils_1.parseEther("150");
                                        return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, transVaultAdaptor.totalValue()];
                                    case 2:
                                        vaultPostDistributeBal = _a.sent();
                                        expect(vaultPostDistributeBal).equal(vaultPreDistributeBal.add(utils_1.parseEther("50")));
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        it("sends the exact amount of funds in excess to reach plantableThreshold", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var distributeAmt, transmuterPostDistributeBal;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        distributeAmt = utils_1.parseEther("150");
                                        return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, token.balanceOf(transmuter.address)];
                                    case 2:
                                        transmuterPostDistributeBal = _a.sent();
                                        expect(transmuterPostDistributeBal).equal(plantableThreshold);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        it("does not send funds if above by less than plantableMargin", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var distributeAmt, vaultPostDistributeBal;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        distributeAmt = utils_1.parseEther("55");
                                        return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, transVaultAdaptor.totalValue()];
                                    case 2:
                                        vaultPostDistributeBal = _a.sent();
                                        expect(vaultPostDistributeBal).equal(vaultPreDistributeBal);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); });
                describe("transmuterPostDistributeBal == plantableThreshold", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        it("does nothing", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var distributeAmt, vaultPostDistributeBal, transmuterPostDistributeBal;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        distributeAmt = utils_1.parseEther("100");
                                        return [4 /*yield*/, transVaultAdaptor.totalValue()];
                                    case 1:
                                        vaultPreDistributeBal = _a.sent();
                                        return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, transVaultAdaptor.totalValue()];
                                    case 3:
                                        vaultPostDistributeBal = _a.sent();
                                        expect(vaultPostDistributeBal).equal(vaultPreDistributeBal);
                                        return [4 /*yield*/, token.balanceOf(transmuter.address)];
                                    case 4:
                                        transmuterPostDistributeBal = _a.sent();
                                        expect(transmuterPostDistributeBal).equal(plantableThreshold);
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
    describe("recall", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            describe("recallAllFundsFromVault()", function () { return __awaiter(void 0, void 0, void 0, function () {
                var plantableThreshold, stakeAmt, distributeAmt;
                return __generator(this, function (_a) {
                    plantableThreshold = utils_1.parseEther("100");
                    stakeAmt = utils_1.parseEther("100");
                    distributeAmt = ethers_1.utils.parseEther("150");
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, transmuter.connect(depositor).stake(stakeAmt)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, transmuter.connect(governance).setPlantableThreshold(plantableThreshold)];
                                case 2:
                                    _a.sent(); // 100
                                    return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                                case 3:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it("reverts when not paused", function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            expect(transmuter.connect(governance).recallAllFundsFromVault(0))
                                .revertedWith("Transmuter: not paused, or not governance or sentinel");
                            return [2 /*return*/];
                        });
                    }); });
                    it("reverts when not governance or sentinel", function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, transmuter.connect(governance).setPause(true)];
                                case 1:
                                    _a.sent();
                                    expect(transmuter.connect(minter).recallAllFundsFromVault(0))
                                        .revertedWith("Transmuter: not paused, or not governance or sentinel");
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it("recalls funds from active vault", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var transmuterPreRecallBal, transmuterPostRecallBal, vaultPostRecallBal;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, transmuter.connect(sentinel).setPause(true)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, token.balanceOf(transmuter.address)];
                                case 2:
                                    transmuterPreRecallBal = _a.sent();
                                    return [4 /*yield*/, transmuter.connect(governance).recallAllFundsFromVault(0)];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, token.balanceOf(transmuter.address)];
                                case 4:
                                    transmuterPostRecallBal = _a.sent();
                                    return [4 /*yield*/, transVaultAdaptor.totalValue()];
                                case 5:
                                    vaultPostRecallBal = _a.sent();
                                    expect(transmuterPostRecallBal).equal(transmuterPreRecallBal.add(utils_1.parseEther("50")));
                                    expect(vaultPostRecallBal).equal(0);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it("recalls funds from any non-active vault", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var transmuterPreRecallBal, newVault, transmuterPostRecallBal, vaultPostRecallBal;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, transmuter.connect(sentinel).setPause(true)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, token.balanceOf(transmuter.address)];
                                case 2:
                                    transmuterPreRecallBal = _a.sent();
                                    return [4 /*yield*/, VaultAdapterMockWithIndirectionFactory.connect(deployer).deploy(token.address)];
                                case 3:
                                    newVault = (_a.sent());
                                    return [4 /*yield*/, transmuter.connect(governance).migrate(newVault.address)];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, transmuter.connect(sentinel).recallAllFundsFromVault(0)];
                                case 5:
                                    _a.sent();
                                    return [4 /*yield*/, token.balanceOf(transmuter.address)];
                                case 6:
                                    transmuterPostRecallBal = _a.sent();
                                    return [4 /*yield*/, transVaultAdaptor.totalValue()];
                                case 7:
                                    vaultPostRecallBal = _a.sent();
                                    expect(transmuterPostRecallBal).equal(transmuterPreRecallBal.add(utils_1.parseEther("50")));
                                    expect(vaultPostRecallBal).equal(0);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            describe("recallFundsFromVault", function () { return __awaiter(void 0, void 0, void 0, function () {
                var plantableThreshold, stakeAmt, distributeAmt, recallAmt;
                return __generator(this, function (_a) {
                    plantableThreshold = utils_1.parseEther("100");
                    stakeAmt = utils_1.parseEther("100");
                    distributeAmt = ethers_1.utils.parseEther("150");
                    recallAmt = utils_1.parseEther("10");
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, transmuter.connect(depositor).stake(stakeAmt)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, transmuter.connect(governance).setPlantableThreshold(plantableThreshold)];
                                case 2:
                                    _a.sent(); // 100
                                    return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                                case 3:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it("reverts when not paused", function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            expect(transmuter.connect(governance).recallAllFundsFromVault(0))
                                .revertedWith("Transmuter: not paused, or not governance or sentinel");
                            return [2 /*return*/];
                        });
                    }); });
                    it("reverts when not governance or sentinel", function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, transmuter.connect(governance).setPause(true)];
                                case 1:
                                    _a.sent();
                                    expect(transmuter.connect(minter).recallAllFundsFromVault(0))
                                        .revertedWith("Transmuter: not paused, or not governance or sentinel");
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it("recalls funds from active vault", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var transmuterPreRecallBal, transmuterPostRecallBal, vaultPostRecallBal;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, token.balanceOf(transmuter.address)];
                                case 1:
                                    transmuterPreRecallBal = _a.sent();
                                    return [4 /*yield*/, transmuter.connect(sentinel).setPause(true)];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, transmuter.connect(sentinel).recallFundsFromVault(0, recallAmt)];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, token.balanceOf(transmuter.address)];
                                case 4:
                                    transmuterPostRecallBal = _a.sent();
                                    return [4 /*yield*/, transVaultAdaptor.totalValue()];
                                case 5:
                                    vaultPostRecallBal = _a.sent();
                                    expect(transmuterPostRecallBal).equal(transmuterPreRecallBal.add(recallAmt));
                                    expect(vaultPostRecallBal).equal(distributeAmt.sub(plantableThreshold).sub(recallAmt));
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it("recalls funds from any non-active vault", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var transmuterPreRecallBal, newVault, transmuterPostRecallBal, vaultPostRecallBal;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, transmuter.connect(sentinel).setPause(true)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, token.balanceOf(transmuter.address)];
                                case 2:
                                    transmuterPreRecallBal = _a.sent();
                                    return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                                case 3:
                                    newVault = (_a.sent());
                                    return [4 /*yield*/, transmuter.connect(governance).migrate(newVault.address)];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, transmuter.connect(sentinel).recallFundsFromVault(0, recallAmt)];
                                case 5:
                                    _a.sent();
                                    return [4 /*yield*/, token.balanceOf(transmuter.address)];
                                case 6:
                                    transmuterPostRecallBal = _a.sent();
                                    return [4 /*yield*/, transVaultAdaptor.totalValue()];
                                case 7:
                                    vaultPostRecallBal = _a.sent();
                                    expect(transmuterPostRecallBal).equal(transmuterPreRecallBal.add(recallAmt));
                                    expect(vaultPostRecallBal).equal(distributeAmt.sub(plantableThreshold).sub(recallAmt));
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
    describe("harvest()", function () {
        var transmutationPeriod = 10;
        var plantableThreshold = utils_1.parseEther("100");
        var stakeAmt = utils_1.parseEther("50");
        var yieldAmt = utils_1.parseEther("10");
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, transmuterPreDistributeBal;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, transmuter.connect(governance).setTransmutationPeriod(transmutationPeriod)];
                    case 1:
                        _c.sent();
                        _b = (_a = transmuter.connect(governance)).setRewards;
                        return [4 /*yield*/, rewards.getAddress()];
                    case 2: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, transmuter.connect(depositor).stake(stakeAmt)];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, transmuter.connect(governance).setPlantableThreshold(plantableThreshold)];
                    case 5:
                        _c.sent(); // 100
                        return [4 /*yield*/, token.connect(minter).transfer(transVaultAdaptor.address, yieldAmt)];
                    case 6:
                        _c.sent();
                        return [4 /*yield*/, token.balanceOf(transmuter.address)];
                    case 7:
                        transmuterPreDistributeBal = _c.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("reverts if the caller is not a keeper", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                expect(transmuter.connect(depositor).harvest(0)).revertedWith("Transmuter: !keeper");
                return [2 /*return*/];
            });
        }); });
        it("harvests yield from the vault", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, rewardsAddress, transBalPreHarvest, transBalPostHarvest;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = transmuter.connect(governance)).setKeepers;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [[_c.sent()], [true]])];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, rewards.getAddress()];
                    case 3:
                        rewardsAddress = _c.sent();
                        return [4 /*yield*/, token.balanceOf(rewardsAddress)];
                    case 4:
                        transBalPreHarvest = _c.sent();
                        return [4 /*yield*/, transmuter.connect(depositor).harvest(0)];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, token.balanceOf(rewardsAddress)];
                    case 6:
                        transBalPostHarvest = _c.sent();
                        expect(transBalPostHarvest).equal(transBalPreHarvest.add(yieldAmt));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("migrateFunds()", function () {
        var transmutationPeriod = 10;
        var plantableThreshold = utils_1.parseEther("20");
        var stakeAmt = utils_1.parseEther("50");
        var distributeAmt = utils_1.parseEther("100");
        var newTransmuter;
        var newTransVaultAdaptor;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _b = (_a = TransmuterEthFactory.connect(deployer)).deploy;
                        _c = [fEth.address,
                            token.address];
                        return [4 /*yield*/, governance.getAddress()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_f.sent()]))];
                    case 2:
                        newTransmuter = (_f.sent());
                        return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                    case 3:
                        newTransVaultAdaptor = (_f.sent());
                        newTransmuter.connect(governance).migrate(newTransVaultAdaptor.address);
                        newTransmuter.connect(governance).setWhitelist(transmuter.address, true);
                        return [4 /*yield*/, transmuter.connect(governance).setTransmutationPeriod(transmutationPeriod)];
                    case 4:
                        _f.sent();
                        _e = (_d = transmuter.connect(governance)).setRewards;
                        return [4 /*yield*/, rewards.getAddress()];
                    case 5: return [4 /*yield*/, _e.apply(_d, [_f.sent()])];
                    case 6:
                        _f.sent();
                        return [4 /*yield*/, transmuter.connect(depositor).stake(stakeAmt)];
                    case 7:
                        _f.sent();
                        return [4 /*yield*/, transmuter.connect(governance).setPlantableThreshold(plantableThreshold)];
                    case 8:
                        _f.sent();
                        return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                    case 9:
                        _f.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("reverts if anyone but governance tries to migrate", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                expect(transmuter.connect(depositor).migrateFunds(newTransmuter.address))
                    .revertedWith("Transmuter: !governance");
                return [2 /*return*/];
            });
        }); });
        it("reverts when trying to migrate to 0x0", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                expect(transmuter.connect(governance).migrateFunds("0x0000000000000000000000000000000000000000"))
                    .revertedWith("cannot migrate to 0x0");
                return [2 /*return*/];
            });
        }); });
        it("reverts if not in emergency mode", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                expect(transmuter.connect(governance).migrateFunds(newTransmuter.address))
                    .revertedWith("migrate: set emergency exit first");
                return [2 /*return*/];
            });
        }); });
        it("reverts if there are not enough funds to service all open transmuter stakes", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, transmuter.connect(governance).setPause(true)];
                    case 1:
                        _a.sent();
                        expect(transmuter.connect(governance).migrateFunds(newTransmuter.address))
                            .revertedWith("not enough funds to service stakes");
                        return [2 /*return*/];
                }
            });
        }); });
        it("sends all available funds to the new transmuter", function () { return __awaiter(void 0, void 0, void 0, function () {
            var newTransmuterPreMigrateBal, transmuterPostMigrateBal, amountMigrated, newTransmuterPostMigrateBal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, transmuter.connect(governance).setPause(true)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, transmuter.connect(governance).recallAllFundsFromVault(0)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, token.balanceOf(newTransmuter.address)];
                    case 3:
                        newTransmuterPreMigrateBal = _a.sent();
                        return [4 /*yield*/, transmuter.connect(governance).migrateFunds(newTransmuter.address)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, token.balanceOf(transmuter.address)];
                    case 5:
                        transmuterPostMigrateBal = _a.sent();
                        expect(transmuterPostMigrateBal).equal(stakeAmt);
                        amountMigrated = distributeAmt.sub(stakeAmt);
                        return [4 /*yield*/, token.balanceOf(newTransmuter.address)];
                    case 6:
                        newTransmuterPostMigrateBal = _a.sent();
                        expect(newTransmuterPostMigrateBal).equal(newTransmuterPreMigrateBal.add(amountMigrated));
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
