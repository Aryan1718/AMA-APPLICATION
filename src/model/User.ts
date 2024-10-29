import mongoose, { Document, Schema } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyTime: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}

const MessageSchema: Schema<Message> = new mongoose.Schema({
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

const UserSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique : true
  },
  email: {
    type: String,
    required: [true, "Email Is Required"],
    match: [/.+\@.+\..+/, "Please use a valid email address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password Is Required"],
  },
  verifyCode: String,
  verifyTime: Date,
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});

const UserModel = (mongoose.models.UsersData as mongoose.Model<User>) || mongoose.model<User>('UsersData',UserSchema)

export default UserModel