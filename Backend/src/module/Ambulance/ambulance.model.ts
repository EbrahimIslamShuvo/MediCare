import mongoose, {
  Schema,
} from "mongoose";

const ambulanceSchema =
  new Schema(
    {
      vehicleNumber: {
        type: String,

        required: true,

        unique: true,
      },

      driverName: {
        type: String,

        required: true,
      },

      driverPhone: {
        type: String,

        required: true,
      },

      type: {
        type: String,

        enum: [
          "AC",
          "Non-AC",
          "ICU",
        ],

        default:
          "Non-AC",
      },

      status: {
        type: String,

        enum: [
          "Available",
          "Busy",
          "Maintenance",
        ],

        default:
          "Available",
      },
    },
    {
      timestamps: true,
    }
  );

const Ambulance =
  mongoose.model(
    "Ambulance",
    ambulanceSchema
  );

export default Ambulance;