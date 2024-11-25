import React, { useEffect, useState } from 'react';
import web3 from '../../web3';
import SupplyChainContract from '../../SupplyChainContract';

const Product = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const itemCount = await SupplyChainContract.methods.itemCounter().call();
            const items = [];
            for (let i = 1; i <= itemCount; i++) {
                const item = await SupplyChainContract.methods.items(i).call();
                items.push(item);
            }
            setItems(items);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    return (
        <div>           
            <h1>Products</h1>
            {items.map((item, index) => (
                <div key={index}>
                    <p>Name: {item.name}</p>
                    <p>Price: {web3.utils.fromWei(item.price, 'ether')} Ether</p>
                </div>
            ))}
        </div>
    );
};

export default Product;
