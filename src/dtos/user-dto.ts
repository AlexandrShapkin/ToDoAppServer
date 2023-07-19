import { Types } from "mongoose";

/**
 * {  
 *  username: string;  
 *  id: string  
 * }
 */
export interface UserDto {
  username: string;
  id: string;
}

/**
 * Create new object implemented UserDto
 * @param user - {username: string, _id: Types.ObjectId}
 * @returns {UserDto} UserDto
 */
export function newUserDto(user: {username: string, _id: Types.ObjectId}): UserDto {
  return {
    username: user.username,
    id: user._id.toString("hex")
  }
}