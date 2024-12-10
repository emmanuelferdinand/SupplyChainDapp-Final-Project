import React, { useState, useEffect } from "react";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                    <div className="cart-item" key={index}>
                        <p><strong>Name:</strong> {item.name}</p>
                        <p><strong>Price:</strong> {item.price} Ether</p>
                        <p><strong>Quantity:</strong> {item.quantity}</p>
                    </div>
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
