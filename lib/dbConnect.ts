import mongoose, { ConnectOptions } from "mongoose";

type connectionObjec = {
  isConnected?: number;
};

const connection: connectionObjec = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    return;
  }
  try{
    await mongoose.connect()
  }
  catch(err)
  {

  }

}
