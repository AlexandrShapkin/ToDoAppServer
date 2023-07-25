import { Types } from "mongoose";

export interface TaskDto {
  user: Types.ObjectId;
  header: string;
  content: string;
  isDone: boolean;
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
  isDone: boolean
): TaskDto {
  const taskDto: TaskDto = {
    user: user,
    header: header,
    content: content,
    isDone: isDone
  };

  return taskDto;
}
