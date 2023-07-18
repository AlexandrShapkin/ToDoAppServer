import { createClient } from "redis";

const RedisClient = createClient();

RedisClient.on("error", (err) => {
  return console.log(`Redis client error:\n${err}`)
});

RedisClient.connect();

export default RedisClient;