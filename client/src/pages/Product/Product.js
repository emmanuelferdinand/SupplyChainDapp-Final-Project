import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SupplyChainContract from "../../SupplyChainContract";
import web3 from "../../web3";
import "./Product.css"; // Import custom CSS for styling

const Product = () => {
    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        try {
            const itemCount = await SupplyChainContract.methods.itemCounter().call();
            const itemsArray = [];
            for (let i = 1; i <= itemCount; i++) {
                const item = await SupplyChainContract.methods.items(i).call();
                console.log("Fetched Item:", {
                    ...item,
                    quantity: item.quantity.toString(), // Convert BigInt to string for logging
                    price: web3.utils.fromWei(item.price, "ether"),
                });
                // Exclude deleted items and items without valid name, price, or quantity
                if (item.id !== "0" && item.name.trim() && item.price !== "0" && item.quantity > 0) {
                    itemsArray.push(item);
                }
            }
            setItems(itemsArray);
        } catch (err) {
            console.error("Error fetching items:", err);
        }
    };

    const handleBuy = async (id, price, quantity) => {
        const buyQuantity = prompt("Enter the quantity you want to buy:");
        if (!buyQuantity || buyQuantity <= 0 || buyQuantity > quantity) {
            alert("Invalid quantity entered!");
            return;
        }
    
        try {
            const accounts = await web3.eth.getAccounts();
            const totalCost = web3.utils.toWei(
                (Number(price) * Number(buyQuantity)).toString(),
                "ether"
            );
    
            // Make the transaction
            await SupplyChainContract.methods
                .buyItem(id, buyQuantity)
                .send({ from: accounts[0], value: totalCost });
    
            // Add to cart
            const newItem = {
                id: id.toString(), // Convert BigInt to string
                name: `Item ${id}`,
                price: price.toString(), // Convert BigInt to string
                quantity: buyQuantity.toString(), // Convert BigInt to string
            };
            const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
            storedCart.push(newItem);
            localStorage.setItem("cart", JSON.stringify(storedCart));
    
            alert("Purchase successful!");
            fetchItems(); // Refresh product list after purchase
        } catch (err) {
            console.error("Error buying item:", err);
            alert("Failed to buy product.");
        }
    };    

    const handleRemove = async (id) => {
        try {
            const accounts = await web3.eth.getAccounts();
            await SupplyChainContract.methods.removeItem(id).send({ from: accounts[0] });
            alert("Product removed successfully!");

            // Refresh the product list after removal
            fetchItems();
        } catch (err) {
            console.error("Error removing item:", err);
            alert("Failed to remove product.");
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div className="product-page">
            <h1 className="product-title">Products</h1>
            <Link to="/add-product">
                <button className="add-product-button">Add Product</button>
            </Link>
            <div className="product-grid">
                {items.length > 0 ? (
                    items.map((item, index) => {
                        // Split name and image URL intelligently
                        const imageIndex = item.name.lastIndexOf("https://");
                        const productName = imageIndex !== -1 ? item.name.substring(0, imageIndex).trim() : item.name.trim();
                        const imageUrl = imageIndex !== -1 ? item.name.substring(imageIndex).trim() : null;

                        return (
                            <div className="product-card" key={index}>
                                {imageUrl && (
                                    <img
                                        src={imageUrl}
                                        alt={productName}
                                        className="product-image"
                                    />
                                )}
                                <div className="product-details">
                                    <p>
                                        <strong>Name:</strong> {productName}
                                    </p>
                                    <p>
                                        <strong>Price:</strong> {web3.utils.fromWei(item.price, "ether")} Ether
                                    </p>
                                    <p>
                                        <strong>Quantity:</strong> {item.quantity.toString()}
                                    </p>
                                    <button
                                        className="buy-button"
                                        onClick={() =>
                                            handleBuy(
                                                item.id,
                                                web3.utils.fromWei(item.price, "ether"),
                                                item.quantity
                                            )
                                        }
                                    >
                                        Buy
                                    </button>
                                    <button
                                        className="remove-button"
                                        onClick={() => handleRemove(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="no-products">No products available.</p>
                )}
            </div>
        </div>
    );
};

export default Product;
