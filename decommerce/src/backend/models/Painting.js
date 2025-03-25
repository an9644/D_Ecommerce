import mongoose from "mongoose";

const PaintingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  assetId: { type: Number, required: true },
  owner: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Painting || mongoose.model("Painting", PaintingSchema);
