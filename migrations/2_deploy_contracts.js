const SmartRetailEscrow = artifacts.require('SmartRetailEscrow');

module.exports = async function(deployer) {
  deployer.deploy(SmartRetailEscrow);
};
