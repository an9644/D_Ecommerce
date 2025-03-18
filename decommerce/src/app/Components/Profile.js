// import React, { useState, useEffect } from "react";
// import Card from "../Components/Card";
// import { ethers } from "ethers";

// const Profile = ({ walletAddress }) => {
//   const [myProducts, setMyProducts] = useState([]);
//   const [purchasedProducts, setPurchasedProducts] = useState([]);
//   const [showMyProducts, setShowMyProducts] = useState(true);
//   const [address, setAddress] = useState(false);

//   useEffect(() => {
//     // Fetch user products & purchased products from backend
//     const fetchProducts = async () => {
//       const storedaddres = (localStorage.getItem("walletAddress")) || [];
//       const storedProducts = JSON.parse(localStorage.getItem("myProducts")) || [];
//       const purchased = JSON.parse(localStorage.getItem("purchasedProducts")) || [];
      
//       setMyProducts(storedProducts);
//       setPurchasedProducts(purchased);
//       setAddress(storedaddres);
//     };

//     fetchProducts();
//   }, []);

//   const toggleProducts = () => {
//     setShowMyProducts(!showMyProducts);
//   };

//   return (
//     <div className="flex flex-col items-center justify-start p-6 bg-white w-full">
//       {/* User Profile Info */}
//       <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
//         <h2 className="text-2xl font-bold mb-2">My Profile</h2>
//         <p className="text-gray-700">Wallet: {address ? `${address}` : "Not Connected"}</p>
//       </div>

//       {/* Toggle Button */}
//       <button onClick={toggleProducts} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md">
//         {showMyProducts ? "Show Purchased Products" : "Show My Products"}
//       </button>

//       {/* Product List */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full">
//         {(showMyProducts ? myProducts : purchasedProducts).map((product, index) => (
//           <div key={index} className="bg-white shadow-md p-4 rounded-lg">
//             <Card product={product} />
//             <a 
//               href={`https://etherscan.io/address/${walletAddress}`} 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="block text-center mt-3 px-4 py-2 bg-gray-800 text-white rounded-md"
//             >
//               View on Etherscan
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React, { useState } from "react";

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
    image: "https://via.placeholder.com/150",
    contractAddress: "0x1234...abcd",
  },
];

const userProducts = [
  {
    name: "My Product 1",
    description: "This is a product added by the user.",
    price: 200,
    image: "https://via.placeholder.com/150",
    contractAddress: "0x5678...efgh",
  },
];

const ProductCard = ({ product }) => (
  <div className="bg-gray-50 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-40 object-cover rounded-md"
    />
    <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
    <p className="text-gray-500 text-sm mt-1">{product.description}</p>
    <p className="text-green-600 font-bold mt-2">₹{product.price}</p>
    <a
      href={`https://etherscan.io/address/${product.contractAddress}`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition duration-300"
    >
      View on Etherscan
    </a>
  </div>
);

const ProfilePage = () => {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {purchasedItems.map((item, index) => (
              <ProductCard key={index} product={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No purchased items yet.</p>
        )}
      </div>

      {/* My Products Section */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No products added yet.</p>
          )
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
