import React from "react";
import CardGrid from "./CardGrid";

const All = () => {
  const products = [
    { name: "Laptop", description: "High-performance laptop", price: "75,000", image: "/images/laptop.jpg" },
    { name: "Smartphone", description: "Latest smartphone with AI camera", price: "55,000", image: "/images/phone.jpg" },
    { name: "Headphones", description: "Noise-canceling headphones", price: "5,999", image: "/images/headphones.jpg" },
    { name: "Smart Watch", description: "Fitness tracking smartwatch", price: "3,999", image: "/images/watch.jpg" }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-start p-6 bg-white w-full">
      <h2 className="text-2xl font-bold mb-6">All Products</h2>
      <div className="w-full flex justify-center">
        <CardGrid products={products} />
      </div>
    </div>
  );
};

export default All;
