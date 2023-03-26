
const Factory1 = artifacts.require("SimpliERC20")
const Factory2 = artifacts.require("SimpleTimeLock")
const Factory3 = artifacts.require("SimpliFactory2")
// const Factory2 = artifacts.require("SimpliFactory2.sol")


// const ERC20Token = artifacts.require("ERC20Token");
// const CAP_SIZE = 10;
// const TOKEN_NAME = "Equistart";
// const TOKEN_SYMBOL = "EQST";
// const TOKEN_SUPPLY=100000;
// const WALLET = "0x94c9858F03AcCEf0D4f0bb1562D12592270aB0fe";

// 5mins=300 sec
// 1mins=60 sec
// const OPENING_TIME_ADD = 10;
// const CLOSING_TIME_ADD = 600;
// const RATE = 1;
 module.exports = function (deployer) {
  deployer.deploy(Factory1).then((result)=>{
    // console.log("Simply Factory1 deployed:", result )
  }).catch((e)=>{
    console.log("Error while deploying ERC contract:", e);
  })
  deployer.deploy(Factory2).then((result)=>{
    // console.log("Simply Factory2 deployed:", result )
  }).catch((e)=>{
    console.log("Error while deploying Timelock contract:", e);
  })
  // deployer.deploy(Factory3).then((result)=>{
  //   // console.log("Simply Factory1 deployed:", result )
  // }).catch((e)=>{
  //   console.log("Error while deploying ERC contract:", e);
  // })
};
