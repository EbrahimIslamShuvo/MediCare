import { Schema, model } from "mongoose";
import type { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false,
        },

        role: {
            type: String,
            enum: [
                "Admin",
                "Doctor",
                "Patient",
                "Receptionist",
                "Nurse",
                "Laboratorist",
            ],
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "approved"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const User = model<IUser>("User", userSchema);

export default User;