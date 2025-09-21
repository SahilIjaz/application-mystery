import dbConnect from "@/lib/dbConnect";

import { UserModel } from "@/models/User";

import bcrypt from "bcryptjs";
import { sendVerifictionEmail } from "@/helpers/sendVerificationOTP";
import { verifySchema } from "@/schemas/verifySchema";

export async function POST(request: Request) {
  dbConnect();

  try {
    const { userName, email, password } = await request.json();

    const existingUserWithVerifiedUserName = await UserModel.findOne({
      userName,
      isVerified: true,
    });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserWithVerifiedUserName) {
      return Response.json(
        {
          success: false,
          mesage: "This user name is al-ready taken.",
        },
        {
          status: 400,
        }
      );
    }

    const userWithEmaail = await UserModel.findOne({ email });

    if (userWithEmaail) {
      //   true;
      if (userWithEmaail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "user al-ready exists with this email.",
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        userWithEmaail.password = hashedPassword;
        userWithEmaail.verifyCode = verifyCode;
        userWithEmaail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await userWithEmaail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        userName,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        messages: [],
        isAceptingMessages: true,
      });

      await newUser.save();
    }

    const emailresponse = await sendVerifictionEmail(
      email,
      userName,
      verifyCode
    );

    if (!emailresponse.success) {
      return Response.json(
        {
          success: false,
          message: emailresponse.message,
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User registered successfully, kindly verify your email.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error egistering error.");

    return Response.json(
      {
        success: false,
        message: "Error registering user.",
      },
      { status: 500 }
    );
  }
}
