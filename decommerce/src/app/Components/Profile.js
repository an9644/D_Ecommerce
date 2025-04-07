'use client'

import React, { useEffect, useState } from "react";
import CardGrid from "./CardGrid";
import { ethers } from "ethers"; // Import ethers.js to interact with Ethereum
import {getProviderAndContract} from './Blockchain.js'



const Profile = () => {
  const [address, setAddress] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [products, setProducts] = useState('');
  const [loading,setLoading]=useState(false)

 
  const connectWallet = async () => {
    const blockchain = await getProviderAndContract();
    if (!blockchain) return;
  
    const { account } = blockchain;
    setAddress(account);
    localStorage.setItem("walletAddress", account);
  
    fetchTokenBalance(account);
    fetchTransactionHistory(account);
  };
  
  

  useEffect(() => {
    const userAddress = localStorage.getItem("walletAddress");
    if (userAddress) {
      setAddress(userAddress);
      fetchTokenBalance(userAddress);
      fetchTransactionHistory(userAddress);
    } else {
      connectWallet();
    }
  }, []);
  
  

  const fetchTokenBalance = async (userAddress) => {
    try {
      const blockchain = await getProviderAndContract();
      if (!blockchain) return;
  
      const { contract } = blockchain;
  
      const balance = await contract.balanceOf(userAddress);
      setTokenBalance(ethers.utils.formatUnits(balance, 18));
    } catch (error) {
      console.error("Error fetching token balance:", error);
    }
  };
  
  
  

  const fetchTransactionHistory = (userAddress) => {
  
    // Dummy data for now
    const history = [
      {
        assetId: 1,
        assetName: "Product 1",
        transactionType: "Bought",
        price: 100,
        timestamp: "2025-04-06 12:00",
      },
    ];
    setTransactionHistory(history);
  };

  useEffect(() => {
    const handleProduct = async () => {
      try {
        const res = await fetch('/api/painting');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          console.error('Error fetching products');
        }
      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        setLoading(false);
      }
    };
  
    handleProduct(); // ✅ Call it here, outside the function definition
  }, []);
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* User Details Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="space-y-2">
          <p><span className="font-semibold">Wallet Address:</span> {address}</p>
          <p><span className="font-semibold">Token Balance:</span> {tokenBalance} ACT</p>
        </div>
      </div>

      {/* Purchased Items Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Purchased Items</h1>
      <div className="w-full flex justify-center mt-5">
            {loading ? (
              <p className="text-gray-600">Loading products...</p>
            ) : products.length > 0 ? (
            <CardGrid products={products.filter(p => p.sold === "true" && p.owner === address)} />
            ) : (
              <p className="text-gray-600">No products available.</p>
            )}
          </div>
      </div>

      {/* Transaction History Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Transaction History</h2>
        {transactionHistory.length > 0 ? (
          <ul>
            {transactionHistory.map((txn, index) => (
              <li key={index}>
                {txn.transactionType} - {txn.assetName} for {txn.price} ACT
                <br />
                <small>{txn.timestamp}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No transactions yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
