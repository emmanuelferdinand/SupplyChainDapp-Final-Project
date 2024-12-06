import web3 from "./web3";
import SupplyChain from "./link/SupplyChain.json";

const contractAddress = "0x717f5a9f4bf5ada3ffd479a6ff25e4a5278dbfd7"; // Replace with your contract address

let contract;
try {
    contract = new web3.eth.Contract(SupplyChain.abi, contractAddress);
    console.log("Contract initialized successfully:", contract);
} catch (error) {
    console.error("Error initializing contract:", error);
}

export default contract;
