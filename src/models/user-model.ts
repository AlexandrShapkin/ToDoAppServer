import { Schema, model } from "mongoose";
import { UserDataDto } from "../dtos/user-data-dto";

const userShema = new Schema<UserDataDto>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

/**
 * @implements {model<UserDataDto>("User", userShema)}
 */
const User = model<UserDataDto>("User", userShema);

export default User;