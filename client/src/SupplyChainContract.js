import web3 from "./web3";
import SupplyChain from "./link/SupplyChain.json";

const contractAddress = "0xb7ad47c819a197af037caaabbba9f5200390d6e6"; // Replace with your contract address

let contract;
try {
    contract = new web3.eth.Contract(SupplyChain.abi, contractAddress);
    console.log("Contract initialized successfully:", contract);
} catch (error) {
    console.error("Error initializing contract:", error);
}

export default contract;
