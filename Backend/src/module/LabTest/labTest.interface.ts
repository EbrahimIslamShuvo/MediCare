// ======================================
// labTest.interface.ts
// ======================================

import { Types } from "mongoose";

export interface IBookedTest {
  name: string;

  price: number;
}

export interface ILabTest {
  patient: Types.ObjectId;

  prescription: Types.ObjectId;

  tests: IBookedTest[];

  totalAmount: number;

  paymentStatus: string;

  status: string;

  transactionId: string;

  report?: string;
}