import React from "react";
import Image from "next/image";
import { getProviderAndContract } from "./Blockchain";
import { ethers } from "ethers";

const Card = ({ product, hideBuyButton }) => {
  if (!product) return null; 

  const walletAddress = typeof window !== "undefined" ? localStorage.getItem("walletAddress") : null;

  const handleBuy = async () => {
    if (!walletAddress) {
      alert("Wallet not connected!");
      return;
    }

    if (!product.assetId || !product.price) {  
      alert("Invalid product data!");
      return;
    }

    if (walletAddress === product.owner) {
      alert("You cannot buy your own asset!");
      return;
    }

    try {
      const { contract, account } = await getProviderAndContract();
      if (!contract) {
        alert("Failed to connect to contract");
        return;
      }

      const price = ethers.BigNumber.from(String(product.price)); 
      const balance = await contract.getBalance(account);

      if (ethers.BigNumber.from(balance).lt(price)) {
        alert("Insufficient AC tokens to buy this asset!");
        return;
      }

      const tx = await contract.buyAsset(product.assetId); 
      await tx.wait();
      alert("Purchase successful!");
    } catch (error) {
      console.error("Error during purchase:", error);
      alert("Transaction failed!");
    }
  };

  return (
    <div className="bg-green-400 w-56 rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
      <Image
        src={product.image}
        alt={product.title}
        width={250}
        height={250}
        className="rounded-lg border-2 border-gray-200 mx-auto"
      />
      <h2 className="text-lg font-semibold mt-2 text-purple-600 text-center">{product.title}</h2>
      <p className="text-gray-600 text-sm mt-1 text-center">{product.description}</p>
      <p className="text-gray-800 font-bold mt-2 text-xl text-center">{product.price} AC</p>

      {/* Hide Buy Now button if hideBuyButton is true */}
      {!hideBuyButton && (
      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={handleBuy}
          className="bg-purple-600 font-bold text-sm text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
        >
          Buy Now
        </button>
      </div>
    )}
    </div>
  );
};

export default Card;

