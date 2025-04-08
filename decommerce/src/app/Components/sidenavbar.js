'use client';

import React, { useState, useEffect } from "react";
import profile from "../images/profile.png";
import Image from "next/image";
import { FaBox } from "react-icons/fa";
import { Web3Provider } from "@ethersproject/providers";
import { getProviderAndContract } from './Blockchain.js';

const Sidenavbar = ({ setSelectedComponent }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [ensName, setEnsName] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const restoreWalletConnection = async () => {
      const storedWallet = localStorage.getItem("walletAddress");
      if (storedWallet && typeof window.ethereum !== "undefined") {
        try {
          const provider = new Web3Provider(window.ethereum);
          setWalletAddress(storedWallet);

          const storedENS = localStorage.getItem("ensName");
          setEnsName(storedENS || null);
        } catch (error) {
          console.log("Error restoring wallet connection:", error);
        }
      }
      const walletAddress = localStorage.getItem("walletAddress");
      if (!walletAddress) return;
      console.log(walletAddress);
      setUserData(walletAddress);
    };

    restoreWalletConnection();
  }, []);

  const connectWallet = async () => {
    const data = await getProviderAndContract();
    if (data) {
      setWalletAddress(data.account);
      setEnsName(null);
      localStorage.setItem("walletAddress", data.account);
    } else {
      alert("❌ Failed to connect. Please check MetaMask.");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setEnsName(null);
    localStorage.removeItem("walletAddress"); // Optionally remove wallet address from localStorage
  };

  const goToHomePage = () => {
    setSelectedComponent("Home"); 
  };

  return (
    <div className="w-56 h-screen bg-gray-800 text-white p-4">
      <div className="bg-green-500 rounded-xl flex flex-col items-center mt-36 justify-center p-2">
        {walletAddress ? (
          <>
            <Image src={profile} alt="Profile" width={70} height={70} className="rounded-full" unoptimized />
            <p className="text-white mb-2">
              {userData ? `Welcome: ${userData.slice(0, 10)}` : "Loading user..."}
            </p>
            <button className="bg-gray-500 text-white px-3 py-1 rounded" onClick={disconnectWallet}>
              Disconnect
            </button>
          </>
        ) : (
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>

      {/* My DApp clickable area */}
      <h2 className="text-xl font-bold mb-4 mt-5 cursor-pointer" onClick={goToHomePage}>
        My DApp
      </h2>

      {/* Sidebar */}
      <ul className="mt-6">
        <li className="py-2 hover:text-gray-400 cursor-pointer" onClick={() => setSelectedComponent("Profile")}>
          Profile
        </li>
        <li className="py-2 hover:text-gray-400 cursor-pointer" onClick={() => setSelectedComponent("myproducts")}>
          Show My Assets <FaBox />
        </li>
        <li className="py-2 hover:text-gray-400 cursor-pointer" onClick={() => setSelectedComponent("addproducts")}>
          Sell Asset
        </li>
        <li className="py-2 hover:text-gray-400 cursor-pointer" onClick={() => setSelectedComponent("resell")}>
        Resell Asset
      </li>

      </ul>
    </div>
  );
};

export default Sidenavbar;
