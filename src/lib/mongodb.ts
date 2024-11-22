import mongoose from "mongoose";

const NEXT_MONGO_URL = process.env.MONGO_URL as string;

if (!NEXT_MONGO_URL) {
  throw new Error("Please add your Mongo URL to .env.local");
}

export const connectMongoDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(NEXT_MONGO_URL);
    console.log("Connected to MongoDB");
  }
};
