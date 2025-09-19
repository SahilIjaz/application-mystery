import mongoose, { Document, Schema } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  userName: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  messages: Message[];
  isAceptingMessages: boolean;
}

const UserSchema: Schema<User> = new Schema({
  userName: {
    type: String,
    required: [true, "user name is required."],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required."],
    unique: true,
    match: [
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "enetr valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  verifyCode: {
    type: String,
    required: true,
  },
  verifyCodeExpiry: {
    type: Date,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  messages: [MessageSchema],
  isAceptingMessages: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const UserModel =
  mongoose.models.User || mongoose.model<User>("User", UserSchema);
const MessageModel =
  mongoose.models.Message || mongoose.model<Message>("Message", MessageSchema);

export { UserModel, MessageModel };
