import { Types } from "mongoose";

export interface IMedicine {
  medicine: string;

  time: string[];

  duration: string;
}

export interface ITest {
  testName: string;

  comment: string;
}

export interface IPrescription {
  appointment: Types.ObjectId;

  doctor: Types.ObjectId;

  patient: Types.ObjectId;

  medicines: IMedicine[];

  tests: ITest[];
}