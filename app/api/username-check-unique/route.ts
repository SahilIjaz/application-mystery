import { success, z } from "zod";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import { userNameSchema } from "@/schemas/signUpSchema";

export const userNameQuery = z.object({
  userName: userNameSchema,
});

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);

    const queryParams = {
      userName: searchParams.get("userName"),
    };

    const result = userNameQuery.safeParse(queryParams);

    if (!result.success) {
      return Response.json(
        {
          success: false,
          message: "User name is not corect.",
        },
        { status: 400 }
      );
    }
    console.log("RESULT IS : ", result);

    const { userName } = result.data;

    const eistingVerifiedUser = await UserModel.findOne({
      userName,
      isVerified: true,
    });

    if (eistingVerifiedUser) {
      return Response.json(
        {
          success: false,
          messaage: "User anme is al-ready taken.",
        },
        { status: 400 }
      );
    } else {
      return Response.json(
        { success: true, message: "User name is unique." },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error whilechecking userName unique.");
  }
}
