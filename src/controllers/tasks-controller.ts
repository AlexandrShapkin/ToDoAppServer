import { Request, Response, NextFunction } from "express";
import { RawTaskDto } from "../dtos/raw-task-dto";
import { UserDto } from "../dtos/user-dto";
import * as TasksService from "../service/tasks-service";
import { TaskDto } from "../dtos/task-dto";
import { Result, ValidationError, validationResult } from "express-validator";
import { BadRequest } from "../errors/api-error";

/**
 * Tasks GET handler
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns Response JSON
 */
export async function getAllTasks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userData: UserDto = req.user;
    const filter: any = req.body;
    const tasks: TaskDto[] = await TasksService.getAllTasks(userData, filter);
    return res.json(tasks);
  } catch (err) {
    next(err);
  }
}

/**
 * Tasks POST handler
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns Response JSON
 */
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
    return res.json(newTask);
  } catch (err) {
    next(err);
  }
}

/**
 * Tasks PUT handler
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns Response JSON
 */
export async function updateTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const taskData = req.body;
    const userData: UserDto = req.user;

    if (!await TasksService.isTaskOwner(taskData, userData)) {
      return next(BadRequest("В доступе отказано! Вы не хозяин заметки"));
    }

    const newTask = await TasksService.updateTask(taskData);
    return res.json(newTask);
  } catch (err) {
    next(err);
  }
}

/**
 * Tasks DELETE handler
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns Response JSON
 */
export async function deleteTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const taskData = req.body;
    const userData: UserDto = req.user;

    if (!await TasksService.isTaskOwner(taskData, userData)) {
      return next(BadRequest("В доступе отказано! Вы не хозяин заметки"));
    }

    const deletedTask = await TasksService.deleteTask(taskData);
    return res.json(deletedTask);
  } catch (err) {
    next(err);
  }
}
