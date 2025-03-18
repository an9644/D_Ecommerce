'use client'

import React, { useState } from 'react';
import Sidenavbar from './Components/sidenavbar';
import All from './Components/All';
import Profile from './Components/Profile';
import Setting from './Components/Setting';
import CardGrid from './Components/CardGrid';

const Page = () => {
  const [selectedComponent, setSelectedComponent] = useState("Home");

  const products = [
    { name: "Laptop", description: "High-performance laptop", price: "75,000", image: "/images/laptop.jpg" },
    { name: "Smartphone", description: "Latest smartphone with AI camera", price: "55,000", image: "/images/phone.jpg" },
    { name: "Headphones", description: "Noise-canceling headphones", price: "5,999", image: "/images/headphones.jpg" },
    { name: "Smart Watch", description: "Fitness tracking smartwatch", price: "3,999", image: "/images/watch.jpg" }
  ];

  const renderComponent = () => {
    switch (selectedComponent) {
      case "All":
        return <All />;
      case "Profile":
        return <Profile />;
      case "Settings":
        return <Setting />;
      default:
        return <div className="text-xl font-bold text-center">Welcome to Home Page</div>;
    }
  };

  return (
    <div className="h-screen w-full flex bg-gray-300"> 
    <div className="w-64 h-screen  text-white fixed ">
      {/* Sidebar */}
      <Sidenavbar setSelectedComponent={setSelectedComponent} />
        </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col  items-center justify-start p-6 bg-white">
        {renderComponent()}
        
        {selectedComponent === "Home" && (
          <div className="w-full flex justify-center  mt-12">
            <CardGrid products={products} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
