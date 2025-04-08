"use client";

import React from "react";
import Card from "./Card";

const CardGrid = ({ products, hideBuyButton, hideresell, setSelectedComponent, setResellProduct }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 space-x-12 lg:grid-cols-4 p-6 max-w-6xl w-full">
        {products.map((product, index) => (
          <Card
          key={index}
          product={product}
          hideBuyButton={hideBuyButton}
          hideresell={hideresell}
          setResellProduct={setResellProduct ? (product) => setResellProduct(product) : undefined}
          setSelectedComponent={setSelectedComponent}
        />       
        
        ))}
      </div>
    </div>
  );
};

export default CardGrid;