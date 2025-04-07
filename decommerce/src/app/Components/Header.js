"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Profile from "../images/profile.png";
import { CgMenuGridO } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import { FaCoins } from "react-icons/fa";
import Modal from "react-modal";
import { getProviderAndContract } from "../Components/Blockchain.js";
import { ethers } from "ethers";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    borderRadius: "10px",
  },
};

const Header = () => {
  const [balance, setBalance] = useState(null);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [totalDue, setTotalDue] = useState(0);

  
  const fetchBalance = async () => {
    try {
      const { account, contract } = await getProviderAndContract();
      if (!account || !contract) {
        setBalance(null); 
        return;
      }
  
      const balanceBigNumber = await contract.balanceOf(account);
      const balance = balanceBigNumber.toString();
  
      setBalance(balance);
      localStorage.setItem("mintedTokens", balance);
    } catch (error) {
      console.log("Error fetching balance:", error);
    }
  };
  
  const buyToken = async () => {
    try {
      const { contract } = await getProviderAndContract();
      const a = localStorage.getItem('walletAddress');  
      if (!a) {
        alert("Please connect to an account first!"); 
        return;
      }
  
      if (!contract) {
        alert("Smart contract not found!");
        return;
      }
  
      console.log("Wallet Address:", a);
      console.log("Total Due:", totalDue);
  
      const value = ethers.utils.parseEther(totalDue.toString()); // Fixing ETH value parsing
  
      const tx = await contract.purchaseTokens({
        value, // Send ETH with the transaction
        gasLimit: 300000 // Optional: Ensuring enough gas
      });
  
      console.log("Transaction sent:", tx.hash);
      await tx.wait();
      console.log("Transaction successful:", tx.hash);
      alert("Token Minted Successfully");
  
      setTransactionSuccess(true);
      setTransactionHash(tx.hash);
      fetchBalance();
    } catch (error) {
      console.log("Transaction error:", error);
      alert(`Transaction failed: ${error.message}`);
    }
};

  
  
  useEffect(() => {
    const checkAccount = async () => {
      const { account } = await getProviderAndContract();
      if (account) {
        setBalance(0); // Reset balance on account switch
        fetchBalance();
      } else {
        setBalance(null); // No account connected
      }
    };
  
    checkAccount();
    Modal.setAppElement(document.getElementById("__next"));
  }, []);
  

  const openModal = () => {
    setIsModalOpen(true);
    setTokenAmount(0);
    setTotalDue(0);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setTokenAmount(value);
    setTotalDue((value * 0.001).toFixed(4));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-900 shadow-lg z-50 py-3 px-6 flex justify-between items-center">
    <div className="flex items-center gap-4">
      <Image src={Profile} alt="Profile Image" width={70} height={70} className="rounded-full border-2 border-gray-300" unoptimized />
    </div>
  
    <div className="flex items-center bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-full w-80 shadow-sm">
      <IoMdSearch fontSize={20} className="text-white" />
      <input type="text" placeholder="Search Your Asset.." className="bg-transparent outline-none ml-2 w-full text-white placeholder-white" />
    </div>
  
    <div className="flex items-center gap-6">
      <div className="text-gray-300 font-semibold cursor-pointer hover:text-purple-500 transition">New Releases</div>
      <div className="text-gray-300 font-semibold cursor-pointer hover:text-purple-500 transition">Featured</div>
      
      <div 
        className="flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-blue-600 transition"
        onClick={openModal}
      >
        {balance !== null ? `${balance} AC` : "Fetching..."}
        <FaCoins fontSize={20} className="ml-2" />
      </div>
      
      <CgMenuGridO fontSize={30} className="text-gray-300 cursor-pointer hover:text-blue-500 transition" />
    </div>
  
    <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
      <h2 className="text-lg font-bold mb-4 text-gray-300">Buy AC Token</h2>
      <p className="text-gray-500 mb-4">How many tokens would you like to buy?</p>
      <input type="number" className="w-full p-2 pl-10 text-sm text-gray-500" placeholder="Enter amount" value={tokenAmount || ""} onChange={handleInputChange} />
      <p className="text-gray-500 mt-4">Total due: {totalDue} ETH</p>
  
      {!transactionSuccess ? (
        <button 
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${transactionSuccess ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={!transactionSuccess ? buyToken : null} 
          disabled={transactionSuccess}
        >
          {transactionSuccess ? "Purchased" : "Buy"}
        </button>
      ) : (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-4">
          <p>Transaction successful!</p>
          <p>Transaction hash: {transactionHash}</p>
          <a 
            href={`https://etherscan.io/tx/${transactionHash}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:text-blue-600"
          >
            View on Etherscan
          </a>
        </div>
      )}
    </Modal>
  </div>
  );
};

export default Header;
