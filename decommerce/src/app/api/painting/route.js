import { NextResponse } from "next/server";
import Painting from "../../../backend/models/Painting.js";
import { contract, wallet } from "../../../backend/lib/blockchainServer.js"; 
import { ethers } from "ethers";
import connectToDatabase from '../../../backend/lib/mongodb.js';

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { title, image, price, description, owner } = body; 

    if (!title || !image || !price || !description || !owner) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Convert price to Wei for blockchain transaction
    const priceInWei = ethers.utils.parseUnits(price.toString(), "ether");

    // Send transaction to blockchain
    const tx = await contract.connect(wallet).createAsset(priceInWei);
    const receipt = await tx.wait();

    // Extract assetId from blockchain logs
    const assetId = receipt.events?.find(event => event.event === "AssetCreated")?.args?.assetId?.toString();

    if (!assetId) {
      return NextResponse.json({ message: "Failed to retrieve assetId from blockchain" }, { status: 500 });
    }

    // Store asset data in MongoDB
    const newPainting = new Painting({
      title,
      image,  
      price: parseFloat(price),  
      description,
      assetId,
      owner, 
    });

    await newPainting.save();

    return NextResponse.json({ message: "Asset created successfully!", painting: newPainting }, { status: 201 });
  } catch (error) {
    console.error("Error adding asset:", error);
    return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
  } 
}

// ✅ Keep only ONE GET function
export async function GET() {
  try {
    await connectToDatabase();
    const paintings = await Painting.find({}); // Fetch all paintings from DB
    return NextResponse.json(paintings, { status: 200 });
  } catch (error) {
    console.error("Error fetching paintings:", error);
    return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
  }
}
