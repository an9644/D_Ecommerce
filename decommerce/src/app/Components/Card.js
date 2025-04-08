"use client";

import React from "react";
import Image from "next/image";
import { getProviderAndContract } from "./Blockchain";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";

const Card = ({ product, hideBuyButton, hideresell, setResellProduct, setSelectedComponent }) => {
  if (!product) return null;
  const router = useRouter();

  const walletAddress = localStorage.getItem("walletAddress");

  console.log("Trying to buy asset ID:", product.assetId);

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

      // Fetch the user's token balance (assuming your contract has a `balanceOf` function)
      const tokenBalance = await contract.balanceOf(walletAddress);
      const price = ethers.BigNumber.from(String(product.price)); // Convert the price to BigNumber

      if (tokenBalance.lt(price)) {
        alert("Insufficient tokens to buy this asset!");
        return;
      }

      // Proceed with the transaction: Transfer the price from user to the asset owner
      const tx = await contract.transfer(product.owner, price); // Transfer tokens
      const receipt = await tx.wait();
      console.log("Transaction successful:", receipt);

      // After the transaction, update the owner in the database and on the blockchain
      alert("Purchase successful!");

      await fetch("/api/painting", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assetId: product.assetId,
          newOwner: walletAddress,
        }),
      });
      await fetch("/api/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assetId: product.assetId,
          from: walletAddress,
          to: product.owner,
          price: parseFloat(product.price),
        }),
      });
    } catch (error) {
      console.error("Error during purchase:", error);
      alert("Transaction failed!");
    }
  };
  const handleResell = () => {
      localStorage.setItem('resellItem', JSON.stringify(product)); 
    
        
  };
  
  return (
    <div className="bg-green-400 w-56 rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
      <Image
        src={product.image}
        alt={product.title}
        width={250}
        height={250}
        unoptimized
        className="rounded-lg border-2 border-gray-200 mx-auto"
      />
      <h2 className="text-lg font-semibold mt-2 text-purple-600 text-center">
        {product.title}
      </h2>
      <p className="text-gray-600 text-sm mt-1 text-center">
        {product.description}
      </p>
      <p className="text-gray-800 font-bold mt-2 text-xl text-center">
        {product.price} AC
      </p>

      {/* Hide Buy Now button if hideBuyButton is true */}
      <div className="w-full mt-4 text-center">
        {!hideBuyButton ? (
          <div className="flex flex-col gap-4 items-center">
            <button
              onClick={handleBuy}
              className="bg-purple-600 text-white font-bold text-sm px-4 py-2 rounded hover:bg-purple-700 transition duration-300 w-full"
            >
              Buy Now
            </button>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <a
              href={`https://sepolia.etherscan.io/address/${product.owner}`}
              className="bg-purple-700 text-white px-4 py-2 rounded w-full"
              >
                Etherscan
              </a>
  
              {/* Hide Resell Button if hideresell is true */}
              {!hideresell && (
              <button onClick={handleResell} className="bg-green-800 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300 w-full">
                Resell
              </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default Card;