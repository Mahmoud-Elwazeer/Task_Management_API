import ApiError from "./apiError"
import * as userServices from '../services/user'
import { IUser } from "../models/user";

const ensureAdminOrSameUser = async(user: IUser, userId: string, word?: string) => {
    // check if found user
    const checkUser = await userServices.getOne(userId);

    if (user.role !== 'Admin' && userId !== user.id){
        throw new ApiError(`You are not authorized for this ${word}`, 403);
    }
}

export const ensureAdminOrManagerOrSameUser = async(req: any, userId: string, word?: string) => {
    const user = await userServices.getOne(userId);

    if (req.user.role !== 'Admin' && req.user.role !== 'Manager' && userId !== req.user.id){
        throw new ApiError(`You are not authorized for this ${word}`, 403);
    }
}

export default ensureAdminOrSameUser;
