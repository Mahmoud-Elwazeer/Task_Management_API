import { hashPassword } from "../utils/hashPassword";
import ApiError from "../utils/apiError";
import User from "../models/user";
import mongoose from "mongoose";
import { Request } from "express";
import ensureAdminOrSameUser from "../utils/checkAuth";

export const create = async(req: any) => {
    const validatedData = req.validatedData

    const hashedPassword: any = await hashPassword(validatedData.password);

    const newUser = new User({
        ...validatedData,
        password: hashedPassword,
    });

    await newUser.save();

    return newUser;
}

export const getOne = async(identifier: string) => {
    let query;

    // Check if identifier is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(identifier)) {
        query = { _id: identifier };
    } else {
        query = { email: identifier };
    }

    const user = await User.findOne(query);
    if (!user) throw new ApiError("User not found", 404);

    return user;
}

export const getAll = async(req: Request) => {

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();
    const pagination = { page, limit }

    return { users, totalUsers, pagination };
}

export const update = async(req: any) => {
    const userId = req.params.userId;

    await ensureAdminOrSameUser(req.user, userId, 'user');

    if (req.validatedData.role && req.user.role !== 'Admin') {
        throw new ApiError('Only admins can update the role field', 403);
    }

    const user = await User.findByIdAndUpdate(userId, req.validatedData, {
        new: true, runValidators: true
    });

    return user;
}

export const deleteOne = async(req: any) => {
    const userId = req.params.userId;

    await ensureAdminOrSameUser(req.user, userId, 'user');

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError("User not found", 404);
    }

    await user.deleteOne();

    return;
}
