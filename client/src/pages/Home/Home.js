import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <div className="hero-section">
                <h1>Welcome to Chain DApp</h1>
                <p>Revolutionizing supply chain management with blockchain technology.</p>
                <div className="cta-buttons">
                    <button onClick={() => window.location.href = "/product"}>View Products</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
