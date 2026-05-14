// ======================================
// receptionist.model.ts
// ======================================

import {
  Schema,
  model,
} from "mongoose";

import type { IReceptionist } from "./receptionist.interface";

const receptionistSchema =
  new Schema<IReceptionist>(
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

        default: "Front Desk",
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

const Receptionist =
  model<IReceptionist>(
    "Receptionist",
    receptionistSchema
  );

export default Receptionist;