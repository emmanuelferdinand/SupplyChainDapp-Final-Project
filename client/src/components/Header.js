import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SupplyChainContract from "../SupplyChainContract";
import web3 from "../web3";
import "./Header.css"; // Import the CSS file for styling

const Header = ({ onRoleChange }) => {
    const [role, setRole] = useState("Buyer"); // Default role
    const [account, setAccount] = useState(""); // User account
    const [currentRole, setCurrentRole] = useState("None"); // Current role fetched from contract

    // Fetch the user's account
    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0]);
                await fetchCurrentRole(accounts[0]); // Fetch the current role after getting the account
            } catch (err) {
                console.error("Error fetching account:", err);
            }
        };
        fetchAccount();
    }, []);

    const fetchCurrentRole = async (accountAddress) => {
        try {
            const roleId = await SupplyChainContract.methods.roles(accountAddress).call();
            console.log("Fetched Role ID:", roleId); // Debugging roleId
            const roleString =
                roleId.toString() === "2" ? "Seller" :
                roleId.toString() === "1" ? "Buyer" :
                "None";
            setCurrentRole(roleString);
        } catch (err) {
            console.error("Error fetching current role:", err);
        }
    };

    const handleRoleToggle = (newRole) => {
        setRole(newRole);
        onRoleChange(newRole); // Notify the parent component about role change
    };

    const handleAssignRole = async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            // Map role string to uint8
            const roleId = role === "Seller" ? 2 : 1; // Seller = 2, Buyer = 1
            console.log("Assigning Role ID:", roleId); // Debugging roleId during assignment
            await SupplyChainContract.methods.setRole(accounts[0], roleId).send({ from: accounts[0] });
            alert(`Role '${role}' assigned successfully!`);
            await fetchCurrentRole(accounts[0]); // Refresh current role after assigning
        } catch (err) {
            console.error("Error assigning role:", err);
            alert("Failed to assign role.");
        }
    };

    return (
        <header className="navbar">
            <div className="nav-left">
                <h1 className="brand-title">Chain</h1>
            </div>
            <nav className="nav-container">
                <Link to="/" className="nav-link">Home</Link>
                {/* Use currentRole instead of role for visibility */}
                {currentRole === "Seller" && <Link to="/add-product" className="nav-link">Add Product</Link>}
                <Link to="/product" className="nav-link">Products</Link>
            </nav>
            <div className="role-toggle">
                <span>Role:</span>
                <select
                    value={role}
                    onChange={(e) => handleRoleToggle(e.target.value)}
                    className="role-select"
                >
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                </select>
                <button onClick={handleAssignRole} className="assign-role-button">
                    Assign Role
                </button>
            </div>
            <div className="account-display">
                <span>Account: {account || "Not Connected"} </span>
                <span className="current-role">| Role: {currentRole || "None"}</span>
            </div>
        </header>
    );
};

export default Header;
