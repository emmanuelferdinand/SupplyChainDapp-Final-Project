Install NVM(Node Version Manager)
Install Solidity
In VSCode Run
npm install -g truffle
npm install -g ganache

Setup:
ganache --port 7545
on a another terminal run:
truffle compile
truffle migrate --network development
scroll up until you find "Deployed Contract Address". Paste it to "const contractAddress" in SupplyChainContract.js
This one just for testing, no need for setup. "truffle test --network development"
run in terminal using directory ./client
in SupplyChainContract, connect with your wallet address (metamask preferred)

in ./client use npm start to start webapp
don't forget to connect metamask to app

P.S. client/src/link also has SupplyChain.json, don't forget to update.