'use client'

import React, { useState } from 'react';
import Sidenavbar from './Components/sidenavbar';
import All from './Components/All';
import Profile from './Components/Profile';
import CardGrid from './Components/CardGrid';
import Myproducts from './Components/Myproducts';
import Addproduct from './Components/Addproduct';
import Header from './Components/Header';

const Page = () => {
  const [selectedComponent, setSelectedComponent] = useState("Home");

  const products = [
    { name: "Laptop", description: "High-performance laptop", price: "75,000", image: "./images/profile.png" },
    { name: "Smartphone", description: "Latest smartphone with AI camera", price: "55,000", image: "../images/profile.png" },
    { name: "Headphones", description: "Noise-canceling headphones", price: "5,999", image: "../images/profile.png" },
    { name: "Smart Watch", description: "Fitness tracking smartwatch", price: "3,999", image: "../images/profile.png" }
  ];

  const renderComponent = () => {
    switch (selectedComponent) {
      case "All":
        return <All />;
      case "Profile":
        return <Profile />;
      case "myproducts":
        return <Myproducts />;
      case "addproducts":
        return <Addproduct />;
      default:        
        return (
          <div className="text-xl font-bold text-center mt-24">
            Welcome to Home Page
          </div>
        );
    }
  };

  return (
    <div className="h-screen w-full flex bg-gray-300">
      {/* Sidebar - Fixed on the left */}
      <div className="w-64 h-screen text-white fixed top-0 left-0 z-50 bg-gray-800">
        <Sidenavbar setSelectedComponent={setSelectedComponent} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start bg-white ml-64">
        {/* Header should be BELOW Sidebar but at the top of the content */}
        <Header />

        {/* Render Selected Component */}
        <div className="w-full mt-20">{/* Ensure no overlap */}
          {renderComponent()}
        </div>

        {/* Show CardGrid on Home Page */}
        {selectedComponent === "Home" && (
          <div className="w-full flex justify-center mt-12">
            <CardGrid products={products} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
