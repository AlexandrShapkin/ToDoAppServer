import { UserDto } from "./user-dto";

export interface AccessDataDto {
  accessToken: string;
  refreshToken: string;
  userDto: UserDto
}