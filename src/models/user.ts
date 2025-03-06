import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";
import { Types } from 'mongoose';

export interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: "Admin" | "Manager" | "User";
    isVerified: Boolean;
    createdAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        name: { 
            type: String, 
            required: [true, "Name is required"], 
            minlength: [3, "Name must be at least 3 characters long"] 
        },
        email: { 
            type: String, 
            required: [true, "Email is required"], 
            unique: true, 
            lowercase: true, 
            validate: [validator.isEmail, "Invalid email format"] 
        },
        password: { 
            type: String, 
            required: [true, "Password is required"], 
            minlength: [6, "Password must be at least 6 characters long"] 
        },
        role: { 
            type: String, 
            enum: ["Admin", "Manager", "User"], 
            default: "User" 
        },
        isVerified: { 
            type: Boolean, 
            default: false
        },
    },
    { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

// Exclude password and __v when returning JSON
UserSchema.set("toJSON", {
    transform: (_doc, ret) => {
        delete ret.password;
        delete ret.__v;
        return ret;
    },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
