// ======================================
// nurse.model.ts
// ======================================

import {
  Schema,
  model,
} from "mongoose";

import type { INurse } from "./nurse.interface";

const nurseSchema =
  new Schema<INurse>(
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

      department: {
        type: String,

        default: "",
      },

      shift: {
        type: String,

        enum: [
          "Morning",
          "Evening",
          "Night",
        ],

        default: "Morning",
      },

      experience: {
        type: Number,

        default: 0,
      },

      qualification: {
        type: [String],

        default: [],
      },

      address: {
        type: String,

        default: "",
      },

      emergencyContact: {
        type: String,

        default: "",
      },

      status: {
        type: String,

        enum: [
          "Active",
          "On Leave",
          "Inactive",
        ],

        default: "Active",
      },
    },

    {
      timestamps: true,
    }
  );

const Nurse = model<INurse>(
  "Nurse",
  nurseSchema
);

export default Nurse;