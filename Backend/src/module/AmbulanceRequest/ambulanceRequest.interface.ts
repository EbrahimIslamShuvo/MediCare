import { Types } from "mongoose";

export interface IAmbulanceRequest {
  patient?: Types.ObjectId;

  requestedBy: string;

  ambulance?: Types.ObjectId;

  pickupLocation: string;

  destination: string;

  emergencyType: string;

  phone: string;

  status: string;
}