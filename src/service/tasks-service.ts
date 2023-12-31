import { RawTaskDto } from "../dtos/raw-task-dto";
import { UserDto } from "../dtos/user-dto";
import Task, { TaskMongooseDoc } from "../models/task-model";
import mongoose from "mongoose";

/**
 * Add new Task service
 * @param {RawTaskDto} taskData
 * @param {UserDto} userData
 * @returns {Promise<TaskMongooseDoc>}
 */
export async function addTask(
  taskData: RawTaskDto,
  userData: UserDto
): Promise<TaskMongooseDoc> {
  const userId: mongoose.mongo.BSON.ObjectId =
    mongoose.Types.ObjectId.createFromHexString(userData.id);
  delete taskData["_id"];
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

  if (newTask.deleteOnCompletion && newTask.isDone) {
    await deleteTask(newTask._id);
  } else if (newTask.isDone && taskData?.isDone) {
    newTask.doneTime = new Date();
    await newTask.save();
  } else if (!newTask.isDone && !taskData?.isDone) {
    newTask.doneTime = null;
    await newTask.save();
  }

  return newTask;
}

/**
 * Delete Task service
 * @param {any} taskData
 * @returns {Promise<TaskMongooseDoc>}
 */
export async function deleteTask(taskData: any): Promise<TaskMongooseDoc> {
  const deletedTask: TaskMongooseDoc = await Task.findOneAndDelete({
    _id: taskData._id,
  });
  return deletedTask;
}

/**
 * Check is user task owner
 * @param {any} taskData 
 * @param {UserDto} userData 
 * @returns {Promise<boolean>}
 */
export async function isTaskOwner(
  taskData: any,
  userData: UserDto
): Promise<boolean> {
  const condidate: TaskMongooseDoc = await Task.findOne({ _id: taskData._id });
  if (condidate?.user.toString("hex") == userData.id) {
    return true;
  }

  return false;
}
