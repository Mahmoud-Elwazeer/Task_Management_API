import ApiError from "../utils/apiError";
import Notification from "../models/notification";
import { Request } from "express";
import ensureAdminOrSameUser from "../utils/checkAuth";


export const getUserNotic = async(req: any) => {
    const userId = req.user._id;

    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

    return notifications;
}

export const getOne = async(notificationId: string) => {
    const notic = await Notification.findById(notificationId);
    if (!notic) throw new ApiError("Notification not found", 404);

    return notic;
}


export const markNotificationAsRead = async (req: any) => {
    const { notificationId } = req.params;

    const notic = await getOne(notificationId)

    await ensureAdminOrSameUser(req.user, notic.userId.toString(), 'Notification')

    const notification = await Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });

    return notification;
};