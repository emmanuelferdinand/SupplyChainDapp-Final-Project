import React, { useState } from "react";
import SupplyChainContract from "../../SupplyChainContract";
import web3 from "../../web3";
import "./AddProduct.css"; // Import the custom CSS

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const combinedName = image ? `${name} ${image}` : name; // Combine name and image
            console.log("Submitting:", { combinedName, price });

            const accounts = await web3.eth.getAccounts();
            await SupplyChainContract.methods
                .addItem(combinedName, web3.utils.toWei(price, "ether"))
                .send({ from: accounts[0] });

            alert("Product added successfully!");
            setName("");
            setPrice("");
            setImage("");
        } catch (err) {
            console.error("Error adding product:", err);
            alert("Failed to add product.");
        }
    };

    return (
        <div className="add-product-container">
            <h2 className="title">Add Product</h2>
            <form onSubmit={handleSubmit} className="add-product-form">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="number"
                    placeholder="Price in Ether"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Image URL (optional)"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="input-field"
                />
                <button type="submit" className="submit-button">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
