import { TaskDto } from "./task-dto";

export interface RawTaskDto {
  _id?: string;
  header: string;
  content: string;
  deleteOnCompletion: boolean;
  group: string[];
}

/**
 * Create new RawTaskDto
 * @param {string} header
 * @param {string} content
 * @returns {RawTaskDto}
 */
export function newRawTaskDto(
  header: string,
  content: string,
  deleteOnCompletion: boolean,
  group: string[] = []
): RawTaskDto {
  const rawTaskDto: RawTaskDto = {
    header: header,
    content: content,
    deleteOnCompletion: deleteOnCompletion,
    group: group,
  };

  return rawTaskDto;
}

/**
 * Creeate RawTaskDto from TaskDto
 * @param {TaskDto} task 
 * @returns {RawTaskDto}
 */
export function RawTaskFrom(task: TaskDto): RawTaskDto {
  return newRawTaskDto(
    task.header,
    task.content,
    task.deleteOnCompletion,
    task.group
  );
}
