import { Schema, model } from "mongoose";

/**
 * {username: string; password: string;}
 */
export interface IUser {
  username: string;
  password: string;
}

const userShema = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

/**
 * @implements {model<IUser>("User", userShema)}
 */
const User = model<IUser>("User", userShema);

export default User;