"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keccak256 = exports.getContractDefaults = exports.mergeInterface = exports.etherUnsigned = exports.etherMantissa = exports.etherDouble = exports.etherExp = exports.encodeParameters = exports.address = void 0;
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var hardhat_1 = require("hardhat");
function address(n) {
    return "0x" + n.toString(16).padStart(40, '0');
}
exports.address = address;
function encodeParameters(types, values) {
    var abi = new hardhat_1.ethers.utils.AbiCoder();
    return abi.encode(types, values);
}
exports.encodeParameters = encodeParameters;
// export async function etherBalance(addr) {
//   return ethers.BigNumber.from(new BigNum(await web3.eth.getBalance(addr)).toFixed());
// }
// export async function etherGasCost(receipt) {
//   const tx = await web3.eth.getTransaction(receipt.transactionHash);
//   const gasUsed = new BigNum(receipt.gasUsed);
//   const gasPrice = new BigNum(tx.gasPrice);
//   return ethers.BigNumber.from(gasUsed.times(gasPrice).toFixed());
// }
function etherExp(num) { return etherMantissa(num, 1e18); }
exports.etherExp = etherExp;
function etherDouble(num) { return etherMantissa(num, 1e36); }
exports.etherDouble = etherDouble;
function etherMantissa(num, scale) {
    if (scale === void 0) { scale = 1e18; }
    if (num < 0)
        return hardhat_1.ethers.BigNumber.from(new bignumber_js_1.default(2).pow(256).plus(num).toFixed());
    return hardhat_1.ethers.BigNumber.from(new bignumber_js_1.default(num).times(scale).toFixed());
}
exports.etherMantissa = etherMantissa;
function etherUnsigned(num) {
    return hardhat_1.ethers.BigNumber.from(new bignumber_js_1.default(num).toFixed());
}
exports.etherUnsigned = etherUnsigned;
function mergeInterface(into, from) {
    var key = function (item) { return item.inputs ? item.name + "/" + item.inputs.length : item.name; };
    var existing = into.options.jsonInterface.reduce(function (acc, item) {
        acc[key(item)] = true;
        return acc;
    }, {});
    var extended = from.options.jsonInterface.reduce(function (acc, item) {
        if (!(key(item) in existing))
            acc.push(item);
        return acc;
    }, into.options.jsonInterface.slice());
    into.options.jsonInterface = into.options.jsonInterface.concat(from.options.jsonInterface);
    return into;
}
exports.mergeInterface = mergeInterface;
function getContractDefaults() {
    return { gas: 20000000, gasPrice: 20000 };
}
exports.getContractDefaults = getContractDefaults;
function keccak256(values) {
    return hardhat_1.ethers.utils.keccak256(values);
}
exports.keccak256 = keccak256;
