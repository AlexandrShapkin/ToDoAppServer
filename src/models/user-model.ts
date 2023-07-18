import { Schema, model } from "mongoose";

export interface IUser {
  username: string;
  password: string;
}

const userShema = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = model<IUser>("User", userShema);

export default User;