import { Types } from "mongoose";

export interface TaskDto {
  user: Types.ObjectId;
  header: string;
  content: string;
  isDone: boolean;
}