// ======================================
// nurse.model.ts
// ======================================

import {
    Schema,
    model,
} from "mongoose";

import type {
    INurse,
} from "./nurse.interface";

const nurseSchema =
    new Schema<INurse>(
        {
            user: {
                type:
                    Schema.Types.ObjectId,

                ref: "User",

                required: true,
            },

            phone: {
                type: String,

                default: "",
            },

            address: {
                type: String,

                default: "",
            },
        },

        {
            timestamps: true,
        }
    );

const Nurse =
    model<INurse>(
        "Nurse",
        nurseSchema
    );

export default Nurse;