import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <div className="hero-section">
                <h1>Welcome to SupplyChain DApp</h1>
                <p>Revolutionizing supply chain management with blockchain technology.</p>
                <div className="cta-buttons">
                    <button onClick={() => window.location.href = "/product"}>View Products</button>
                    <button onClick={() => window.location.href = "/auth"}>Sign In</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
