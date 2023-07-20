import User from "../models/user-model";
import {
  encryptPassword,
  isMatchPassword,
} from "../secure/password-encrypting";
import { decodeToken, generateTokens, removeToken, saveToken } from "./token-service";
import { newUserDto, UserDto } from "../dtos/user-dto";
import { BadRequest } from "../errors/api-error";

export async function registration(
  username: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string; userDto: UserDto }> {
  const candidate = await User.findOne({ username: username });
  if (candidate) {
    throw BadRequest(
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
    userDto,
  };
}

export async function login(
  username: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string; userDto: UserDto }> {
  const user = await User.findOne({ username: username });
  if (!user) {
    throw BadRequest("Пользователь не найден");
  }

  const isMatch = isMatchPassword(password, user.password);
  if (!isMatch) {
    throw BadRequest("Неверный пароль");
  }

  const userDto = newUserDto(user);

  const tokens = generateTokens({ ...userDto });
  await saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    userDto,
  };
}

export async function logout(refreshToken: string): Promise<string> {
  const { id } = decodeToken(refreshToken);
  const token = await removeToken(id);
  return token;
}