import { Types } from "mongoose";

export interface IAmbulance {
  vehicleNumber: string;

  driverName: string;

  driverPhone: string;

  type: string;

  status: string;
}