import { Jwt, JwtPayload, sign } from "jsonwebtoken";
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
    refreshToken: refreshToken
  }
}

export async function saveToken(userId: string, refreshToken: string) {
  await RedisClient.set(userId, refreshToken);
}