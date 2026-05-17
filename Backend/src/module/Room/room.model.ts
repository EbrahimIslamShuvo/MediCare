import {
    Schema,
    model,
} from "mongoose";

import type {
    IRoom,
} from "./room.interface";

const roomSchema =
    new Schema<IRoom>(
        {
            roomNumber: {
                type: String,

                required: true,

                unique: true,
            },

            roomType: {
                type: String,

                enum: [
                    "General",
                    "ICU",
                    "Emergency",
                    "Cabin",
                    "VIP",
                ],

                required: true,
            },

            floor: {
                type: String,

                required: true,
            },

            price: {
                type: Number,

                required: true,

                default: 0,
            },

            status: {
                type: String,

                enum: [
                    "Available",
                    "Occupied",
                ],

                default:
                    "Available",
            },
        },

        {
            timestamps: true,
        }
    );

const Room = model<IRoom>(
    "Room",
    roomSchema
);

export default Room;