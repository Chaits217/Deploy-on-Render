import mongoose from "mongoose";

const DEFAULT_URI = "mongodb://127.0.0.1:27017/life-decision-simulator";

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || DEFAULT_URI;

  if (!process.env.MONGO_URI) {
    console.warn(`MONGO_URI not set in server/.env — falling back to ${DEFAULT_URI}`);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (err) {
    console.error(`MongoDB connection failed: ${err.message}`);
    console.error("The server is still running, but /api/options will fail until Mongo is reachable.");
    console.error("Fix: start MongoDB locally, or set MONGO_URI in server/.env to an Atlas connection string.");
  }
};
