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
var TransmuterFactory;
var ERC20MockFactory;
var FUsdFactory;
var VaultAdapterMockFactory;
describe("Transmuter", function () {
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
    var fUsd;
    var harvestFee = 1000;
    var ceilingAmt = ethers_1.utils.parseEther("10000000");
    var collateralizationLimit = "2000000000000000000";
    var mintAmount = 5000;
    var mockFairydustAddress;
    var preTestTotalfUsdSupply;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getContractFactory("Transmuter")];
                case 1:
                    TransmuterFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("ERC20Mock")];
                case 2:
                    ERC20MockFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("FToken")];
                case 3:
                    FUsdFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("Fairydust")];
                case 4:
                    FairydustFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory("VaultAdapterMock")];
                case 5:
                    VaultAdapterMockFactory = _a.sent();
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        var _o;
        return __generator(this, function (_p) {
            switch (_p.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getSigners()];
                case 1:
                    _o = _p.sent(), deployer = _o[0], rewards = _o[1], depositor = _o[2], sentinel = _o[3], minter = _o[4], governance = _o[5], mockFairydust = _o[6], user = _o[7], signers = _o.slice(8);
                    return [4 /*yield*/, ERC20MockFactory.connect(deployer).deploy("Mock DAI", "DAI", 18)];
                case 2:
                    token = (_p.sent());
                    return [4 /*yield*/, FUsdFactory.connect(deployer).deploy()];
                case 3:
                    fUsd = (_p.sent());
                    return [4 /*yield*/, mockFairydust.getAddress()];
                case 4:
                    mockFairydustAddress = _p.sent();
                    _b = (_a = FairydustFactory.connect(deployer)).deploy;
                    _c = [token.address,
                        fUsd.address];
                    return [4 /*yield*/, governance.getAddress()];
                case 5:
                    _c = _c.concat([_p.sent()]);
                    return [4 /*yield*/, sentinel.getAddress()];
                case 6: return [4 /*yield*/, _b.apply(_a, _c.concat([_p.sent()]))];
                case 7:
                    fairydust = (_p.sent());
                    _e = (_d = TransmuterFactory.connect(deployer)).deploy;
                    _f = [fUsd.address,
                        token.address];
                    return [4 /*yield*/, governance.getAddress()];
                case 8: return [4 /*yield*/, _e.apply(_d, _f.concat([_p.sent()]))];
                case 9:
                    transmuter = (_p.sent());
                    return [4 /*yield*/, transmuter.connect(governance).setTransmutationPeriod(40320)];
                case 10:
                    _p.sent();
                    return [4 /*yield*/, fairydust.connect(governance).setTransmuter(transmuter.address)];
                case 11:
                    _p.sent();
                    _h = (_g = fairydust.connect(governance)).setRewards;
                    return [4 /*yield*/, rewards.getAddress()];
                case 12: return [4 /*yield*/, _h.apply(_g, [_p.sent()])];
                case 13:
                    _p.sent();
                    return [4 /*yield*/, fairydust.connect(governance).setHarvestFee(harvestFee)];
                case 14:
                    _p.sent();
                    return [4 /*yield*/, transmuter.connect(governance).setWhitelist(mockFairydustAddress, true)];
                case 15:
                    _p.sent();
                    return [4 /*yield*/, VaultAdapterMockFactory.connect(deployer).deploy(token.address)];
                case 16:
                    adapter = (_p.sent());
                    return [4 /*yield*/, fairydust.connect(governance).initialize(adapter.address)];
                case 17:
                    _p.sent();
                    return [4 /*yield*/, fairydust
                            .connect(governance)
                            .setCollateralizationLimit(collateralizationLimit)];
                case 18:
                    _p.sent();
                    return [4 /*yield*/, fUsd.connect(deployer).setWhitelist(fairydust.address, true)];
                case 19:
                    _p.sent();
                    return [4 /*yield*/, fUsd.connect(deployer).setCeiling(fairydust.address, ceilingAmt)];
                case 20:
                    _p.sent();
                    return [4 /*yield*/, token.mint(mockFairydustAddress, ethers_1.utils.parseEther("10000"))];
                case 21:
                    _p.sent();
                    return [4 /*yield*/, token.connect(mockFairydust).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                case 22:
                    _p.sent();
                    _k = (_j = token).mint;
                    return [4 /*yield*/, depositor.getAddress()];
                case 23: return [4 /*yield*/, _k.apply(_j, [_p.sent(), ethers_1.utils.parseEther("20000")])];
                case 24:
                    _p.sent();
                    _m = (_l = token).mint;
                    return [4 /*yield*/, minter.getAddress()];
                case 25: return [4 /*yield*/, _m.apply(_l, [_p.sent(), ethers_1.utils.parseEther("20000")])];
                case 26:
                    _p.sent();
                    return [4 /*yield*/, token.connect(depositor).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                case 27:
                    _p.sent();
                    return [4 /*yield*/, fUsd.connect(depositor).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                case 28:
                    _p.sent();
                    return [4 /*yield*/, token.connect(depositor).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                case 29:
                    _p.sent();
                    return [4 /*yield*/, fUsd.connect(depositor).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                case 30:
                    _p.sent();
                    return [4 /*yield*/, token.connect(minter).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                case 31:
                    _p.sent();
                    return [4 /*yield*/, fUsd.connect(minter).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                case 32:
                    _p.sent();
                    return [4 /*yield*/, token.connect(minter).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                case 33:
                    _p.sent();
                    return [4 /*yield*/, fUsd.connect(minter).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                case 34:
                    _p.sent();
                    return [4 /*yield*/, fairydust.connect(depositor).deposit(ethers_1.utils.parseEther("10000"))];
                case 35:
                    _p.sent();
                    return [4 /*yield*/, fairydust.connect(depositor).mint(ethers_1.utils.parseEther("5000"))];
                case 36:
                    _p.sent();
                    return [4 /*yield*/, fairydust.connect(minter).deposit(ethers_1.utils.parseEther("10000"))];
                case 37:
                    _p.sent();
                    return [4 /*yield*/, fairydust.connect(minter).mint(ethers_1.utils.parseEther("5000"))];
                case 38:
                    _p.sent();
                    transmuter = transmuter.connect(depositor);
                    return [4 /*yield*/, fUsd.totalSupply()];
                case 39:
                    preTestTotalfUsdSupply = _p.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe("stake()", function () {
        it("stakes 1000 fUsd and reads the correct amount", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, transmuter.stake(1000)];
                    case 1:
                        _d.sent();
                        _a = expect;
                        _c = (_b = transmuter).depositedFTokens;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 2: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                    case 3:
                        _a.apply(void 0, [_d.sent()]).equal(1000);
                        return [2 /*return*/];
                }
            });
        }); });
        it("stakes 1000 fUsd two times and reads the correct amount", function () { return __awaiter(void 0, void 0, void 0, function () {
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
                        _c = (_b = transmuter).depositedFTokens;
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
                        _c = (_b = transmuter).depositedFTokens;
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
                        _c = (_b = transmuter).depositedFTokens;
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
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, transmuter.connect(governance).setTransmutationPeriod(transmutationPeriod)];
                    case 1:
                        _e.sent();
                        _b = (_a = token).mint;
                        return [4 /*yield*/, minter.getAddress()];
                    case 2: return [4 /*yield*/, _b.apply(_a, [_e.sent(), ethers_1.utils.parseEther("20000")])];
                    case 3:
                        _e.sent();
                        return [4 /*yield*/, token.connect(minter).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                    case 4:
                        _e.sent();
                        return [4 /*yield*/, fUsd.connect(minter).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                    case 5:
                        _e.sent();
                        return [4 /*yield*/, token.connect(minter).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                    case 6:
                        _e.sent();
                        return [4 /*yield*/, fUsd.connect(minter).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                    case 7:
                        _e.sent();
                        return [4 /*yield*/, fairydust.connect(minter).deposit(ethers_1.utils.parseEther("10000"))];
                    case 8:
                        _e.sent();
                        return [4 /*yield*/, fairydust.connect(minter).mint(ethers_1.utils.parseEther("5000"))];
                    case 9:
                        _e.sent();
                        _d = (_c = token).mint;
                        return [4 /*yield*/, rewards.getAddress()];
                    case 10: return [4 /*yield*/, _d.apply(_c, [_e.sent(), ethers_1.utils.parseEther("20000")])];
                    case 11:
                        _e.sent();
                        return [4 /*yield*/, token.connect(rewards).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                    case 12:
                        _e.sent();
                        return [4 /*yield*/, fUsd.connect(rewards).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                    case 13:
                        _e.sent();
                        return [4 /*yield*/, token.connect(rewards).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                    case 14:
                        _e.sent();
                        return [4 /*yield*/, fUsd.connect(rewards).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                    case 15:
                        _e.sent();
                        return [4 /*yield*/, fairydust.connect(rewards).deposit(ethers_1.utils.parseEther("10000"))];
                    case 16:
                        _e.sent();
                        return [4 /*yield*/, fairydust.connect(rewards).mint(ethers_1.utils.parseEther("5000"))];
                    case 17:
                        _e.sent();
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
                        return [4 /*yield*/, fUsd.totalSupply()];
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
        it("transmutes and claims using transmute() and then claim()", function () { return __awaiter(void 0, void 0, void 0, function () {
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
                        return [4 /*yield*/, transmuter.claim()];
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
        it("transmutes and claims using transmuteAndClaim()", function () { return __awaiter(void 0, void 0, void 0, function () {
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
                        return [4 /*yield*/, transmuter.transmuteAndClaim()];
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
                        return [4 /*yield*/, transmuter.connect(depositor).transmuteAndClaim()];
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
            var distributeAmt0, distributeAmt1, depStakeAmt0, depStakeAmt1, _a, _b, _c, _d, minterInfo, _e, _f, minterBucketBefore, _g, _h, userInfo, _j, _k, minterBucketAfter;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        distributeAmt0 = ethers_1.utils.parseEther("90");
                        distributeAmt1 = ethers_1.utils.parseEther("60");
                        depStakeAmt0 = ethers_1.utils.parseEther("100");
                        depStakeAmt1 = ethers_1.utils.parseEther("200");
                        return [4 /*yield*/, transmuter.connect(governance).setTransmutationPeriod(10)];
                    case 1:
                        _l.sent();
                        return [4 /*yield*/, token.connect(minter).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                    case 2:
                        _l.sent();
                        return [4 /*yield*/, fUsd.connect(minter).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                    case 3:
                        _l.sent();
                        return [4 /*yield*/, fUsd.connect(user).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                    case 4:
                        _l.sent();
                        return [4 /*yield*/, token.connect(minter).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                    case 5:
                        _l.sent();
                        return [4 /*yield*/, token.connect(user).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                    case 6:
                        _l.sent();
                        return [4 /*yield*/, fUsd.connect(minter).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                    case 7:
                        _l.sent();
                        return [4 /*yield*/, fUsd.connect(user).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                    case 8:
                        _l.sent();
                        _b = (_a = token).mint;
                        return [4 /*yield*/, minter.getAddress()];
                    case 9: return [4 /*yield*/, _b.apply(_a, [_l.sent(), ethers_1.utils.parseEther("20000")])];
                    case 10:
                        _l.sent();
                        return [4 /*yield*/, fairydust.connect(minter).deposit(ethers_1.utils.parseEther("10000"))];
                    case 11:
                        _l.sent();
                        return [4 /*yield*/, fairydust.connect(minter).mint(ethers_1.utils.parseEther("5000"))];
                    case 12:
                        _l.sent();
                        _d = (_c = token).mint;
                        return [4 /*yield*/, user.getAddress()];
                    case 13: return [4 /*yield*/, _d.apply(_c, [_l.sent(), ethers_1.utils.parseEther("20000")])];
                    case 14:
                        _l.sent();
                        return [4 /*yield*/, fairydust.connect(user).deposit(ethers_1.utils.parseEther("10000"))];
                    case 15:
                        _l.sent();
                        return [4 /*yield*/, fairydust.connect(user).mint(ethers_1.utils.parseEther("5000"))];
                    case 16:
                        _l.sent();
                        // user 1 deposit
                        return [4 /*yield*/, transmuter.connect(depositor).stake(depStakeAmt0)];
                    case 17:
                        // user 1 deposit
                        _l.sent();
                        return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt0)];
                    case 18:
                        _l.sent();
                        return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                    case 19:
                        _l.sent();
                        // user 2 deposit
                        return [4 /*yield*/, transmuter.connect(minter).stake(depStakeAmt1)];
                    case 20:
                        // user 2 deposit
                        _l.sent();
                        return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt1)];
                    case 21:
                        _l.sent();
                        return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                    case 22:
                        _l.sent();
                        return [4 /*yield*/, transmuter.connect(user).stake(depStakeAmt1)];
                    case 23:
                        _l.sent();
                        _f = (_e = transmuter).userInfo;
                        return [4 /*yield*/, minter.getAddress()];
                    case 24: return [4 /*yield*/, _f.apply(_e, [_l.sent()])];
                    case 25:
                        minterInfo = _l.sent();
                        minterBucketBefore = minterInfo.inbucket;
                        return [4 /*yield*/, transmuter.connect(depositor).transmuteAndClaim()];
                    case 26:
                        _l.sent();
                        _h = (_g = transmuter).userInfo;
                        return [4 /*yield*/, minter.getAddress()];
                    case 27: return [4 /*yield*/, _h.apply(_g, [_l.sent()])];
                    case 28:
                        minterInfo = _l.sent();
                        _k = (_j = transmuter).userInfo;
                        return [4 /*yield*/, user.getAddress()];
                    case 29: return [4 /*yield*/, _k.apply(_j, [_l.sent()])];
                    case 30:
                        userInfo = _l.sent();
                        minterBucketAfter = minterInfo.inbucket;
                        expect(minterBucketAfter).equal(minterBucketBefore.add(utils_1.parseEther("5")));
                        expect(userInfo.inbucket).equal(utils_1.parseEther("5"));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("transmuteClaimAndWithdraw()", function () {
        var distributeAmt = ethers_1.utils.parseEther("500");
        var transmutedAmt = ethers_1.BigNumber.from("6200396825396800");
        var fUsdBalanceBefore;
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
                        _d = (_c = fUsd.connect(depositor)).balanceOf;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 3: return [4 /*yield*/, _d.apply(_c, [_e.sent()])];
                    case 4:
                        fUsdBalanceBefore = _e.sent();
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
                        return [4 /*yield*/, transmuter.transmuteClaimAndWithdraw()];
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
                        _e = (_d = transmuter).depositedFTokens;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 3: return [4 /*yield*/, _e.apply(_d, [_f.sent()])];
                    case 4:
                        _c.apply(void 0, [_f.sent()]).equal(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it("returns the amount of fUsd staked less the transmuted amount", function () { return __awaiter(void 0, void 0, void 0, function () {
            var fUsdBalanceAfter, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = fUsd.connect(depositor)).balanceOf;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 2:
                        fUsdBalanceAfter = _c.sent();
                        expect(fUsdBalanceAfter).equal(fUsdBalanceBefore.sub(transmutedAmt));
                        return [2 /*return*/];
                }
            });
        }); });
        it("burns the correct amount of transmuted fUsd using transmuteClaimAndWithdraw()", function () { return __awaiter(void 0, void 0, void 0, function () {
            var fUsdTokenSupply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fUsd.totalSupply()];
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
    describe("exit()", function () {
        var distributeAmt = ethers_1.utils.parseEther("500");
        var transmutedAmt = ethers_1.BigNumber.from("6200396825396800");
        var fUsdBalanceBefore;
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
                        _d = (_c = fUsd.connect(depositor)).balanceOf;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 3: return [4 /*yield*/, _d.apply(_c, [_e.sent()])];
                    case 4:
                        fUsdBalanceBefore = _e.sent();
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
            var fUsdBalanceAfter, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = fUsd.connect(depositor)).balanceOf;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 2:
                        fUsdBalanceAfter = _c.sent();
                        expect(fUsdBalanceAfter).equal(fUsdBalanceBefore.sub(transmutedAmt));
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
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        transmuter.connect(governance).setTransmutationPeriod(10);
                        _b = (_a = token).mint;
                        return [4 /*yield*/, minter.getAddress()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent(), ethers_1.utils.parseEther("20000")])];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, token.connect(minter).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, fUsd.connect(minter).approve(transmuter.address, helpers_1.MAXIMUM_U256)];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, token.connect(minter).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, fUsd.connect(minter).approve(fairydust.address, helpers_1.MAXIMUM_U256)];
                    case 6:
                        _c.sent();
                        return [4 /*yield*/, fairydust.connect(minter).deposit(ethers_1.utils.parseEther("10000"))];
                    case 7:
                        _c.sent();
                        return [4 /*yield*/, fairydust.connect(minter).mint(ethers_1.utils.parseEther("5000"))];
                    case 8:
                        _c.sent();
                        return [4 /*yield*/, transmuter.connect(depositor).stake(ethers_1.utils.parseEther(".01"))];
                    case 9:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("User 'depositor' has fUsd overfilled, user 'minter' force transmutes user 'depositor' and user 'depositor' has DAI sent to his address", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tokenBalanceBefore, _a, _b, _c, _d, tokenBalanceAfter, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, transmuter.connect(minter).stake(ethers_1.utils.parseEther("10"))];
                    case 1:
                        _g.sent();
                        return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                    case 2:
                        _g.sent();
                        return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                    case 3:
                        _g.sent();
                        _b = (_a = token.connect(depositor)).balanceOf;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 4: return [4 /*yield*/, _b.apply(_a, [_g.sent()])];
                    case 5:
                        tokenBalanceBefore = _g.sent();
                        _d = (_c = transmuter.connect(minter)).forceTransmute;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 6: return [4 /*yield*/, _d.apply(_c, [_g.sent()])];
                    case 7:
                        _g.sent();
                        _f = (_e = token.connect(depositor)).balanceOf;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 8: return [4 /*yield*/, _f.apply(_e, [_g.sent()])];
                    case 9:
                        tokenBalanceAfter = _g.sent();
                        expect(tokenBalanceBefore).equal(tokenBalanceAfter.sub(ethers_1.utils.parseEther("0.01")));
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
            var tokenBalanceBefore, _a, _b, _c, _d, tokenBalanceAfter, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, transmuter.connect(minter).stake(ethers_1.utils.parseEther("1"))];
                    case 1:
                        _g.sent();
                        return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                    case 2:
                        _g.sent();
                        return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                    case 3:
                        _g.sent();
                        _b = (_a = token.connect(depositor)).balanceOf;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 4: return [4 /*yield*/, _b.apply(_a, [_g.sent()])];
                    case 5:
                        tokenBalanceBefore = _g.sent();
                        _d = (_c = transmuter.connect(depositor)).forceTransmute;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 6: return [4 /*yield*/, _d.apply(_c, [_g.sent()])];
                    case 7:
                        _g.sent();
                        _f = (_e = token.connect(depositor)).balanceOf;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 8: return [4 /*yield*/, _f.apply(_e, [_g.sent()])];
                    case 9:
                        tokenBalanceAfter = _g.sent();
                        expect(tokenBalanceBefore).equal(tokenBalanceAfter.sub(ethers_1.utils.parseEther("0.01")));
                        return [2 /*return*/];
                }
            });
        }); });
        it("you can force transmute yourself even when you are the only one in the transmuter", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tokenBalanceBefore, _a, _b, _c, _d, tokenBalanceAfter, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, transmuter.connect(mockFairydust).distribute(mockFairydustAddress, distributeAmt)];
                    case 1:
                        _g.sent();
                        return [4 /*yield*/, helpers_1.mineBlocks(hardhat_1.ethers.provider, 10)];
                    case 2:
                        _g.sent();
                        _b = (_a = token.connect(depositor)).balanceOf;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 3: return [4 /*yield*/, _b.apply(_a, [_g.sent()])];
                    case 4:
                        tokenBalanceBefore = _g.sent();
                        _d = (_c = transmuter.connect(depositor)).forceTransmute;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 5: return [4 /*yield*/, _d.apply(_c, [_g.sent()])];
                    case 6:
                        _g.sent();
                        _f = (_e = token.connect(depositor)).balanceOf;
                        return [4 /*yield*/, depositor.getAddress()];
                    case 7: return [4 /*yield*/, _f.apply(_e, [_g.sent()])];
                    case 8:
                        tokenBalanceAfter = _g.sent();
                        expect(tokenBalanceBefore).equal(tokenBalanceAfter.sub(ethers_1.utils.parseEther("0.01")));
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
    });
});
