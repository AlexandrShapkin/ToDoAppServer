import { UserDto } from "./user-dto";

export interface AccessDataDto {
  accessToken: string;
  refreshToken: string;
  userDto: UserDto;
}

/**
 * Create new AccessDataDto
 * @param {string} accessToken 
 * @param {string} refreshToken 
 * @param {UserDto} userDto 
 * @returns {AccessDataDto}
 */
export function newAccessDataDto(
  accessToken: string,
  refreshToken: string,
  userDto: UserDto
): AccessDataDto {
  const accessDataDto: AccessDataDto = {
    accessToken: accessToken,
    refreshToken: refreshToken,
    userDto: userDto,
  };

  return accessDataDto;
}
