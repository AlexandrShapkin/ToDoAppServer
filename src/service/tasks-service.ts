import { RawTaskDto } from "../dtos/raw-task-dto";
import { UserDto } from "../dtos/user-dto";
import Task, { TaskMongooseDoc } from "../models/task-model";
import mongoose, { Types } from "mongoose";
import { BadRequest } from "../errors/api-error";

/**
 * Add new Task service
 * @param {RawTaskDto} taskData 
 * @param {UserDto} userData 
 * @returns {Promise<TaskMongooseDoc>}
 */
export async function addNewTask(
  taskData: RawTaskDto,
  userData: UserDto
): Promise<TaskMongooseDoc> {
  const userId: mongoose.mongo.BSON.ObjectId =
    mongoose.Types.ObjectId.createFromHexString(userData.id);
  const newTask: TaskMongooseDoc = await Task.create({
    user: userId,
    isDone: false,
    ...taskData,
  });

  return newTask;
}

/**
 * Get All Tasks service
 * @param {UserDto} userData 
 * @param {any} filter 
 * @returns {Promise<TaskMongooseDoc>}
 */
export async function getAllTasks(
  userData: UserDto,
  filter: any
): Promise<TaskMongooseDoc[]> {
  const tasks: TaskMongooseDoc[] = await Task.find({
    user: userData.id,
    ...filter,
  });

  return tasks;
}

/**
 * Update Task service
 * @param {any} taskData 
 * @returns {Promise<TaskMongooseDoc>}
 */
export async function updateTask(taskData: any): Promise<TaskMongooseDoc> {
  const newTask: TaskMongooseDoc = await Task.findOneAndUpdate(
    { _id: taskData._id },
    taskData,
    {
      new: true,
    }
  );

  return newTask;
}

/**
 * Delete Task service
 * @param {Types.ObjectId} id 
 * @param {string} userId 
 * @returns {Promise<TaskMongooseDoc>}
 */
export async function deleteTask(
  id: Types.ObjectId,
  userId: string
): Promise<TaskMongooseDoc> {
  const condidate: TaskMongooseDoc = await Task.findById(id);
  if (condidate.user.toString("hex") != userId) {
    throw BadRequest("Вы пытаетесь удалить задачу, которая вам не принадлежит");
  }

  const deletedTask: TaskMongooseDoc = await Task.findOneAndDelete({ _id: id });
  return deletedTask;
}
