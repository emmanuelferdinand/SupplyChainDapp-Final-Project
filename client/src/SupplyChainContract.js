import web3 from "./web3";
import SupplyChain from "./link/SupplyChain.json";

const contractAddress = "0xc0d76484c48ec9e0591e44098da265bea917383"; // Replace with your contract address

let contract;
try {
    contract = new web3.eth.Contract(SupplyChain.abi, contractAddress);
    console.log("Contract initialized successfully:", contract);
} catch (error) {
    console.error("Error initializing contract:", error);
}

export default contract;
