import web3 from "./web3";
import SupplyChain from "./link/SupplyChain.json";

const contractAddress = "0x9c98122E11A6aBc7420167Fb5F4cd55CaC7AD533"; // Replace with your contract address

let contract;
try {
    contract = new web3.eth.Contract(SupplyChain.abi, contractAddress);
    console.log("Contract initialized successfully:", contract);
} catch (error) {
    console.error("Error initializing contract:", error);
}

export default contract;
