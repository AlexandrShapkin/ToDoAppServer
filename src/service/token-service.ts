import { JwtPayload, sign, verify } from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import RedisClient from "../redis/redis";

const ACCESS_KEY = process.env.JWT_ACCESS_KEY || "secret_key";
const REFRESH_KEY = process.env.JWT_REFRESH_KEY || "secret_key";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export function generateTokens(payload: JwtPayload): Tokens {
  const accessToken = sign(payload, ACCESS_KEY, { expiresIn: "12h" });
  const refreshToken = sign(payload, REFRESH_KEY, { expiresIn: "30d" });

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
}

export function verifyAccessToken(token: string): {
  username: string;
  id: string;
  iat: number;
  exp: number;
} {
  try {
    verify(token, ACCESS_KEY);
    return decodeToken(token);
  } catch (err) {
    return null;
  }
}

export function verifyRefreshToken(token: string): {
  username: string;
  id: string;
  iat: number;
  exp: number;
} {
  try {
    verify(token, REFRESH_KEY);
    return decodeToken(token);
  } catch (err) {
    return null;
  }
}

export function decodeToken(token: string): {
  username: string;
  id: string;
  iat: number;
  exp: number;
} {
  const decoded = jwtDecode<{
    username: string;
    id: string;
    iat: number;
    exp: number;
  }>(token);
  return decoded;
}

export async function saveToken(userId: string, refreshToken: string) {
  await RedisClient.set(userId, refreshToken);
}

export async function removeToken(userId: string): Promise<string> {
  const token = await RedisClient.get(userId);
  await RedisClient.del(userId);
  return token;
}

export async function findToken(userId: string): Promise<string> {
  const token = await RedisClient.get(userId);
  return token;
}