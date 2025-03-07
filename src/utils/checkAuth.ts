import ApiError from "./apiError"
import * as userServices from '../services/user'
import { IUser } from "../models/user";

const ensureAdminOrSameUser = async(user: IUser, userId: string, word?: string) => {
    // check if found user
    const checkUser = await userServices.getOne(userId);

    if (user.role !== 'Admin' && userId !== user._id.toString()){
        throw new ApiError(`You are not authorized for this ${word}`, 403);
    }
}

export const ensureAdminOrManagerOrSameUser = async(user: IUser, userId: string, word?: string) => {
    // check if found user
    const checkUser = await userServices.getOne(userId);

    if (user.role !== 'Admin' && user.role !== 'Manager'  && userId !== user._id.toString()){
        throw new ApiError(`You are not authorized for this ${word}`, 403);
    }
}

export default ensureAdminOrSameUser;
