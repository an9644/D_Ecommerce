"use client"
import React from "react";
import Card from "./Card"; 

const CardGrid = ({ products }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:grid-cols-4 p-6 max-w-6xl w-full">
        {products.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
