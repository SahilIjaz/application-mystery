import { z } from "zod";
import { UserModel } from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request) {
  await dbConnect();

  try {
    
  } catch (error) {
    console.error("Erro while checking veriy code.");
  }
}
