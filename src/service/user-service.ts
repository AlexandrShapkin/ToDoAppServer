import User from "../models/user-model";
import {
  encryptPassword,
  isMatchPassword,
} from "../secure/password-encrypting";
import {
  decodeToken,
  generateTokens,
  Tokens,
  removeToken,
  saveToken,
  verifyRefreshToken,
  findToken,
  TokenPayload,
} from "./token-service";
import { newUserDto, UserDto } from "../dtos/user-dto";
import { AccessDataDto } from "../dtos/access-data-dto";
import { BadRequest, UnauthorizedError } from "../errors/api-error";

export async function registration(
  username: string,
  password: string
): Promise<AccessDataDto> {
  const candidate = await User.findOne({ username: username });
  if (candidate) {
    throw BadRequest(
      `Пользователь с именем пользователя ${username} уже зарегистрирован`
    );
  }

  const hashedPassword: string = encryptPassword(password);

  const newUser = await User.create({
    username: username,
    password: hashedPassword,
  });

  const userDto: UserDto = newUserDto(newUser);

  const tokens: Tokens = generateTokens(userDto);
  await saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    userDto,
  };
}

export async function login(
  username: string,
  password: string
): Promise<AccessDataDto> {
  const user = await User.findOne({ username: username });
  if (!user) {
    throw BadRequest("Пользователь не найден");
  }

  const isMatch: boolean = isMatchPassword(password, user.password);
  if (!isMatch) {
    throw BadRequest("Неверный пароль");
  }

  const userDto: UserDto = newUserDto(user);

  const tokens: Tokens = generateTokens({ ...userDto });
  await saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    userDto,
  };
}

export async function logout(refreshToken: string): Promise<string> {
  const { id } = decodeToken(refreshToken);
  const token: string = await removeToken(id);
  return token;
}

export async function refresh(
  refreshToken: string
): Promise<AccessDataDto> {
  if (!refreshToken) {
    throw UnauthorizedError();
  }
  const userData: TokenPayload = verifyRefreshToken(refreshToken);
  const redisToken: string = await findToken(userData?.id);

  if (!userData || !redisToken) {
    throw UnauthorizedError();
  }
  const user = await User.findById(userData.id);
  const userDto: UserDto = newUserDto(user);

  const tokens: Tokens = generateTokens({ ...userDto });
  await saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    userDto,
  };
}
