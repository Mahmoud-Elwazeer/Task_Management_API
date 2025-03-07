import mongoose, { Schema, Document } from "mongoose";

interface IUserTask extends Document {
    userId: mongoose.Types.ObjectId;
    taskId: mongoose.Types.ObjectId;
}

const userTaskSchema = new Schema<IUserTask>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
        taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true }, // Reference to Task
    },
    { timestamps: true }
);

userTaskSchema.index({ userId: 1, taskId: 1 }, { unique: true }); // Prevent duplicate assignments
userTaskSchema.index({ userId: 1 }); // Fetch all tasks assigned to a user
userTaskSchema.index({ taskId: 1 }); // Fetch all users assigned to a task

const UserTask = mongoose.model<IUserTask>('UserTask', userTaskSchema);

export default UserTask;
