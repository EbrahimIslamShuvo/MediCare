// ======================================
// doctor.model.ts
// ======================================

import {
  Schema,
  model,
} from "mongoose";

import type {
  IDoctor,
} from "./doctor.interface";

const qualificationSchema =
  new Schema(
    {
      degree: {
        type: String,

        default: "",
      },

      institute: {
        type: String,

        default: "",
      },

      country: {
        type: String,

        default: "",
      },
    },

    {
      _id: false,
    }
  );

const doctorSchema =
  new Schema<IDoctor>(
    {
      user: {
        type:
          Schema.Types.ObjectId,

        ref: "User",

        required: true,

        unique: true,
      },

      image: {
        type: String,

        default: "",
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

      specialization: {
        type: String,

        default: "",
      },

      department: {
        type: String,

        default: "",
      },

      experience: {
        type: Number,

        default: 0,
      },

      consultationFee: {
        type: Number,

        default: 0,
      },

      qualification: {
        type: [
          qualificationSchema,
        ],

        default: [],
      },

      bio: {
        type: String,

        default: "",
      },

      availableDays: {
        type: [String],

        default: [],
      },

      startTime: {
        type: String,

        default: "",
      },

      endTime: {
        type: String,

        default: "",
      },

      status: {
        type: String,

        enum: [
          "Available",
          "On Leave",
          "Not Available",
        ],

        default:
          "Available",
      },
    },

    {
      timestamps: true,
    }
  );

const Doctor = model<IDoctor>(
  "Doctor",
  doctorSchema
);

export default Doctor;