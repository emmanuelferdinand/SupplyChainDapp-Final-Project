import web3 from "./web3";
import SupplyChain from "./link/SupplyChain.json";

const contractAddress = "0xB5a979948F63dC0f29Ec607E3999e7A521be04E2"; // Replace with your contract address

let contract;
try {
    contract = new web3.eth.Contract(SupplyChain.abi, contractAddress);
    console.log("Contract initialized successfully:", contract);
} catch (error) {
    console.error("Error initializing contract:", error);
}

export default contract;
