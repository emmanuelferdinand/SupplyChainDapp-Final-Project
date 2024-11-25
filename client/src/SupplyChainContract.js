import web3 from './web3';
import SupplyChain from './link/SupplyChain.json';

const contractAddress = '0xf0C8ED985C37E0dDB4060417fe191f105Fffe8B5';

let contract;
try {
    contract = new web3.eth.Contract(SupplyChain.abi, contractAddress);
    console.log("Contract initialized successfully:", contract);
} catch (error) {
    console.error("Error initializing contract:", error);
}

export default contract;
