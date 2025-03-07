import { Request } from "express";
import TaskHistory from "../models/taskHistory";
import mongoose from "mongoose";

export const getTaskHistory = async (req: Request) => {
    const { taskId } = req.params;

    const history = await TaskHistory.aggregate([
        { $match: { taskId: new mongoose.Types.ObjectId(taskId) } },
        { $sort: { timestamp: -1 } },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
            },
        },
        { $unwind: "$user" },
        {
            $project: {
                _id: 0,
                action: 1,
                changes: 1,
                timestamp: 1,
                user: { name: 1, email: 1 },
            },
        },
    ]);

    return history;
};

export const getTaskInteractions = async (req: Request) => {
    const { taskId } = req.params;

    const users = await TaskHistory.aggregate([
        { $match: { taskId: new mongoose.Types.ObjectId(taskId) } },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
            },
        },
        { $unwind: "$user" },
        { $group: { _id: "$userId", name: { $first: "$user.name" }, email: { $first: "$user.email" } } },
    ]);

    return users;
};


