import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import AddProduct from "./pages/AddProduct/AddProduct";
import Auth from "./pages/Auth/Auth";

const AppRoutes = ({ role }) => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product role={role} />} />
            {role === "Seller" && <Route path="/add-product" element={<AddProduct />} />}

        </Routes>
    );
};

export default AppRoutes;
