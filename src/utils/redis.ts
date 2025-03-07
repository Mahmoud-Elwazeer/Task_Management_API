import 'dotenv/config';
import { Redis } from "ioredis";

const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = process.env.REDIS_PORT || '6379';
const ExpireTime = process.env.ExpiryTimeForCache || '3600';

const redisClient = new Redis({
    host: REDIS_HOST,
    port: parseInt(REDIS_PORT, 10),
    maxRetriesPerRequest: null,
});

redisClient.on("error", (error) => {
    console.error("Redis error:", error);

    if (process.env.NODE_ENV === "prod") {
        process.exit(1);
    }
});

redisClient.on("connect", () => {
    console.log("Connected to Redis successfully");
});

export const setCache = async (key: string, value: any, expiry: number = parseInt(ExpireTime, 10)) => {
    await redisClient.set(key, JSON.stringify(value), "EX", expiry);
};

export const getCache = async (key: string) => {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
};

export const deleteCache = async (key: string | string[]) => {
    if (Array.isArray(key)) {
        await redisClient.del(...key);
    } else {
        await redisClient.del(key);
    }
};

export const checkKey = async(key: string) => {
    const keys = await redisClient.keys(key);
    return keys;
}

export default redisClient;

