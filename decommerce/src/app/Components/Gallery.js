"use client";

import React, { useState, useEffect } from "react";
import CardGrid from "./CardGrid";

const Gallery = () => {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaintings = async () => {
        try {
            console.log("Fetching paintings...");  // ✅ Log 1: Start fetching
          const response = await fetch("/api/painting", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          });
      
          if (!response.ok) {
            const errorData = await response.json(); // Read error message from API
            throw new Error(errorData.message || "Failed to fetch paintings");
          }
      
          const data = await response.json();
          console.log("Paintings received:", data);
          setPaintings(data);
           } catch (error) {
          console.error("Error fetching paintings:", error);
        } finally {
          setLoading(false);
        }
      };
      

    fetchPaintings();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Art Gallery
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading paintings...</p>
      ) : paintings.length > 0 ? (
        <CardGrid products={paintings} />
      ) : (
        <p className="text-center text-gray-600">No paintings available.</p>
      )}
    </div>
  );
};

export default Gallery;
