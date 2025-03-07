import { Schema, model, Document } from "mongoose";

export interface ITaskComment extends Document {
    taskId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    comment: string;
    createdAt: Date;
}

const TaskCommentSchema = new Schema<ITaskComment>(
    {
        taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        comment: { type: String, required: true, trim: true },
    },
    { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

const TaskComment = model<ITaskComment>("TaskComment", TaskCommentSchema);

export default TaskComment;
