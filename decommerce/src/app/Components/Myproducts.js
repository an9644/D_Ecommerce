"use client";

import React, { useEffect, useState } from "react";
import CardGrid from "./CardGrid";

const Myproducts = () => {
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    // Get the logged-in user's wallet address
    const storedWallet = localStorage.getItem("walletAddress");
    if (storedWallet) {
      setWalletAddress(storedWallet);
    }
  }, []);

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        if (!walletAddress) return; // Don't fetch until walletAddress is available

        console.log("Fetching products for owner:", walletAddress);
        const response = await fetch("/api/painting");

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch products");
        }

        const data = await response.json();
        console.log("All products:", data);

        // Filter products where the owner matches the logged-in user
        const userProducts = data.filter((product) => product.owner === walletAddress);
        console.log("Filtered products:", userProducts);
        setMyProducts(userProducts);
      } catch (error) {
        console.error("Error fetching user's products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, [walletAddress]); // Re-run when walletAddress is set

  return (
    <div className="w-full mt-12 text-center">
      <h2 className="text-2xl font-bold mb-4">My Products</h2>
      {loading ? (
        <p className="text-gray-600">Loading your products...</p>
      ) : myProducts.length > 0 ? (
      <CardGrid products={myProducts} hideBuyButton={true} />
      ) : (
        <p className="text-gray-600">You haven't added any products yet.</p>
      )}
    </div>
  );
};

export default Myproducts;
