"use client"
import React, { useState } from "react";
import CardGrid from "../Components/CardGrid"; // Import the CardGrid component

const userProducts = [
  {
    name: "My Product 1",
    description: "This is a product added by the user.",
    price: 200,
    image: "/images/profile.png", // Ensure the image path is correct
    contractAddress: "0x5678...efgh",
  },
  {
    name: "My Product 2",
    description: "Another product added by the user.",
    price: 300,
    image: "/images/profile.png",
    contractAddress: "0x9876...ijkl",
  },
];

const MyProducts = () => {
  const [showMyProducts, setShowMyProducts] = useState(true);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">My Products</h2>
          <button
            onClick={() => setShowMyProducts(!showMyProducts)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            {showMyProducts ? "Hide My Products" : "Show My Products"}
          </button>
        </div>

        {showMyProducts && (
          userProducts.length > 0 ? (
            <CardGrid products={userProducts} /> // Use the CardGrid component
          ) : (
            <p className="text-gray-500">No products added yet.</p>
          )
        )}
      </div>
    </div>
  );
};

export default MyProducts;