"use client"
import React ,{useEffect, useState}from "react";
import CardGrid from "./CardGrid";

const purchasedItems = [
  {
    name: "Product 1",
    description: "This is a purchased product.",
    price: 100,
    image: "/images/profile.png",
    contractAddress: "0x1234...abcd",
  },
];

const Profile= () => {
  const [address, setAddress] = useState(true);

  useEffect(()=>{
    const userAddress = localStorage.getItem("walletAddress");
    setAddress(userAddress)
  })

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* User Details Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Name:</span>
          </p>
          <p>
            <span className="font-semibold">Email:</span> 
          </p>
          <p>
            <span className="font-semibold">Wallet Address:</span> {address}
          </p>
        </div>
      </div>

      {/* Purchased Items Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Purchased Items</h2>
        {purchasedItems.length > 0 ? (
          <CardGrid products={purchasedItems} />
        ) : (
          <p className="text-gray-500">No purchased items yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

