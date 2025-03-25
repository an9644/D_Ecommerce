"use client";  

import React, { useState,useEffect } from "react";
import { getProviderAndContract } from "./Blockchain.js"; 
import { ethers } from "ethers"; 
const { parseEther } = ethers.utils;
import dotenv from 'dotenv'

dotenv.config();


const AddProduct = () => {
  const [paintingData, setPaintingData] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaintingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload image to IPFS using Pinta
      const uploadToPinata = async () => {
        const apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
        const secretKey = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;
        
        if (!apiKey || !secretKey) {
          console.log("Pinata API keys are missing! Check your .env.local file.");
          alert("Pinata API keys are missing. Please check your configuration.");
          return;
        }
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          pinata_api_key: apiKey,
          pinata_secret_api_key: secretKey,
          "Accept": "application/json",
        },
        body: formData,
      });
  
      const result = await response.json();

      if (!result.IpfsHash) {
        throw new Error("Invalid IPFS response");
    }

      console.log("Uploaded to Pinata:", result);
      return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
    } catch (error) {
      console.log("Error uploading to Pinata:", error);
      alert("Failed to upload image to IPFS.");
      return null;
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1️⃣ Get the owner's wallet address from local storage
    const owner = localStorage.getItem("walletAddress");
    if (!owner) {
      alert("Wallet address not found! Please connect your wallet.");
      setLoading(false);
      return;
    }

    // 2️⃣ Upload image to IPFS
    const imageUrl = await uploadToPinata();
    if (!imageUrl) {
      setLoading(false);
      return;
    }

    try {
      // 3️⃣ Connect to Blockchain
      const { provider, contract } = await getProviderAndContract();
      if (!contract) {
        alert("Failed to connect to blockchain.");
        setLoading(false);
        return;
      }

      // 4️⃣ Get Gas Price (FIXED)
      const gasPrice = await provider.getGasPrice();
      console.log("Gas Price:", gasPrice.toString());
      
     // 5️⃣ Send transaction with adjusted gas price
      const priceInWei = parseEther(paintingData.price);
      const tx = await contract.createAsset(priceInWei, { gasLimit: 500000 });

      console.log("Transaction sent. Waiting for confirmation...");
      const receipt = await tx.wait();

      console.log("Transaction Logs:", receipt.logs); // Debugging

      if (!receipt.logs.length) {
        throw new Error("Transaction receipt does not contain logs.");
      }

      // 5️⃣ Extract assetId from event logs
      const contractAddress = contract.address;
      const event = receipt.logs.find(log => log.address.toLowerCase() === contractAddress.toLowerCase());

      if (!event) {
        throw new Error("Event log not found!");
      }

      const parsedLog = contract.interface.parseLog(event);
      const assetId = parsedLog.args.assetId.toString();

      console.log("Extracted Asset ID:", assetId);
      const owner = localStorage.getItem("walletAddress");

      // 6️⃣ Store painting details in MongoDB
      const postData = {
        title: paintingData.title,
        price: parseFloat(paintingData.price),
        image: imageUrl,
        description: paintingData.description,
        assetId,
        owner:owner,
      };

      const response = await fetch("/api/painting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      alert("Art Added for Selling!");

    } catch (error) {
      console.log("Error:", error);
      alert("Something went wrong while submitting.");
    } finally {
      setLoading(false);
    }
};

  
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sell Your Art</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Art Title Input */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Art Title</label>
            <input type="text" id="title" name="title" value={paintingData.title} onChange={handleChange} required className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          {/* Price Input */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (ETH)</label>
            <input type="number" id="price" name="price" value={paintingData.price} onChange={handleChange} required className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          {/* Image Upload Input */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input type="file" id="image" accept="image/*" onChange={handleFileChange} required className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          {/* Description Textarea */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" name="description" value={paintingData.description} onChange={handleChange} required className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" rows="4" />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button type="submit" className="w-full mt-4 p-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" disabled={loading}>
              {loading ? "Uploading..." : "Add Art for Selling"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
