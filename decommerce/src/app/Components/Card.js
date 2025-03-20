import React from "react";
import Image from "next/image";

const Card = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
<Image
        src={`/images/profile.png`} 
        alt={product.name}
        width={70}
        height={70}
        className="rounded-full"
      />  <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
  <p className="text-gray-500 text-sm mt-1">{product.description}</p>
  <p className="text-green-600 font-bold mt-2">₹{product.price}</p>
  
  <div className="flex justify-between mt-4">
    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
      Buy Now
    </button >
    <a 
      href={`https://etherscan.io/address/${product.contractAddress}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-gray-800 text-white px-4 p-2 h-auto rounded hover:bg-gray-900 transition duration-300"
    >
       Etherscan
    </a>
  </div>
</div>
  );
};

export default Card;
