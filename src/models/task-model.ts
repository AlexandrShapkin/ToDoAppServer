import { ObjectId, Schema, model } from "mongoose";

/**
 * {
    user: ObjectId;
    header: string;
    content: string;
    isDone: boolean;
  }
 */
interface ITask {
  user: ObjectId;
  header: string;
  content: string;
  isDone: boolean;
}

const taskSchema = new Schema<ITask>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  header: { type: String, required: true },
  content: { type: String, required: true },
  isDone: { type: Boolean, required: true },
});

/**
 * @implements {model<ITask>("Task", taskSchema)}
 */
const Task = model<ITask>("Task", taskSchema);

export default Task;
