import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

/**
 * Redis connection password. Get from ENV.
 */
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
/**
 * Redis connection password. Get from ENV.
 */
const REDIS_ADDRESS = process.env.REDIS_ADDRESS;
/**
 * Redis connection password. Get from ENV. `6379` - by default
 */
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const REDIS_URL = `redis://${REDIS_ADDRESS}:${REDIS_PORT}`;
const RedisClient = createClient({url: REDIS_URL, password: REDIS_PASSWORD});

RedisClient.on("error", (err) => {
  return console.log(`Redis client error:\n${err}`)
});

RedisClient.connect();

export default RedisClient;