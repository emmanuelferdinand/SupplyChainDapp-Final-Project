const SupplyChain = artifacts.require("SupplyChain");

module.exports = function (deployer) {
  deployer.deploy(SupplyChain).then(() => {
    console.log("Deployed Contract Address:", SupplyChain.address);
  });
};
