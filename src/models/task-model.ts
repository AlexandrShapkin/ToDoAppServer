import mongoose, { Schema, Types, model } from "mongoose";
import { TaskDto } from "../dtos/task-dto";

export type TaskMongooseDoc = mongoose.Document<unknown, {}, TaskDto> & TaskDto & { _id: Types.ObjectId }

const taskSchema = new Schema<TaskDto>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  header: { type: String, required: true },
  content: { type: String, required: true },
  isDone: { type: Boolean, required: true },
  addTime: { type: Date, required: true, default: Date.now},
  doneTime: { type: Date, default: null },
  deleteOnCompletion: { type: Boolean, default: false },
  group: [{ type: String }]
});

/**
 * @implements {model<TaskDto>("Task", taskSchema)}
 */
const Task = model<TaskDto>("Task", taskSchema);

export default Task;
