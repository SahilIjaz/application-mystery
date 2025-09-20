import mongoose, { ConnectOptions } from "mongoose";

type connectionObjec = {
  isConnected?: number;
};

const connection: connectionObjec = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "", {});
    console.log("db connection estavlished successfully.");

    connection.isConnected = db.connections[0].readyState;
  } catch (err) {
    process.exit(1);
  }
}

export default dbConnect;
