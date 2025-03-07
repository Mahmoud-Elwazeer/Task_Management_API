import ApiError from "../utils/apiError";
import TaskComment from "../models/taskComment";
import TaskHistory from "../models/taskHistory";
import * as userTaskServices from './userTask';
import { ensureAdminOrManagerOrSameUser } from "../utils/checkAuth";

export const create = async(req: any) => {
    const { comment } = req.validatedData
    const { taskId } = req.params
    const userId = req.user._id;
    const user = req.user;

    await userTaskServices.checkAuthForTask(userId, taskId);

    const newComment = new TaskComment({
        taskId,
        userId,
        comment,
    });

    await newComment.save();

    await TaskHistory.create({
        taskId,
        userId,
        action: "COMMENTED",
        changes: { 
            name: user.name, email: user.email, 
            role: user.role, comment
        },
    });

    return newComment;
}

export const getOne =  async(commentId: string) => {
    const comment = await TaskComment.findById(commentId);
    if (!comment) throw new ApiError("Task Comment not found", 404);

    return comment;
}

export const getTaskComments = async (req: any) => {
    const { taskId } = req.params;

    await userTaskServices.checkAuthForTask(req.user._id, taskId);

    const { page = 1, limit = 10 } = req.query;

    const comments = await TaskComment.find({ taskId })
        .populate("userId", "name email role") // Get user details
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));

    return comments;
};

export const deleteOne = async (req: any) => {
    const { taskId , commentId} = req.params;
    const user = req.user;
    

    const comment = await TaskComment.findById(commentId);

    if (!comment) {
        throw new ApiError("Task Comment not found", 404);
    }

    await ensureAdminOrManagerOrSameUser(user, comment.userId.toString());

    await comment.deleteOne();

    await TaskHistory.create({
        taskId,
        userId: req.user._id,
        action: "COMMENT_DELETED",
        changes: { 
            name: user.name, email: user.email, 
            role: user.role, comment
        },
    });

    return;
}
