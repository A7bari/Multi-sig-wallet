let MultisigWallet = artifacts.require('./MultisigWallet.sol');

module.exports = (deployer, network, accounts ) => {
   const owners = accounts.slice(0,3);

   deployer.deploy(MultisigWallet, owners, 3);
}