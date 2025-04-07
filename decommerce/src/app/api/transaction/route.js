import { NextResponse } from "next/server";
import connectToDatabase from "../../../backend/lib/mongodb.js";


export async function POST(req) {
    try {
      await connectToDatabase();
      const body = await req.json();
      const { assetId, from, to, price } = body;
  
      if (!assetId || !from || !to || !price) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
      }
  
      const newTx = new Transaction({
        assetId,
        from,
        to,
        price
      });
  
      await newTx.save();
  
      return NextResponse.json({ message: "Transaction stored", tx: newTx }, { status: 201 });
    } catch (error) {
      console.error("Transaction saving error:", error);
      return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
    }
  }