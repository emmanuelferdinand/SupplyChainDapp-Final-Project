import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    // Modern dApp browsers with MetaMask installed
    web3 = new Web3(window.ethereum);

    // Request account access
    window.ethereum.request({ method: "eth_requestAccounts" }).catch((err) => {
        console.error("User denied MetaMask access:", err);
    });
} else {
    console.error("MetaMask not found. Please install MetaMask!");
    alert("MetaMask is required to use this application.");
}

export default web3;
