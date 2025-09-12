import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document
{
    name: string;
    email: string;
    password: string; // hashed
    role: "user" | "admin";
    profilePicture?: string;
    mobileNumber?: string;
    address?: string;
    userDob?: string;
    secondaryEmail?: string;
    isDeleted?: boolean;
    createdAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        profilePicture: {
            type: String,
            default: ""
        },
        mobileNumber: {
            type: String,
            default: ""
        },
        address: {
            type: String,
            default: ""
        },
        userDob: {
            type: Date,
            default: null
        },
        secondaryEmail: {
            type: String,
            default: "",
            lowercase: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
