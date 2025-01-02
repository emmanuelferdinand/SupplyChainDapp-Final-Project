import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import AddProduct from "./pages/AddProduct/AddProduct";
import SupplyChainContract from "./SupplyChainContract";
import web3 from "./web3";

const AppRoutes = () => {
    const [currentRole, setCurrentRole] = useState("None"); // Default role
    const navigate = useNavigate();

    // Fetch the current role of the user
    useEffect(() => {
        const fetchCurrentRole = async () => {
            try {
                const accounts = await web3.eth.getAccounts();
                const roleId = await SupplyChainContract.methods.roles(accounts[0]).call();
                const roleString =
                    roleId.toString() === "2" ? "Seller" :
                    roleId.toString() === "1" ? "Buyer" :
                    "None";
                setCurrentRole(roleString);
            } catch (err) {
                console.error("Error fetching current role:", err);
                setCurrentRole("None");
            }
        };
        fetchCurrentRole();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product role={currentRole} />} />
            {currentRole === "Seller" && <Route path="/add-product" element={<AddProduct />} />}
        </Routes>
    );
};

export default AppRoutes;
