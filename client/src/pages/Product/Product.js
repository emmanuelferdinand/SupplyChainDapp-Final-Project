import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SupplyChainContract from "../../SupplyChainContract";
import web3 from "../../web3";
import "./Product.css"; // Import custom CSS for styling

const Product = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const itemCount = await SupplyChainContract.methods.itemCounter().call();
                const itemsArray = [];
                for (let i = 1; i <= itemCount; i++) {
                    const item = await SupplyChainContract.methods.items(i).call();
                    itemsArray.push(item);
                }
                setItems(itemsArray);
            } catch (err) {
                console.error("Error fetching items:", err);
            }
        };

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
