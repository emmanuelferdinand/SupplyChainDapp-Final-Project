import React, { useState } from "react";
import SupplyChainContract from "../../SupplyChainContract";
import web3 from "../../web3";
import "./Auth.css";

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const toggleAuthMode = () => {
        setIsSignUp(!isSignUp);
        setError("");
        setEmail("");
        setPassword("");
        setRole("");
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!role) {
            setError("Please select a role.");
            return;
        }
        setLoading(true);

        try {
            const accounts = await web3.eth.getAccounts();
            await SupplyChainContract.methods.signUp(role).send({ from: accounts[0] });
            alert(`Sign-up successful! Registered as ${role}.`);
        } catch (err) {
            console.error("Sign-up error:", err);
            setError("Failed to sign up. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const accounts = await web3.eth.getAccounts();
            const userRole = await SupplyChainContract.methods.roles(accounts[0]).call();
            if (!userRole) {
                setError("No account found. Please sign up first.");
            } else {
                alert(`Sign-in successful! Logged in as ${userRole}.`);
            }
        } catch (err) {
            console.error("Sign-in error:", err);
            setError("Failed to sign in. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
                <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {isSignUp && (
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="seller">Seller</option>
                            <option value="buyer">Buyer</option>
                        </select>
                    )}
                    <button type="submit" disabled={loading}>
                        {loading ? "Processing..." : isSignUp ? "Register" : "Login"}
                    </button>
                </form>
                {error && <p className="error">{error}</p>}
                <p className="toggle-link" onClick={toggleAuthMode}>
                    {isSignUp
                        ? "Already have an account? Sign In"
                        : "Don't have an account? Sign Up"}
                </p>
            </div>
        </div>
    );
};

export default Auth;
