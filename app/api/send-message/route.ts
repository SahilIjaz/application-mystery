import dbConnect from "@/lib/dbConnect";
import { Message, UserModel } from "@/models/User";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { userName, content } = await request.json();
    const user = await UserModel.findOne(userName);

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found with user-name.",
        },
        {
          status: 404,
        }
      );
    }

    if (!user.isAcceptingMessages) {
      return Response.json(
        {
          success: false,
          messge: "REquest user is not accepting messges.",
        },
        { status: 403 }
      );
    }

    const newMessage = { content, createdAt: new Date() };

    user.messages.push(newMessage);
    await user.save();

    return Response.json(
      {
        message: "Message sent successfully.",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Issue while getting user in send message route.",
      },
      { status: 500 }
    );
  }
}
