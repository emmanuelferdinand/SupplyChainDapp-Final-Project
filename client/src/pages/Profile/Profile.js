import React, { useState, useEffect } from 'react';
import web3 from '../../web3';

const Profile = () => {
    const [account, setAccount] = useState('');

    useEffect(() => {
        loadAccount();
    }, []);

    const loadAccount = async () => {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
    };

    return (
        <div>
            <h1>Profile</h1>
            <p>Connected Wallet Address: {account}</p>
        </div>
    );
};

export default Profile;
