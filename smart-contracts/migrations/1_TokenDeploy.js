
const ERC20Token = artifacts.require("ERC20Token");
const CAP_SIZE = 10;
const TOKEN_NAME = "Equistart";
const TOKEN_SYMBOL = "EQST";
const TOKEN_SUPPLY=100000;
const WALLET = "0x94c9858F03AcCEf0D4f0bb1562D12592270aB0fe";

// 5mins=300 sec
// 1mins=60 sec
// const OPENING_TIME_ADD = 10;
// const CLOSING_TIME_ADD = 600;
// const RATE = 1;
 module.exports = function (deployer) {
  deployer.deploy(ERC20Token, TOKEN_NAME,TOKEN_SYMBOL, TOKEN_SUPPLY, WALLET).then((result) => {
    console.log("ERC 20 Token Contract address:", ERC20Token.address);
    // console.log("Result of Deploying script:", result)
    // return deployer.deploy(MYCROWDSALE, CAP_SIZE, Math.floor(Date.now() / 1000) + OPENING_TIME_ADD, Math.floor(Date.now() / 1000) + CLOSING_TIME_ADD, RATE, WALLET, ERC20Token.address)
    return result
  }).catch((e)=>{
    console.log("Error while deploying ERC contract:", e);
  })
};
