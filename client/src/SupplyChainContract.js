import web3 from "./web3";
import SupplyChain from "./link/SupplyChain.json";

const contractAddress = "0x1d4d9ae95b9d37f94bcdbe924209159d932a372c"; // Replace with your contract address

let contract;
try {
    contract = new web3.eth.Contract(SupplyChain.abi, contractAddress);
    console.log("Contract initialized successfully:", contract);
} catch (error) {
    console.error("Error initializing contract:", error);
}

export default contract;
