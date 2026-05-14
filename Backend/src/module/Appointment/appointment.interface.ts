// ======================================
// appointment.interface.ts
// ======================================

import { Types } from "mongoose";

export interface IAppointment {
  patient: Types.ObjectId;

  doctor: Types.ObjectId;

  appointmentDate: string;

  serialNumber: number;

  appointmentTime: string;

  paymentStatus?:
    | "Pending"
    | "Paid"
    | "Failed";

  status?:
    | "Pending"
    | "Confirmed"
    | "Cancelled";

  expiresAt?: Date;
}