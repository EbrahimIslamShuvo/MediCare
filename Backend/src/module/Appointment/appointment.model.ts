// ======================================
// appointment.model.ts
// ======================================

import {
  Schema,
  model,
} from "mongoose";

import type {
  IAppointment,
} from "./appointment.interface";

const appointmentSchema =
  new Schema<IAppointment>(
    {
      patient: {
        type:
          Schema.Types.ObjectId,

        ref: "Patient",

        required: true,
      },

      doctor: {
        type:
          Schema.Types.ObjectId,

        ref: "Doctor",

        required: true,
      },

      appointmentDate: {
        type: String,

        required: true,
      },

      serialNumber: {
        type: Number,

        required: true,
      },

      appointmentTime: {
        type: String,

        required: true,
      },

      paymentStatus: {
        type: String,

        enum: [
          "Pending",
          "Paid",
          "Failed",
        ],

        default:
          "Pending",
      },

      status: {
        type: String,

        enum: [
          "Pending",
          "Confirmed",
          "Visited",
          "Completed",
          "Cancelled",
        ],

        default:
          "Pending",
      },

      expiresAt: {
        type: Date,

        default: () =>
          new Date(
            Date.now() +
              10 *
                60 *
                1000
          ),
      },
    },

    {
      timestamps: true,
    }
  );

const Appointment =
  model<IAppointment>(
    "Appointment",
    appointmentSchema
  );

export default Appointment;