import { NextResponse } from "next/server";
import Painting from "../../../backend/models/Painting.js";
import { contract, wallet } from "../../../backend/lib/blockchainServer.js";
import { ethers } from "ethers";
import connectToDatabase from "../../../backend/lib/mongodb.js";

// Create a new asset
export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { title, image, price, description, owner } = body;

    // Validation
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

// Fetch all paintings
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

// Update asset owner and mark it as sold
export async function PUT(req) {
  try {
    const body = await req.json();
    const { assetId, newOwner } = body;

    if (!assetId || !newOwner) {
      return NextResponse.json({ message: "Asset ID and new owner are required" }, { status: 400 });
    }

    // Update asset ownership and set 'sold' status to true
    const updatedPainting = await Painting.findOneAndUpdate(
      { assetId },
      { owner: newOwner, sold: true }, // Update owner and mark as sold
      { new: true } // Return the updated document
    );

    if (!updatedPainting) {
      return NextResponse.json({ message: "Asset not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Asset updated successfully", updatedPainting }, { status: 200 });
  } catch (err) {
    console.error("Error updating asset:", err);
    return NextResponse.json({ message: `Error: ${err.message}` }, { status: 500 });
  }
}

