Install NVM(Node Version Manager)
Install Solidity
In VSCode Run
npm install -g truffle
npm install -g ganache
ganache --port 7545

on a another terminal run
truffle compile
truffle migrate --network development
truffle test --network development

run in terminal using directory ./client
in SupplyChainContract, connect with your wallet address (metamask preferred)
go back to where you run ganache, scroll up until you find "Contract created:". Paste it to "const contractAddress" in SupplyChainContract.js
in ./client use npm start to start webapp