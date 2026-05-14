// ======================================
// patient.interface.ts
// ======================================

import { Types } from "mongoose";

export type TGender =
  | "Male"
  | "Female"
  | "Other";

export type TBloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export interface IPatient {
  user: Types.ObjectId;

  phone: string;

  gender: TGender;

  bloodGroup: TBloodGroup;

  age: number;

  address: string;

  emergencyContact: string;
}