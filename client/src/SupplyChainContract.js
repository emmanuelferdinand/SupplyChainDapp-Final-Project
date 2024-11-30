import web3 from "./web3";
import SupplyChain from "./link/SupplyChain.json";

const contractAddress = "0x1447a5c20be2edaf0c297eb0b3f5aeebba98205b"; // Replace with your contract address

let contract;
try {
    contract = new web3.eth.Contract(SupplyChain.abi, contractAddress);
    console.log("Contract initialized successfully:", contract);
} catch (error) {
    console.error("Error initializing contract:", error);
}

export default contract;
