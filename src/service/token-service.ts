import { JwtPayload, sign, verify } from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import RedisClient from "../redis/redis";

/**
 * Key for JWT access token. Get from ENV. `secret_key` - by default
 */
const ACCESS_KEY = process.env.JWT_ACCESS_KEY || "secret_key";
/**
 * Key for JWT refresh token. Get from ENV. `secret_key` - by default
 */
const REFRESH_KEY = process.env.JWT_REFRESH_KEY || "secret_key";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * @extends {JwtPayload}
 */
export interface TokenPayload extends JwtPayload {
  username: string;
  id: string;
}

/**
 * Generate new tokens pair
 * @param {TokenPayload} payload 
 * @returns {Tokens}
 */
export function generateTokens(payload: TokenPayload): Tokens {
  const accessToken = sign(payload, ACCESS_KEY, { expiresIn: "12h" });
  const refreshToken = sign(payload, REFRESH_KEY, { expiresIn: "30d" });

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
}

/**
 * Verify access token
 * @param {string} token 
 * @returns {TokenPayload}
 */
export function verifyAccessToken(token: string): TokenPayload {
  try {
    const userData = verify(token, ACCESS_KEY);
    if (!userData) {
      return null;
    }
    return decodeToken(token);
  } catch (err) {
    return null;
  }
}

/**
 * Verify refresh token
 * @param {string} token 
 * @returns {TokenPayload}
 */
export function verifyRefreshToken(token: string): TokenPayload {
  try {
    const userData = verify(token, REFRESH_KEY);
    if (!userData) {
      return null;
    }
    return decodeToken(token);
  } catch (err) {
    return null;
  }
}

/**
 * Decode JWT token
 * @param {string} token 
 * @returns {TokenPayload}
 */
export function decodeToken(token: string): TokenPayload {
  const decoded = jwtDecode<TokenPayload>(token);
  return decoded;
}

/**
 * Save refresh token in database
 * @param {string} userId 
 * @param {string} refreshToken 
 */
export async function saveToken(userId: string, refreshToken: string) {
  await RedisClient.set(userId, refreshToken);
}

/**
 * Remove token from database
 * @param {string} userId 
 * @returns {Promise<string>}
 */
export async function removeToken(userId: string): Promise<string> {
  const token = await RedisClient.get(userId);
  await RedisClient.del(userId);
  return token;
}

/**
 * Find token in database
 * @param {string} userId 
 * @returns {Promise<string>}
 */
export async function findToken(userId: string): Promise<string> {
  const token = await RedisClient.get(userId);
  return token;
}
