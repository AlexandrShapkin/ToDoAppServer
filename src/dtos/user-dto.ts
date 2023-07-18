import { Types } from "mongoose";
import User from "../models/user-model"

export interface UserDto {
  username: string;
  id: string;
}

export function newUserDto(user: {username: string, _id: Types.ObjectId}): UserDto {
  return {
    username: user.username,
    id: user._id.toString("hex")
  }
}