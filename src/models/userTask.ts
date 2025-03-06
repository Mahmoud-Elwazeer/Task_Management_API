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

const UserTask = mongoose.model<IUserTask>('UserTask', userTaskSchema);

export default UserTask;
