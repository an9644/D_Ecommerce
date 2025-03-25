import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI;

 async function connectToDatabase() {
      try {
      await mongoose.connect(MONGODB_URI);
      console.log("MongoDB Connected Successfully");
   } catch (error) {
      console.log("MongoDB Connection Error:", error);
      throw error;
   }
}

export default connectToDatabase;
