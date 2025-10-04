import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/User";

import { getServerSession } from "next-auth";
import NextAuth from "next-auth";
import { User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { fail } from "assert";
import { acceptingMessageSchema } from "@/schemas/acceptingMessageSchema";
import mongoose from "mongoose";

export async function Delete(
  request: Request,
  { params }: { params: { messageId: string } }
) {
  const { messageId } = params;
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
    const updatedMessage = await UserModel.updateOne(
      { _id: userId },
      { $pull: { messages: { _id: new mongoose.Types.ObjectId(messageId) } } }
    );
    if (updatedMessage.modifiedCount === 0) {
      return Response.json(
        {
          message: "Message not found.",
          success: false,
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        message: "Message deleted successfully.",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        message: "Internal server error.",
        success: false,
      },
      { status: 500 }
    );
  }
}
