import 'dotenv/config'
import bcrypt from 'bcrypt'
import ApiError from './apiError';

export const hashPassword = async(password: string) => {
    try {
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || '10', 10));
        return await bcrypt.hash(password, salt);
    } catch (err) {
        throw new ApiError('Internal server error', 500);
    }
}
