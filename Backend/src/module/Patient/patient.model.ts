// ======================================
// patient.model.ts
// ======================================

import {
    Schema,
    model,
} from "mongoose";
import { IPatient } from "./patient.interface";


const patientSchema =
    new Schema<IPatient>(
        {
            user: {
                type:
                    Schema.Types.ObjectId,

                ref: "User",

                required: true,

                unique: true,
            },

            phone: {
                type: String,
                default: "",
            },

            gender: {
                type: String,

                enum: [
                    "Male",
                    "Female",
                    "Other",
                ],

                default: "Male",
            },

            bloodGroup: {
                type: String,

                enum: [
                    "A+",
                    "A-",
                    "B+",
                    "B-",
                    "AB+",
                    "AB-",
                    "O+",
                    "O-",
                ],

                default: "A+",
            },

            age: {
                type: Number,
                default: 0,
            },

            address: {
                type: String,
                default: "",
            },

            emergencyContact: {
                type: String,
                default: "",
            },
        },

        {
            timestamps: true,
        }
    );

const Patient = model<IPatient>(
    "Patient",
    patientSchema
);

export default Patient;