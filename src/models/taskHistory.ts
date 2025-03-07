import { Schema, model, Document } from "mongoose";

export interface ITaskHistory extends Document {
    taskId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId; // Who made the change
    action: "CREATED" | "UPDATED" | "DELETED" | "COMMENTED" |  "COMMENT_DELETED" | "ASSIGNED" | "UNASSIGNED"; // Action type
    changes?: Record<string, any>; // Store changed fields
    timestamp: Date;
}

const TaskHistorySchema = new Schema<ITaskHistory>(
    {
        taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        action: { type: String, enum: ["CREATED", "UPDATED", "DELETED", "COMMENTED", "COMMENT_DELETED", "ASSIGNED", "UNASSIGNED"], required: true },
        changes: { type: Schema.Types.Mixed }, // Stores changed fields (only for updates)
    },
    { timestamps: { createdAt: "timestamp", updatedAt: false } }
);

const TaskHistory = model<ITaskHistory>("TaskHistory", TaskHistorySchema);

export default TaskHistory;
