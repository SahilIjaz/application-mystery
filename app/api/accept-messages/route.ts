import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import { getServerSession } from "next-auth";
import NextAuth from "next-auth";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { fail } from "assert";
import { success } from "zod";
import { acceptingMessageSchema } from "@/schemas/acceptingMessageSchema";

export async function POST(request: Request) {
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

  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      { userId, isAcceptingMessages: acceptMessages },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        {
          sucess: false,
          message: "Mesages acceptance choice not fulfilled.",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        message: "Message acceptance choice has been updated,succesfully.",
        success: true,
        user: updatedUser,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Erro while fetching the user from db.");
    return Response.json(
      { success: false, message: "Error while fetching user." },
      { status: 500 }
    );
  }
}

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

  const userId = user._id;

  try {
    const currentUser = await UserModel.findById(userId);

    if (!currentUser) {
      return Response.json(
        {
          message: "Current user ws not found.",
          success: false,
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Currently loggedIn user found,sucessfully.",
        acceptingMessage: user.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("USRE NOT FOUND.");
    return Response.json(
      {
        sucess: false,
        mesage: "issue in getting user by id.",
      },
      {
        status: 500,
      }
    );
  }
}
