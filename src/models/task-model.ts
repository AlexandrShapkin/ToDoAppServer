import { ObjectId, Schema, model } from "mongoose";

interface Task {
  user: ObjectId;
  header: string;
  content: string;
  isDone: boolean;
}

const taskSchema = new Schema<Task>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  header: { type: String, required: true },
  content: { type: String, required: true },
  isDone: { type: Boolean, required: true },
});

const Task = model<Task>("Task", taskSchema);

export default Task;
