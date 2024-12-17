import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SupplyChainContract from "../../SupplyChainContract";
import web3 from "../../web3";
import "./Product.css"; // Import custom CSS for styling

const Product = ({ role }) => {
    const [items, setItems] = useState([]);
    const [account, setAccount] = useState(""); // Current user account
    const [filterMyProducts, setFilterMyProducts] = useState(false); // Filter for seller's products
    const [searchSeller, setSearchSeller] = useState(""); // Filter by seller's address
    const [searchProduct, setProduct] = useState("") //Filter by product

    // Fetch the user's account
    const fetchAccount = async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
        } catch (err) {
            console.error("Error fetching account:", err);
        }
    };

    // Fetch items from the contract
    const fetchItems = async () => {
        try {
            const itemCount = await SupplyChainContract.methods.itemCounter().call();
            const itemsArray = [];
            for (let i = 1; i <= itemCount; i++) {
                const item = await SupplyChainContract.methods.items(i).call();
                if (item.id !== "0" && item.quantity > 0) {
                    itemsArray.push(item);
                }
            }
            setItems(itemsArray);
        } catch (err) {
            console.error("Error fetching items:", err);
        }
    };

    // Handle buying a product
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

            await SupplyChainContract.methods.buyItem(id, buyQuantity).send({
                from: accounts[0],
                value: totalCost,
            });

            alert("Purchase successful!");
            fetchItems(); // Refresh product list after purchase
        } catch (err) {
            console.error("Error buying item:", err);
            alert("Failed to buy product.");
        }
    };

    // Handle removing a product
    const handleRemove = async (id) => {
        try {
            await SupplyChainContract.methods.removeItem(id).send({ from: account });
            alert("Product removed successfully!");
            fetchItems(); // Refresh the product list after removal
        } catch (err) {
            console.error("Error removing item:", err);
            alert("Failed to remove product.");
        }
    };

    // Fetch account and items on component mount
    useEffect(() => {
        fetchAccount();
        fetchItems();
    }, []);

    // Filter items based on role and criteria
    const filteredItems = items.filter((item) => {
        if (filterMyProducts && item.seller.toLowerCase() !== account.toLowerCase()) {
            return false;
        }
        if (searchSeller && item.seller.toLowerCase() !== searchSeller.toLowerCase()) {
            return false;
        }  
        if (searchProduct && !item.name.toLowerCase().includes(searchProduct.toLowerCase())){
            return false;
        }
        return true;
    });


    return (
        <div className="product-page">
            <h1 className="product-title">Products</h1>
            <div className="filter-container">
                {role === "Seller" && (
                    <label>
                        <input
                            type="checkbox"
                            checked={filterMyProducts}
                            onChange={() => setFilterMyProducts(!filterMyProducts)}
                        />
                        Show My Products Only
                    </label>
                )}
            </div>
            <div>
                <label>
                    Filter by Seller Address:
                    <input
                        type="text"
                        value={searchSeller}
                        onChange={(e) => setSearchSeller(e.target.value)}
                        placeholder="Enter seller address"
                    />
                </label>
            </div>
            <div className="filter-container">
                <label>
                    Filter by Product Name:
                    <input
                        type="text"
                        value={searchProduct}
                        onChange={(e) => setProduct(e.target.value)}
                        placeholder="Enter product name"
                    />
                </label>
            </div>
            {role === "Seller" && (
                <Link to="/add-product">
                    <button className="add-product-button">Add Product</button>
                </Link>
            )}
            <div className="product-grid">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => {
                        const imageIndex = item.name.lastIndexOf("https://");
                        const productName =
                            imageIndex !== -1 ? item.name.substring(0, imageIndex).trim() : item.name.trim();
                        const imageUrl =
                            imageIndex !== -1 ? item.name.substring(imageIndex).trim() : null;

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
                                    <p>
                                        <strong>Seller:</strong> {item.seller}
                                    </p>
                                    {role === "Buyer" && (
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
                                    )}
                                    {role === "Seller" && item.seller.toLowerCase() === account.toLowerCase() && (
                                        <button
                                            className="remove-button"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            Remove
                                        </button>
                                    )}
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
