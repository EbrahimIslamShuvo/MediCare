// ======================================
// labTest.model.ts
// ======================================

import mongoose, {
  Schema,
} from "mongoose";

const bookedTestSchema =
  new Schema(
    {
      name: {
        type: String,

        required: true,
      },

      price: {
        type: Number,

        required: true,
      },
    },
    {
      _id: false,
    }
  );

const labTestSchema =
  new Schema(
    {
      patient: {
        type:
          mongoose.Schema
            .Types
            .ObjectId,

        ref: "Patient",

        required: true,
      },

      prescription: {
        type:
          mongoose.Schema
            .Types
            .ObjectId,

        ref: "Prescription",

        required: true,
      },

      tests: [
        bookedTestSchema,
      ],

      totalAmount: {
        type: Number,

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

          "Processing",

          "Completed",
        ],

        default:
          "Pending",
      },

      transactionId: {
        type: String,

        required: true,
      },

      report: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

const LabTest =
  mongoose.model(
    "LabTest",
    labTestSchema
  );

export default LabTest;