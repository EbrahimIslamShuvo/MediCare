// ======================================
// nurse.interface.ts
// ======================================

import { Types } from "mongoose";

export type TNurseStatus =
  | "Active"
  | "On Leave"
  | "Inactive";

export interface INurse {
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

  qualification?: string[];

  address?: string;

  emergencyContact?: string;

  status?: TNurseStatus;
}