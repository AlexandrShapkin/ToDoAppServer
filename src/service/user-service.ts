import User from "../models/user-model";
import { encryptPassword } from "../secure/password-encrypting";
import { generateTokens, saveToken } from "./token-service";
import { newUserDto, UserDto } from "../dtos/user-dto";

export async function registration(
  username: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string; userDto: UserDto }> {
  const candidate = await User.findOne({ username: username });
  if (candidate) {
    throw Error(
      `Пользователь с именем пользователя ${username} уже зарегистрирован`
    );
  }

  const hashedPassword = encryptPassword(password);

  const newUser = await User.create({
    username: username,
    password: hashedPassword,
  });

  const userDto = newUserDto(newUser);

  const tokens = generateTokens({ ...userDto });
  await saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    userDto
  };
}
