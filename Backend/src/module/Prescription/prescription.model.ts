import mongoose, {
  Schema,
} from "mongoose";

const medicineSchema =
  new Schema(
    {
      medicine: {
        type: String,

        required: true,
      },

      time: [
        {
          type: String,
        },
      ],

      duration: {
        type: String,

        required: true,
      },
    },
    {
      _id: false,
    }
  );

const testSchema =
  new Schema(
    {
      testName: {
        type: String,

        required: true,
      },

      comment: {
        type: String,
      },
    },
    {
      _id: false,
    }
  );

const prescriptionSchema =
  new Schema(
    {
      appointment: {
        type:
          mongoose.Schema
            .Types
            .ObjectId,

        ref: "Appointment",

        required: true,

        unique: true,
      },

      doctor: {
        type:
          mongoose.Schema
            .Types
            .ObjectId,

        ref: "Doctor",

        required: true,
      },

      patient: {
        type:
          mongoose.Schema
            .Types
            .ObjectId,

        ref: "Patient",

        required: true,
      },

      medicines: [
        medicineSchema,
      ],

      tests: [
        testSchema,
      ],
    },
    {
      timestamps: true,
    }
  );

const Prescription =
  mongoose.model(
    "Prescription",
    prescriptionSchema
  );

export default Prescription;