import { ethers } from "ethers";
import ACToken from "../assets/ACToken.json";
import Address from "../assets/Address.json";

export const getProviderAndContract = async () => {
  if (!window.ethereum) {
    console.error("MetaMask not detected");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const signer = await provider.getSigner();
  const account = await signer.getAddress();
  const contract = new ethers.Contract(Address["TokenModule#ACToken"], ACToken.abi, signer);

  return { provider, signer, account, contract };
};
