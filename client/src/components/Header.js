import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SupplyChainContract from "../SupplyChainContract";
import web3 from "../web3";
import "./Header.css"; // Import the CSS file for styling

const Header = () => {
    const [role, setRole] = useState("");

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const accounts = await web3.eth.getAccounts();
                const userRole = await SupplyChainContract.methods.roles(accounts[0]).call();
                setRole(userRole);
            } catch (err) {
                console.error("Error fetching role:", err);
            }
        };
        fetchRole();
    }, []);

    return (
        <header className="navbar">
            <div className="nav-left">
                <h1 className="brand-title">Supply Chain DApp</h1>
            </div>
            <nav className="nav-container">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/product" className="nav-link">Products</Link>
                <Link to="/add-product" className="nav-link">Add Product</Link>
                <Link to="/auth" className="nav-link">Sign In</Link>
            </nav>
        </header>
    );
};

export default Header;
