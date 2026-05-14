// ======================================
// receptionist.interface.ts
// ======================================

import { Types } from "mongoose";

export type TReceptionistStatus =
  | "Active"
  | "On Leave"
  | "Inactive";

export interface IReceptionist {
  user: Types.ObjectId;

  phone?: string;

  gender?:
    | "Male"
    | "Female"
    | "Other";

  department?: string;

  shift?:
    | "Morning"
    | "Evening"
    | "Night";

  experience?: number;

  address?: string;

  emergencyContact?: string;

  status?: TReceptionistStatus;
}