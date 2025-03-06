import 'dotenv/config'
import mongoose from "mongoose";

const MONGODB_URL =  process.env.MONGODB_URL|| 'mongodb://127.0.0.1:27017/task_management_db';

const dbConnection = () => {
    mongoose.connect(MONGODB_URL)
    .then((conn) => console.log(`Connected to MongoDB: ${conn.connection.host}`))
}

export default dbConnection;
