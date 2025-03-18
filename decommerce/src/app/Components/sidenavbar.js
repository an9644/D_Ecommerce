// "use client"; 

// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import profile from "../images/profile.png";
// import Image from "next/image";

// const Sidenavbar = ({ setSelectedComponent }) => {
//   const [walletAddress, setWalletAddress] = useState(null);
//   const [ensName, setEnsName] = useState(null);

//   useEffect(() => {
//     const restoreWalletConnection = async () => {
//       const storedWallet = localStorage.getItem("walletAddress");
//       if (storedWallet && typeof window.ethereum !== "undefined") {
//         try {
//           const provider = new ethers.BrowserProvider(window.ethereum);
//           setWalletAddress(storedWallet);

//           const storedENS = localStorage.getItem("ensName");
//           setEnsName(storedENS || null);
//         } catch (error) {
//           console.error("Error restoring wallet connection:", error);
//         }
//       }
//     };

//     restoreWalletConnection();
//   }, []);

//   const connectWallet = async () => {
//     if (typeof window.ethereum !== "undefined") {
//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const accounts = await provider.send("eth_requestAccounts", []);

//         setWalletAddress(accounts[0]);

//         const name = await provider.lookupAddress(accounts[0]);
//         setEnsName(name || null);

//         localStorage.setItem("walletAddress", accounts[0]);
//         if (name) {
//           localStorage.setItem("ensName", name);
//         }
//       } catch (error) {
//         console.error("Error connecting wallet:", error);
//       }
//     } else {
//       alert("MetaMask not found. Please install MetaMask.");
//     }
//   };

//   const disconnectWallet = () => {
//     setWalletAddress(null);
//     setEnsName(null);
//     localStorage.removeItem("walletAddress");
//     localStorage.removeItem("ensName");
//   };

//   return (
//     <div className="w-56  h-screen bg-gray-800 text-white  p-4">
//       <h2 className="text-xl font-bold mb-4">My DApp</h2>

//       <div className="bg-green-500 rounded-xl flex flex-col  items-center justify-center p-2">
//         {walletAddress ? (
//           <>
//             <Image src={profile} alt="Profile" width={70} height={70} className="rounded-full" />
//             <p className="text-white mb-2">
//               {ensName ? `Welcome,` : `Welcome: ${ensName}`}<br/>{`${walletAddress.slice(0, 10)}...`}
//             </p>
//             <button className="bg-gray-500 text-white px-3 py-1 rounded" onClick={disconnectWallet}>
//               Disconnect
//             </button>
//           </>
//         ) : (
//           <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={connectWallet}>
//             Connect Wallet
//           </button>
//         )}
//       </div>

//       {/* sidebar*/}
//       <ul className="mt-6">
//         <li className="py-2 hover:text-gray-400 cursor-pointer" onClick={() => setSelectedComponent("Home")}>
//           Home
//         </li>
//         <li className="py-2 hover:text-gray-400 cursor-pointer" onClick={() => setSelectedComponent("All")}>
//           All
//         </li>
//         <li className="py-2 hover:text-gray-400 cursor-pointer" onClick={() => setSelectedComponent("Profile")}>
//           Profile
//         </li>
//         <li className="py-2 hover:text-gray-400 cursor-pointer" onClick={() => setSelectedComponent("Settings")}>
//           Settings
//         </li>
//       </ul>
    
//     </div>
//   );
// };

// export default Sidenavbar;

"use client";

import React from "react";
import { useMoralis } from "react-moralis";
import profile from "../images/profile.png";
import Image from "next/image";

const Sidenavbar = ({ setSelectedComponent }) => {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();

  return (
    <div className="w-56 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">My DApp</h2>

      <div className="bg-green-500 rounded-xl flex flex-col items-center justify-center p-2">
        {isAuthenticated ? (
          <>
            <Image src={profile} alt="Profile" width={70} height={70} className="rounded-full" />
            <p className="text-white mb-2">
              Welcome, <br />
              {user.get("ethAddress").slice(0, 10)}...
            </p>
            <button className="bg-gray-500 text-white px-3 py-1 rounded" onClick={logout}>
              Disconnect
            </button>
          </>
        ) : (
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => authenticate()}>
            Connect Wallet
          </button>
        )}
      </div>

      {/* Sidebar */}
      <ul className="mt-6">
        <li className="py-2 hover:text-gray-400 cursor-pointer" onClick={() => setSelectedComponent("Home")}>
          Home
        </li>
        <li className="py-2 hover:text-gray-400 cursor-pointer" onClick={() => setSelectedComponent("All")}>
          All
        </li>
        <li className="py-2 hover:text-gray-400 cursor-pointer" onClick={() => setSelectedComponent("Profile")}>
          Profile
        </li>
        <li className="py-2 hover:text-gray-400 cursor-pointer" onClick={() => setSelectedComponent("Settings")}>
          Settings
        </li>
      </ul>
    </div>
  );
};

export default Sidenavbar;

