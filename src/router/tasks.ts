import { Router } from "express";
import {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
  addTasks
} from "../controllers/tasks-controller";
import { body } from "express-validator";

export const tasks = Router();

tasks.get("/", getAllTasks);
tasks.post("/", addTasks);
tasks.post("/task", addTask);
tasks.put("/task", updateTask);
tasks.delete("/task", deleteTask);
