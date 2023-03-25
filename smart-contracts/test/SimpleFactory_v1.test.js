const { assert } = require('chai');
const SimpliERC20 = artifacts.require("SimpliERC20");
const SimpleTimeLock = artifacts.require("SimpleTimeLock");
const SimpliFactory2 = artifacts.require("SimpliFactory2");
contract("SimpliERC20 testing", function (accounts) {
    var factoryERC, factoryTmk, factoryGov, new_tkn, new_Tmk, new_Gov;
    it("instance of factoryERC,factoryTmk", async () => {
        factoryERC = await SimpliERC20.deployed()
        factoryTmk = await SimpleTimeLock.deployed()
        factoryGov = await SimpliFactory2.deployed()
    });
    it("Create a new token using createToken function", async () => {
        /*
        factoryERC
        Name-TestingDaoToken,
        Symbol-TDAO,
        Total Supply- 10**18,
        owner- accounts[0]
        */
        new_tkn = await factoryERC.createToken("TestingDaoToken", "TDAO", `${10 ** 18}`, accounts[0]);
        // console.log(new_tkn);
        assert.equal(new_tkn.logs[0].args.name, "TestingDaoToken", "name error");
        assert.equal(new_tkn.logs[0].args.symbol, "TDAO", "symbol error");
        assert.equal(new_tkn.logs[0].event, "NewERC20TokenCreated", "NewERC20TokenCreated event created")
    })
    it("Create a new TimeLock using createTimeLock function", async () => {
        /*
        factoryTmk
        votingPeriod-1000,
        proposers-[accounts[1]],
        executors-[accounts[2]],
        admin-accounts[0]
        */
        new_Tmk = await factoryTmk.createTimeLock(1000, [accounts[1]], [accounts[2]], accounts[0]);
        // console.log(new_Tmk.logs[0].args);
        assert.equal(new_Tmk.logs[0].args.admin, accounts[0], "Admin not set correctly")
        assert.equal(new_Tmk.logs[0].event, "NewTimelockControllerCreated", "NewTimelockControllerCreated event created")
    })
    it("Creating new Governor", async () => {
        /**
         * factoryGov
         * dao name- testingDao
         * tokenAddr-address(new_tkn),
         * timelockAddr-address(new_Tmk)
         */
        new_Gov = await factoryGov.createGovernor("testingDao", new_tkn.address, new_Tmk.address);
        // console.log(new_Gov.logs[0].args);
        assert.equal(new_Tmk.logs[0].args.daoName, "testingDao", "Dao naming error")
    })
})