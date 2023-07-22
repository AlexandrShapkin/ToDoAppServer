import { Router } from "express";
import {
  getAllTasks,
  addNewTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks-controller";
import { body } from "express-validator";

export const tasks = Router();

tasks.get("/", getAllTasks);
tasks.post(
  "/task",
  body("header").isLength({min: 1}),
  body("content").isLength({min: 1}),
  addNewTask
);
tasks.put("/task", updateTask);
tasks.delete("/task", deleteTask);
