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
chai_1.default.use(ethereum_waffle_1.solidity);
chai_1.default.use(chai_subset_1.default);
var expect = chai_1.default.expect;
var FairyDustTokenFactory;
describe("FairyDustToken", function () {
    var deployer;
    var signers;
    var token;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getContractFactory("FairyDustToken")];
                case 1:
                    FairyDustTokenFactory = _a.sent();
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
                    _a = _b.sent(), deployer = _a[0], signers = _a.slice(1);
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, FairyDustTokenFactory.deploy()];
                case 1:
                    token = (_a.sent());
                    return [2 /*return*/];
            }
        });
    }); });
    it("grants the admin role to the deployer", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = expect;
                    _c = (_b = token).hasRole;
                    return [4 /*yield*/, token.ADMIN_ROLE()];
                case 1:
                    _d = [_e.sent()];
                    return [4 /*yield*/, deployer.getAddress()];
                case 2: return [4 /*yield*/, _c.apply(_b, _d.concat([_e.sent()]))];
                case 3:
                    _a.apply(void 0, [_e.sent()]).is.true;
                    return [2 /*return*/];
            }
        });
    }); });
    it("grants the minter role to the deployer", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = expect;
                    _c = (_b = token).hasRole;
                    return [4 /*yield*/, token.MINTER_ROLE()];
                case 1:
                    _d = [_e.sent()];
                    return [4 /*yield*/, deployer.getAddress()];
                case 2: return [4 /*yield*/, _c.apply(_b, _d.concat([_e.sent()]))];
                case 3:
                    _a.apply(void 0, [_e.sent()]).is.true;
                    return [2 /*return*/];
            }
        });
    }); });
    describe("mint", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            context("when unauthorized", function () { return __awaiter(void 0, void 0, void 0, function () {
                var unauthorizedMinter, recipient;
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            return [2 /*return*/, (_a = signers, unauthorizedMinter = _a[0], recipient = _a[1], signers = _a.slice(2), _a)];
                        });
                    }); });
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, token = token.connect(unauthorizedMinter)];
                    }); }); });
                    it("reverts", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a, _b, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    _a = expect;
                                    _c = (_b = token).mint;
                                    return [4 /*yield*/, recipient.getAddress()];
                                case 1:
                                    _a.apply(void 0, [_c.apply(_b, [_d.sent(), 1])])
                                        .revertedWith("FairyDustToken: only minter");
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            context("when authorized", function () { return __awaiter(void 0, void 0, void 0, function () {
                var minter, recipient, amount;
                return __generator(this, function (_a) {
                    amount = 1000;
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            return [2 /*return*/, (_a = signers, minter = _a[0], recipient = _a[1], signers = _a.slice(2), _a)];
                        });
                    }); });
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () { var _a, _b, _c; return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _b = (_a = token).grantRole;
                                return [4 /*yield*/, token.MINTER_ROLE()];
                            case 1:
                                _c = [_d.sent()];
                                return [4 /*yield*/, minter.getAddress()];
                            case 2: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.sent()]))];
                            case 3: return [2 /*return*/, _d.sent()];
                        }
                    }); }); });
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, token = token.connect(minter)];
                    }); }); });
                    it("mints tokens", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a, _b, _c, _d, _e;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    _b = (_a = token).mint;
                                    return [4 /*yield*/, recipient.getAddress()];
                                case 1: return [4 /*yield*/, _b.apply(_a, [_f.sent(), amount])];
                                case 2:
                                    _f.sent();
                                    _c = expect;
                                    _e = (_d = token).balanceOf;
                                    return [4 /*yield*/, recipient.getAddress()];
                                case 3: return [4 /*yield*/, _e.apply(_d, [_f.sent()])];
                                case 4:
                                    _c.apply(void 0, [_f.sent()]).equal(amount);
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
