import { Schema, model, Document } from "mongoose";

export interface INotification extends Document {
    userId: Schema.Types.ObjectId;
    taskId: Schema.Types.ObjectId;
    message: string;
    isRead: boolean;
    createdAt: Date;
}

const NotificationSchema = new Schema<INotification>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        taskId: { type: Schema.Types.ObjectId, ref: "Task" },
        message: { type: String, required: true },
        isRead: { type: Boolean, default: false },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

NotificationSchema.index({ userId: 1, isRead: 1 });

const Notification = model<INotification>("Notification", NotificationSchema);

export default Notification