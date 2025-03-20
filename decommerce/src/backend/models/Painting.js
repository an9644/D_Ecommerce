import mongoose from "mongoose";

const PaintingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Painting || mongoose.model("Painting", PaintingSchema);
