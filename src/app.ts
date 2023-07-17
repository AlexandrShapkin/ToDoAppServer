import express, { Express, Request, Response } from "express";
import { connect } from "mongoose";
import User from "./models/user-model";
import Task from "./models/task-model";

import { encryptPassword, isMatchPassword } from "./secure/password-encrypting";

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

async function run() {
  connect(`mongodb://${DB_ADDRESS}:${DB_PORT}/${DB_NAME}`).catch((error) =>
    console.log(error)
  );

  app.listen(PORT, () => {
    return console.log(`Server started at http://localhost:${PORT}`);
  });
}

run();