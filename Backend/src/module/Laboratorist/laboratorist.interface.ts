// ======================================
// laboratorist.interface.ts
// ======================================

import { Types } from "mongoose";

export type TLaboratoristStatus =
  | "Active"
  | "On Leave"
  | "Inactive";

export interface ILaboratorist {
  user: Types.ObjectId;

  phone?: string;

  gender?:
    | "Male"
    | "Female"
    | "Other";

  department?: string;

  specialization?: string;

  experience?: number;

  qualification?: string[];

  shift?:
    | "Morning"
    | "Evening"
    | "Night";

  address?: string;

  emergencyContact?: string;

  status?: TLaboratoristStatus;
}