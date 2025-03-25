import { ethers } from "ethers";
import Address from "../../app/assets/Address.json";
import ACToken from "../../app/assets/ACToken.json";
const { JsonRpcProvider } = require("@ethersproject/providers");

import dotenv from "dotenv";
dotenv.config();

const CONTRACT_ADDRESS = Address["TokenModule#ACToken"];
const PRIVATE_KEY = process.env.PRIVATE_KEY;
console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY ? "Loaded" : "Not Found");

// const PROVIDER_URL = `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_URL}`;

// if (!PROVIDER_URL) {
//     console.log("PROVIDER_URL null! Check your .env file.");
//   }
  
const provider = new JsonRpcProvider("http://127.0.0.1:8545");
// const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL); // Use this for Sepolia

const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ACToken.abi, wallet);

export  { provider, wallet, contract };
