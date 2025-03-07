import { Queue, Worker, Job } from "bullmq";
import redisClient from "../utils/redis";
import Notification from "../models/notification";

const notificationQueue = new Queue("notificationQueue", {
    connection: redisClient,
});

const notificationWorker = new Worker(
    "notificationQueue",
    async (job: Job) => {
        console.log(`📢 Processing Notification for jobId (${job.id}): ${job.data.type} for Task ID: ${job.data.taskId}`);

        let message = "";

        switch (job.data.type) {
            case "TASK_CREATED":
                message = `A new task has been created: ${job.data.taskId}`;
                break;
            case "TASK_UPDATED":
                message = `Task ${job.data.taskId} has been updated.`;
                break;
            case "TASK_DELETED":
                message = `Task ${job.data.taskId} has been deleted.`;
                break;
            case "TASK_COMMENTED":
                message = `Task ${job.data.taskId} has been commented.`;
                break;
            case "TASK_COMMENT_DELETED":
                message = `Task ${job.data.taskId} has been comment deleted.`;
                break;
            case "TASK_ASSIGNED":
                message = `You have been assigned to Task ${job.data.taskId}`;
                break;
            case "TASK_UNASSIGNED":
                message = `You have been unassigned from Task ${job.data.taskId}`;
                break;
        }

        await Notification.create({
            userId: job.data.userId,
            taskId: job.data.taskId,
            message,
        });

        console.log("✅ Notification saved to DB.");
    },
    { connection: redisClient }
);

notificationWorker.on('completed', (job) => {
    console.log(`✅ Notification job ${job.id} completed.`);
});

notificationWorker.on('failed', (job: any, err) => {
    console.error(`❌ Notification job ${job.id} failed:`, err.message);
});

export default notificationQueue;
