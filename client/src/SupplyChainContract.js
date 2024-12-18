import web3 from "./web3";
import SupplyChain from "./link/SupplyChain.json";

const contractAddress = "0x38A7372542bB70E555AF18F76B1793503CeC418B"; // Replace with your contract address

let contract;
try {
    contract = new web3.eth.Contract(SupplyChain.abi, contractAddress);
    console.log("Contract initialized successfully:", contract);
} catch (error) {
    console.error("Error initializing contract:", error);
}

export default contract;
