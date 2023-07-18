import express, { Express, Request, Response } from "express";
import { connect } from "mongoose";
import RedisClient from "./redis/redis"
import cookieParser from "cookie-parser";
import { router } from "./router/router";

// database envs
/**
 * Database connection address. Get from ENV. `localhost` - by default
 */
const DB_ADDRESS = process.env.DB_ADDRESS || "localhost";
/**
 * Databse connection port. Get from ENV. `27017` - by default
 */
const DB_PORT = process.env.DB_PORT || 27017;
/**
 * Database name. Get from ENV. `ToDoApp` - by default
 */
const DB_NAME = process.env.DB_NAME || "ToDoApp";

// App envs
/**
 * Server listen port. Get from ENV. `3000` - by default
 */
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

async function run() {
  connect(`mongodb://${DB_ADDRESS}:${DB_PORT}/${DB_NAME}`).catch((error) =>
    console.log(error)
  );

  app.listen(PORT, () => {
    return console.log(`Server started at http://localhost:${PORT}`);
  });

  await RedisClient.set("key", "test");
  const value = await RedisClient.get("key");
  console.log(value);
}

run();