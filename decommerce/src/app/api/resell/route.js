import { NextResponse } from "next/server";
import connectToDatabase from "../../../backend/lib/mongodb.js";
import Painting from "../../../backend/models/Painting.js";

// PUT /api/resell
export async function PUT(req) {
  try {
    await connectToDatabase();

    const { _id, title, price, description } = await req.json();

    if (!_id || !title || !price || !description) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Update only the allowed fields and reset sold to false
    const updatedPainting = await Painting.findByIdAndUpdate(
      _id,
      {
        title,
        price: parseFloat(price),
        description,
        sold: false, // reset sold to false
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPainting) {
      return NextResponse.json({ message: "Painting not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Painting updated successfully", painting: updatedPainting },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating painting:", error);
    return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
  }
}
