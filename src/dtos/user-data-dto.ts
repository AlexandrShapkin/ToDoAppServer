export interface UserDataDto {
  username: string;
  password: string;
}

/**
 * Create new UserDataDto
 * @param {string} username 
 * @param {string} password 
 * @returns {UserDataDto}
 */
export function newUserDataDto(username: string, password: string): UserDataDto {
  const userDataDto: UserDataDto = {
    username: username,
    password: password
  };

  return userDataDto;
}