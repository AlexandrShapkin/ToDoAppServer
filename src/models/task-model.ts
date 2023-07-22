import { Schema, model } from "mongoose";
import { TaskDto } from "../dtos/task-dto";

const taskSchema = new Schema<TaskDto>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  header: { type: String, required: true },
  content: { type: String, required: true },
  isDone: { type: Boolean, required: true },
});

/**
 * @implements {model<TaskDto>("Task", taskSchema)}
 */
const Task = model<TaskDto>("Task", taskSchema);

export default Task;
