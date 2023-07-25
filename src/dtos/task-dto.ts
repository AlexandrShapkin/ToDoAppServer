import { Types } from "mongoose";

export interface TaskDto {
  user: Types.ObjectId;
  header: string;
  content: string;
  isDone: boolean;
  addTime: Date;
  doneTime: Date;
  deleteOnCompletion: boolean;
  group: string[];
}

/**
 * Create new TaskDto
 * @param {Types.ObjectId} user 
 * @param {string} header 
 * @param {string} content 
 * @param {boolean} isDone 
 * @returns {TaskDto}
 */
export function newTaskDto(
  user: Types.ObjectId,
  header: string,
  content: string,
  isDone: boolean,
  addTime: Date = new Date(),
  doneTime: Date = null,
  deleteOnCompletion: boolean = false,
  group: string[] = []
): TaskDto {
  const taskDto: TaskDto = {
    user: user,
    header: header,
    content: content,
    isDone: isDone,
    addTime: addTime,
    doneTime: doneTime,
    deleteOnCompletion: deleteOnCompletion,
    group: group
  };

  return taskDto;
}
