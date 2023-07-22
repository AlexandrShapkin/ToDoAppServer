import { Request, Response, NextFunction } from "express";
import { RawTaskDto } from "../dtos/raw-task-dto";
import { UserDto } from "../dtos/user-dto";
import * as TasksService from "../service/tasks-service";
import { TaskDto } from "../dtos/task-dto";
import { Result, ValidationError, validationResult } from "express-validator";
import { BadRequest } from "../errors/api-error";


export async function getAllTasks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userData: UserDto = req.user;
    const filter: any = req.body;
    const tasks: TaskDto[] = await TasksService.getAllTasks(userData, filter);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

export async function addNewTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return next(BadRequest("Ошибка ввода данных", errors.array()));
    }
    const taskData: RawTaskDto = req.body;
    const userData: UserDto = req.user;
    const newTask: TaskDto = await TasksService.addNewTask(taskData, userData);
    res.json(newTask);
  } catch (err) {
    next(err);
  }
}

export async function updateTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const taskData = req.body;
    const userData: UserDto = req.user;

    if (userData.id != taskData.user.toString("hex")) {
      return next(BadRequest("id хозяина заметки и ваш не совпадают"));
    }

    const newTask = await TasksService.updateTask(taskData);
    res.json(newTask);
  } catch (err) {
    next(err);
  }
}

export async function deleteTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const taskId = req.body.id;
    const userId = req.user.id;
    const deletedTask = await TasksService.deleteTask(taskId, userId);
    res.json(deletedTask);
  } catch (err) {
    next(err);
  }
}