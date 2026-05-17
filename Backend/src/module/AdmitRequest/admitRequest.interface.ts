// ======================================
// admitRequest.interface.ts
// ======================================

import { Types } from "mongoose";

export interface IDoctorVisit {

    doctorName: string;

    fee: number;

    note?: string;

    createdAt?: Date;
}

export interface IMedicine {

    medicine: string;

    duration: string;

    times: string[];
}

export interface ITestRequest {

    testName: string;

    price: number;

    note?: string;

    isSent?: boolean;

    status?:
        | "Pending"
        | "Processing"
        | "Completed";

    report?: string;

    reportPdf?: string;

    createdAt?: Date;
}

export interface IBill {

    title: string;

    amount: number;
}

export interface IAdmitRequest {

    patient: Types.ObjectId;

    doctor: Types.ObjectId;

    appointment: Types.ObjectId;

    room?: Types.ObjectId;

    admitType: string;

    reason: string;

    status?:
    | "Pending"
    | "Admitted"
    | "Released";

    doctorVisits?: IDoctorVisit[];

    medicines?: IMedicine[];

    testRequests?: ITestRequest[];

    bills?: IBill[];

    totalBill: number;

    isBillConfirmed?: boolean;

    releasedAt?: Date;

    createdAt?: Date;

    updatedAt?: Date;
}