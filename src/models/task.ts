import mongoose, { Schema, Document } from "mongoose";
import UserTask from "./userTask";
import TaskComment from "./taskComment";
import TaskHistory from "./taskHistory";
import Notification from "./notification";

export interface ITask extends Document {
    title: string;
    description?: string;
    status: "Pending" | "In Progress" | "Completed";
    priority: "Low" | "Medium" | "High";
    createdBy: mongoose.Types.ObjectId;
    dueDate?: Date;
}

const TaskSchema = new Schema<ITask>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        status: {
            type: String,
            required: true,
            enum: ["Pending", "In Progress", "Completed"],
            default: "Pending",
        },
        priority: {
            type: String,
            required: true,
            enum: ["Low", "Medium", "High"],
            default: "Low",
        },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
        dueDate: { type: Date, required: true },
    },
    { timestamps: true }
);

TaskSchema.index({ createdBy: 1 });
TaskSchema.index({ status: 1 });
TaskSchema.index({ dueDate: 1 });
TaskSchema.index({ priority: 1 });

TaskSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    const taskId = this._id;
    await UserTask.deleteMany({ taskId });
    await TaskComment.deleteMany({ taskId });
    await TaskHistory.deleteMany({ taskId });
    await Notification.deleteMany({ taskId });
    next();
});

const Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
