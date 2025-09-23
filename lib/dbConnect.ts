import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("⚡ Using existing MongoDB connection");
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("❌ MONGO_URI is not defined in environment variables");
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
    throw err; // don’t exit silently
  }
}

export default dbConnect;
