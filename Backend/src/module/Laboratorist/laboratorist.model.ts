// ======================================
// laboratorist.model.ts
// ======================================

import {
  Schema,
  model,
} from "mongoose";

import type { ILaboratorist } from "./laboratorist.interface";

const laboratoristSchema =
  new Schema<ILaboratorist>(
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

      specialization: {
        type: String,

        default: "",
      },

      experience: {
        type: Number,

        default: 0,
      },

      qualification: {
        type: [String],

        default: [],
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

const Laboratorist =
  model<ILaboratorist>(
    "Laboratorist",
    laboratoristSchema
  );

export default Laboratorist;