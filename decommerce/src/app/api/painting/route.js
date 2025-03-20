import connectToDatabase from "../../lib/mongodb";
import Painting from "../../models/Painting";
import Cors from "cors";

// Initialize middleware
const cors = Cors({
    origin: "*", // Change this to your frontend domain in production
    methods: ["GET", "POST"],
});

// Run CORS before handling request
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export default async function handler(req, res) {
    // ✅ Run CORS middleware before handling requests
    await runMiddleware(req, res, cors);

    // ✅ Connect to MongoDB
    await connectToDatabase();

    if (req.method === "POST") {
        try {
            const { title, imageUrl, price, description } = req.body;
            const newPainting = new Painting({ title, imageUrl, price, description });
            await newPainting.save();
            return res.status(201).json({ message: "Painting added", painting: newPainting });
        } catch (error) {
            return res.status(500).json({ message: "Error adding painting", error });
        }
    }

    if (req.method === "GET") {
        try {
            const paintings = await Painting.find();
            return res.status(200).json({ paintings });
        } catch (error) {
            return res.status(500).json({ message: "Error fetching paintings", error });
        }
    }

    return res.status(405).json({ message: "Method not allowed" });
}
