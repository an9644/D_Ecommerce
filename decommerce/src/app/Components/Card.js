"use client";

import React from "react";
import Image from "next/image";

const Card = ({ product }) => {
  console.log("Rendering Card:", product);  
  return (
    <div className="bg-green-400 w-56 rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
  <Image
    src={product.image}
    alt={product.title}
    width={250}
    height={250}
    className="rounded-lg border-2 border-gray-200 mx-auto"
  />
  <h2 className="text-lg font-semibold mt-2 text-purple-600 text-center">{product.title}</h2>
  <p className="text-gray-600 text-sm mt-1 text-center">{product.description}</p>
  <p className="text-gray-800 font-bold mt-2 text-xl text-center">{product.price} AC</p>

  <div className="flex justify-center ml-3 mt-4 gap-4">
    <button className="bg-purple-600 font-bold text-sm text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300">
      Buy Now
    </button>
    <a
      href={`https://etherscan.io/address/${product.owner}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-pink-600 text-white font-bold px-4 py-2 rounded hover:bg-gray-300 transition duration-300"
    >
      Etherscan
    </a>
  </div>
</div>
  );
};

export default Card;
