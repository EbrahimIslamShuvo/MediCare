// ======================================
// doctor.interface.ts
// ======================================

import { Types } from "mongoose";

export interface IQualification {
  degree: string;

  institute: string;

  country: string;
}

export type TDoctorStatus =
  | "Available"
  | "On Leave"
  | "Not Available";

export interface IDoctor {
  user: Types.ObjectId;

  image?: string;

  phone?: string;

  gender?:
    | "Male"
    | "Female"
    | "Other";

  specialization?: string;

  department?: string;

  experience?: number;

  consultationFee?: number;

  qualification?: IQualification[];

  bio?: string;

  availableDays?: string[];

  startTime?: string;

  endTime?: string;

  status?: TDoctorStatus;
}