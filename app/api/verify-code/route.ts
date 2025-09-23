import { z } from "zod";
import { UserModel } from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { userName, code } = await request.json();
    const decodedUsername = decodeURIComponent(userName);

    const user = await UserModel.findOne({ userName: decodedUsername });

    if (!user) {
      return Response.json(
        {
          message: "user was not found .",
          success: false,
        },
        { status: 404 }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const codeNotExpired = user.expiryDate > Date.now();

    if (isCodeValid && codeNotExpired) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        {
          message: "User verified successfully.",
          sucess: true,
        },
        {
          status: 200,
        }
      );
    }
    if (!codeNotExpired) {
      return Response.json(
        {
          success: false,
          message: "Verification code expired, sign-up again.",
        },
        { status: 400 }
      );
    }
    if (!isCodeValid) {
      return Response.json(
        {
          success: false,
          message: "In-correct verification code.",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Erro while checking veriy code.");
  }
}
