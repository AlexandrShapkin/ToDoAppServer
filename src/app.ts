import express from "express";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import { router } from "./router/router";
import ErrorMiddleware from "./middlewares/error-middleware";
import dotenv from "dotenv";

dotenv.config();

// database envs
/**
 * Database connection username. Get from ENV.
 */
const DB_USER = process.env.DB_USER;
/**
 * Database connection password. Get from ENV.
 */
const DB_PASSWORD = process.env.DB_PASSWORD;
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

const app: express.Express = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use(ErrorMiddleware);

async function run() {
  connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_ADDRESS}:${DB_PORT}/${DB_NAME}`).catch((error) =>
    console.log(error)
  );

  app.listen(PORT, () => {
    return console.log(`Server started at http://localhost:${PORT}`);
  });
}

run();