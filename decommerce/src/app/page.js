"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidenavbar from "./Components/sidenavbar";
import Profile from "./Components/Profile";
import CardGrid from "./Components/CardGrid";
import Myproducts from "./Components/Myproducts";
import Addproduct from "./Components/Addproduct";
import Header from "./Components/Header";

const Page = () => {
  const router = useRouter();
  const [selectedComponent, setSelectedComponent] = useState("Home");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get("page");
    if (page) setSelectedComponent(page);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const response = await fetch("/api/painting");

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch products");
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
        <Sidenavbar setSelectedComponent={handleNavigation} />
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
            {loading ? (
              <p className="text-gray-600">Loading products...</p>
            ) : products.length > 0 ? (
              <CardGrid products={products} />
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
