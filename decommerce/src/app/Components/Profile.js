"use client"
import React ,{useState}from "react";
import CardGrid from "./CardGrid";

const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  walletAddress: "0x1234...abcd",
};

const purchasedItems = [
  {
    name: "Product 1",
    description: "This is a purchased product.",
    price: 100,
    image: "../images/profile.png",
    contractAddress: "0x1234...abcd",
  },
];
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

const Profile= () => {
  const [showMyProducts, setShowMyProducts] = useState(true);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* User Details Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Wallet Address:</span>{" "}
            {user.walletAddress}
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
      <button
            onClick={() => setShowMyProducts(!showMyProducts)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            {showMyProducts ? "Collapse" : "Recent Transaction"}
          </button>

        {showMyProducts && (
          userProducts.length > 0 ? (
            <CardGrid products={userProducts} /> 
          ) : (
            <p className="text-gray-500">No products added yet.</p>
          )
        )}
    </div>
  );
};

export default Profile;

