// ======================================
// laboratory.model.ts
// ======================================

import mongoose, {
  Schema,
} from "mongoose";

const laboratorySchema =
  new Schema(
    {
      user: {
        type:
          mongoose.Schema
            .Types
            .ObjectId,

        ref: "User",

        required: true,

        unique: true,
      },

      phone: {
        type: String,
      },

      address: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

const Laboratory =
  mongoose.model(
    "Laboratory",
    laboratorySchema
  );

export default Laboratory;