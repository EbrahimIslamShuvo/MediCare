import mongoose, {
  Schema,
} from "mongoose";

const ambulanceRequestSchema =
  new Schema(
    {
      patient: {
        type:
          mongoose.Schema
            .Types
            .ObjectId,

        ref: "Patient",
      },

      requestedBy: {
        type: String,

        enum: [
          "Patient",
          "Receptionist",
        ],

        required: true,
      },

      ambulance: {
        type:
          mongoose.Schema
            .Types
            .ObjectId,

        ref: "Ambulance",
      },

      pickupLocation: {
        type: String,

        required: true,
      },

      destination: {
        type: String,

        required: true,
      },

      emergencyType: {
        type: String,

        required: true,
      },

      phone: {
        type: String,

        required: true,
      },

      status: {
        type: String,

        enum: [
          "Pending",
          "Assigned",
          "Completed",
          "Cancelled",
        ],

        default:
          "Pending",
      },
    },
    {
      timestamps: true,
    }
  );

const AmbulanceRequest =
  mongoose.model(
    "AmbulanceRequest",
    ambulanceRequestSchema
  );

export default AmbulanceRequest;