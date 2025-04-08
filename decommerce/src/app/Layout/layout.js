"use client";

import React from "react";
import Sidenavbar from "../Components/sidenavbar";
import Header from "../Components/Header";
import Profile from "../Components/Profile";
import Myproducts from "../Components/Myproducts";
import AddProduct from "../Components/Addproduct";
import CardGrid from "../Components/CardGrid";

const Layout = ({
  selectedComponent,
  setSelectedComponent,
  products = [],
  loading = false,
  resellProduct,
  handleResellClick,
  children
}) => {
  const renderComponent = () => {
    switch (selectedComponent) {
      case "Profile":
        return <Profile />;
      case "myproducts":
        return <Myproducts />;
      case "addproducts":
        return <AddProduct />;
      case "resell":
        return resellProduct ? (
          <AddProduct product={resellProduct} resellMode={true} />
        ) : (
          <div className="text-center mt-10 text-red-500">
            No product selected for resell.
          </div>
        );
      case "Home":
        return (
          <div className="w-full flex justify-center mt-12">
            {loading ? (
              <p className="text-gray-600">Loading products...</p>
            ) : products.length > 0 ? (
              <CardGrid
                products={products.filter((p) => p.sold === "false")}
                onResellClick={handleResellClick}
              />
            ) : (
              <p className="text-gray-600">No products available.</p>
            )}
          </div>
        );
      default:
        return children ? children : <div className="text-center mt-10 text-red-500">Unknown Component: {selectedComponent}</div>
    }
  };

  return (
    <div className="h-screen w-full flex bg-gray-300">
      {/* Sidebar */}
      <div className="w-64 h-screen text-white fixed top-0 left-0 z-50 bg-gray-800">
        <Sidenavbar setSelectedComponent={setSelectedComponent} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start bg-white ml-64">
        <Header />
        <div className="w-full mt-20">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default Layout;
