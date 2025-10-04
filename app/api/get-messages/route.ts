import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import { getServerSession } from "next-auth";
import NextAuth from "next-auth";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { fail } from "assert";
import { acceptingMessageSchema } from "@/schemas/acceptingMessageSchema";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        message: "User not authenticated.",
        success: false,
      },
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const user = await UserModel.aggregate([
      { $match: { id: userId._id } },
      { $unwind: "messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    if (!user || user.length === 0) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        message: "user found successfully.",
        success: true,
        messages: user[0].messages,
        numberOfMessages: user[0].messages.length,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error during getting user.",
      },
      { status: 500 }
    );
  }
}
