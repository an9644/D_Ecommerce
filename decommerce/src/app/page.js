"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidenavbar from "./Components/sidenavbar";
import Profile from "./Components/Profile";
import CardGrid from "./Components/CardGrid";
import Myproducts from "./Components/Myproducts";
import AddProduct from "./Components/Addproduct";
import Header from "./Components/Header";

const Page = () => {
  const router = useRouter();
  const [selectedComponent, setSelectedComponent] = useState("Home");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resellProduct, setResellProduct] = useState(null); // Track selected product for resell

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/painting");
        if (!response.ok) {
          console.log("error in Fetching Product");
        }

        const data = await response.json();
        console.log("Products received:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleNavigation = (component) => {
    setSelectedComponent(component);
    router.push(`/?page=${component}`, undefined, { shallow: true });
  };

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
          <div className="text-center mt-10 text-red-500">No product selected for resell.</div>
        );
      default:
        return null;
    }
  };

  const handleResellClick = (product) => {
    setResellProduct(product);  // Set product for resell
    setSelectedComponent("resell");  // Change to resell component
  };

  return (
    <div className="h-screen w-full flex bg-gray-300">
      {/* Sidebar - Fixed on the left */}
      <div className="w-64 h-screen text-white fixed top-0 left-0 z-50 bg-gray-800">
        <Sidenavbar setSelectedComponent={handleNavigation} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start bg-white ml-64">
        {/* Header should be BELOW Sidebar but at the top of the content */}
        <Header />

        {/* Render Selected Component */}
        <div className="w-full mt-20">
          {renderComponent()}
        </div>

        {/* Show CardGrid on Home Page */}
        {selectedComponent === "Home" && (
          <div className="w-full flex justify-center mt-12">
            {loading ? (
              <p className="text-gray-600">Loading products...</p>
            ) : products.length > 0 ? (
              <CardGrid
                products={products.filter((p) => p.sold === false)}
                onResellClick={handleResellClick} // This passes the function
              />
            ) : (
              <p className="text-gray-600">No products available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
