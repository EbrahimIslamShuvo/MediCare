// ======================================
// admitRequest.model.ts
// ======================================

import {
    Schema,
    model,
} from "mongoose";

import type {
    IAdmitRequest,
} from "./admitRequest.interface";

const admitRequestSchema =
    new Schema<IAdmitRequest>(
        {
            patient: {
                type:
                    Schema.Types.ObjectId,
                ref: "Patient",
                required: true,
            },

            doctor: {
                type:
                    Schema.Types.ObjectId,
                ref: "Doctor",
                required: true,
            },

            appointment: {
                type:
                    Schema.Types.ObjectId,
                ref: "Appointment",
                required: true,
            },

            room: {
                type:
                    Schema.Types.ObjectId,
                ref: "Room",
            },

            admitType: {
                type: String,
                required: true,
            },

            reason: {
                type: String,
                required: true,
            },

            status: {
                type: String,
                enum: [
                    "Pending",
                    "Admitted",
                    "Released",
                ],
                default:
                    "Pending",
            },

            doctorVisits: {
                type: [
                    {
                        doctorName:
                            String,

                        fee:
                            Number,

                        note:
                            String,

                        createdAt:
                        {
                            type:
                                Date,
                            default:
                                Date.now,
                        },
                    },
                ],
                default: [],
            },

            medicines: {
                type: [
                    {
                        medicine:
                            String,

                        duration:
                            String,

                        times:
                        {
                            type:
                                [String],
                            default:
                                [],
                        },
                    },
                ],
                default: [],
            },

            testRequests: {
                type: [
                    {
                        testName:
                            String,

                        price:
                            Number,

                        note:
                            String,

                        isSent:
                        {
                            type:
                                Boolean,
                            default:
                                false,
                        },

                        status:
                        {
                            type:
                                String,

                            enum: [
                                "Pending",
                                "Processing",
                                "Completed",
                            ],

                            default:
                                "Pending",
                        },

                        report:
                        {
                            type:
                                String,
                            default:
                                "",
                        },

                        reportPdf:
                        {
                            type:
                                String,
                            default:
                                "",
                        },

                        createdAt:
                        {
                            type:
                                Date,
                            default:
                                Date.now,
                        },
                    },
                ],
                default: [],
            },

            bills: {
                type: [
                    {
                        title:
                            String,

                        amount:
                            Number,
                    },
                ],
                default: [],
            },

            totalBill: {
                type: Number,
                default: 0,
            },

            isBillConfirmed: {
                type: Boolean,
                default: false,
            },

            releasedAt: {
                type: Date,
            },
        },

        {
            timestamps: true,
        }
    );

const AdmitRequest =
    model<IAdmitRequest>(
        "AdmitRequest",
        admitRequestSchema
    );

export default AdmitRequest;