// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { getProviderAndContract } from "./Blockchain.js";
// import { ethers } from "ethers";

// const Resell = () => {
//   const router = useRouter();

//   const [paintingData, setPaintingData] = useState({
//     title: "",
//     price: "",
//     description: "",
//     image: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const storedProduct = localStorage.getItem("resellproduct");

//     if (storedProduct) {
//       setProduct(JSON.parse(storedProduct));
//     }
//   }, []);


//   const handleChange = (e) => {
//     setPaintingData({ ...paintingData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPaintingData((prev) => ({
//         ...prev,
//         image: reader.result,
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await fetch("/api/painting", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           assetId,
//           title: paintingData.title,
//           price: paintingData.price,
//           description: paintingData.description,
//           image: paintingData.image,
//           sold: "false",
//         }),
//       });

//       alert("Art resubmitted for selling!");
//       router.push("/"); 
//     } catch (err) {
//       console.error("Error:", err);
//       alert("Failed to resell artwork.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-blue-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sell Your Art</h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="mb-4">
//             <label htmlFor="title" className="block text-sm font-medium text-gray-700">Art Title</label>
//             <input type="text" id="title" name="title" value={paintingData.title} onChange={handleChange} required className="w-full mt-2 p-3 border border-gray-300 rounded-lg" />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (ETH)</label>
//             <input type="number" id="price" name="price" value={paintingData.price} onChange={handleChange} required className="w-full mt-2 p-3 border border-gray-300 rounded-lg" />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
//             <input type="file" id="image" accept="image/*" onChange={handleFileChange} className="w-full mt-2 p-3 border border-gray-300 rounded-lg" />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//             <textarea id="description" name="description" value={paintingData.description} onChange={handleChange} required className="w-full mt-2 p-3 border border-gray-300 rounded-lg" rows="4" />
//           </div>

//           <div className="flex justify-center">
//             <button type="submit" className="w-full mt-4 p-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700" disabled={loading}>
//               {loading ? "Uploading..." : "Add Art for Selling"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Resell;
