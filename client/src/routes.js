import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Auth from './pages/Auth/Auth';
import Profile from './pages/Profile/Profile';
import AddProduct from "./pages/AddProduct/AddProduct";
import Cart from "./Cart";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/product" element={<Product />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    );
};

export default AppRoutes;
