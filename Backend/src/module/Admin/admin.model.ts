// ======================================
// admin.model.ts
// ======================================

import {
  Schema,
  model,
} from "mongoose";

import type { IAdmin } from "./admin.interface";

const adminSchema =
  new Schema<IAdmin>(
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

      address: {
        type: String,

        default: "",
      },

      designation: {
        type: String,

        default:
          "System Administrator",
      },
    },

    {
      timestamps: true,
    }
  );

const Admin = model<IAdmin>(
  "Admin",
  adminSchema
);

export default Admin;