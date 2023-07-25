import { Types } from "mongoose";

export interface UserDto {
  username: string;
  id: string;
}

/**
 * Create new UserDto
 * @param {{username: string, _id: Types.ObjectId}} user
 * @returns {UserDto}
 */
export function newUserDto(user: {username: string, _id: Types.ObjectId}): UserDto {
  const userDto: UserDto = {
    username: user.username,
    id: user._id.toHexString()
  }

  return userDto;
}