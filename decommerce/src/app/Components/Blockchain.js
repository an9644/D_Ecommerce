import { ethers } from "ethers";
import ACToken from "../assets/ACToken.json";
import Address from "../assets/Address.json";
import {Web3Provider} from '@ethersproject/providers';

export const getProviderAndContract = async () => {
  if (typeof window === "undefined" || !window.ethereum) {
    console.log("❌ MetaMask not detected!");
    return null;
  }

  try {
    // Request MetaMask connection
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Initialize provider and signer
    const provider = new Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const account = await signer.getAddress();

    // Ensure contract address is available
    const contractAddress = Address["TokenModule#ACToken"];
    if (!contractAddress) {
      console.log("❌ Contract address is undefined!");
      return null;
    }

    // Initialize contract
    const contract = new ethers.Contract(contractAddress, ACToken.abi, signer);

    console.log("✅ Blockchain Connected:", { account, contractAddress });

    return { provider, signer, account, contract };
  } catch (error) {
    console.log("❌ Error connecting to blockchain:", error);
    return null;
  }
};
