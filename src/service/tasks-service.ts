import { RawTaskDto } from "../dtos/raw-task-dto";
import { UserDto } from "../dtos/user-dto";
import { TaskDto } from "../dtos/task-dto";
import Task from "../models/task-model";
import mongoose, { Types } from "mongoose";
import { BadRequest, UpdateError } from "../errors/api-error";

export async function addNewTask(
  taskData: RawTaskDto,
  userData: UserDto
): Promise<any> {
  const userId: mongoose.mongo.BSON.ObjectId =
    mongoose.Types.ObjectId.createFromHexString(userData.id);
  const newTask = await Task.create({
    user: userId,
    isDone: false,
    ...taskData,
  });

  return newTask;
}

export async function getAllTasks(userData: UserDto, filter: any) {
  const tasks: TaskDto[] = await Task.find({ user: userData.id, ...filter });

  return tasks;
}

export async function updateTask(taskData: any) {
  const newTask = await Task.findOneAndUpdate({ _id: taskData._id }, taskData, {
    new: true,
  });

  return newTask;
}

export async function deleteTask(
  id: Types.ObjectId,
  userId: string
): Promise<
  mongoose.Document<unknown, {}, TaskDto> & TaskDto & { _id: Types.ObjectId }
> {
  const condidate = await Task.findById(id);
  if (condidate.user.toString("hex") != userId) {
    throw BadRequest("Вы пытаетесь удалить задачу, которая вам не принадлежит");
  }

  const deletedTask = await Task.findOneAndDelete({ _id: id });
  return deletedTask;
}
