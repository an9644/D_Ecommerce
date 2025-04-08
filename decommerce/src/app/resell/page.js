"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../Components/Layout";

const UpdatePage = () => {
  const [paintingData, setPaintingData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedItem = localStorage.getItem("resellItem");

      if (storedItem) {
        try {
          const data = JSON.parse(storedItem);
          console.log("Resell Item Data:", data);
          setPaintingData({
            _id: data._id,
            title: data.title,
            price: data.price.toString(),
            description: data.description,
          });
        } catch (error) {
          console.error("Error parsing resell item:", error);
          alert("Error parsing resell item from localStorage.");
          setPaintingData(null);
        }
      } else {
        setPaintingData(null);
      }
    }
  }, []);
  console.log(storedItem);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaintingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/resell", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paintingData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update");
      }

      alert("Artwork updated and marked as resell!");
      localStorage.removeItem("resellItem");
      router.push("/?page=myproducts");
    } catch (error) {
      console.error("Update error:", error.message);
      alert("Something went wrong while updating.");
    }
  };

  if (!paintingData) {
    return (
      <Layout setSelectedComponent={() => {}}>
        <div className="flex justify-center items-center min-h-screen bg-white">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Resell Your Art
            </h2>
            <p className="text-center text-gray-700">No resell item found!</p>
          </div>
        </div>
      </Layout>
    );
  }

  // if (!paintingData._id) {
  //   return (
  //     <Layout setSelectedComponent={() => {}}>
  //       <div className="flex justify-center items-center min-h-screen bg-white">
  //         <div className="bg-white p-8 rounded-lg shadow-lg w-96">
  //           <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
  //             Resell Your Art
  //           </h2>
  //           <p className="text-center text-gray-700">No resell item found!</p>
  //         </div>
  //       </div>
  //     </Layout>
  //   );
  // }

  return (
    <Layout setSelectedComponent={() => {}}>
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Resell Your Art</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={paintingData.title}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price (ETH)
              </label>
              <input
                type="number"
                name="price"
                value={paintingData.price}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={paintingData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full mt-4 p-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Resell Art
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdatePage;
