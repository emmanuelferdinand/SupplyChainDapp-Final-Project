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
                // Exclude deleted items and items without valid name or price
                if (item.id !== "0" && item.name.trim() && item.price !== "0") {
                    itemsArray.push(item);
                }
            }
            setItems(itemsArray);
        } catch (err) {
            console.error("Error fetching items:", err);
        }
    };

    const handleRemove = async (id) => {
        try {
            const accounts = await web3.eth.getAccounts();
            await SupplyChainContract.methods.removeItem(id).send({ from: accounts[0] });
            alert("Product removed successfully!");

            // Refresh the product list after removal
            const itemCount = await SupplyChainContract.methods.itemCounter().call();
            const updatedItems = [];
            for (let i = 1; i <= itemCount; i++) {
                const item = await SupplyChainContract.methods.items(i).call();
                // Exclude deleted items and items without valid name or price
                if (item.id !== "0" && item.name.trim() && item.price !== "0") {
                    updatedItems.push(item);
                }
            }
            setItems(updatedItems);
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
                        const [productName, ...imageParts] = item.name.split(" ");
                        const imageUrl = imageParts.length > 0 && imageParts[0].startsWith("https://")
                            ? imageParts.join(" ")
                            : null;

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
                                    <p><strong>Name:</strong> {productName}</p>
                                    <p><strong>Price:</strong> {web3.utils.fromWei(item.price, "ether")} Ether</p>
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
