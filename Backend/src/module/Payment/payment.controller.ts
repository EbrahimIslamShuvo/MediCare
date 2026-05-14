import type {
    Request,
    Response,
} from "express";

import { PaymentServices } from "./payment.service";

import Appointment from "../Appointment/appointment.model";

// INIT PAYMENT

const initPayment =
    async (
        req: Request,
        res: Response
    ) => {
        try {
            const { id } =
                req.params;

            const url =
                await PaymentServices.initPayment(
                    id as string
                );

            res.status(200).json(
                {
                    success: true,

                    url,
                }
            );
        } catch (error: any) {
            res.status(400).json(
                {
                    success: false,

                    message:
                        error.message,
                }
            );
        }
    };

// SUCCESS

const successPayment =
    async (
        req: Request,
        res: Response
    ) => {
        try {
            const tran_id =
                req.body?.tran_id;

            if (!tran_id) {
                throw new Error(
                    "Transaction ID missing"
                );
            }

            await Appointment.findByIdAndUpdate(
                tran_id,
                {
                    paymentStatus:
                        "Paid",

                    status:
                        "Confirmed",
                }
            );

            res.redirect(
                "http://localhost:5173/dashboard/patient/appointments"
            );
        } catch (error) {
            console.log(error);

            res.redirect(
                "http://localhost:5173/payment-failed"
            );
        }
    };

// FAIL

const failPayment =
    async (
        req: Request,
        res: Response
    ) => {
        const tran_id =
            req.body.tran_id;

        await Appointment.findByIdAndUpdate(
            tran_id,
            {
                paymentStatus:
                    "Failed",

                status:
                    "Cancelled",
            }
        );

        res.redirect(
            "http://localhost:5173/payment-failed"
        );
    };

// CANCEL

const cancelPayment =
    async (
        req: Request,
        res: Response
    ) => {
        res.redirect(
            "http://localhost:5173/payment-cancel"
        );
    };

export const PaymentControllers =
{
    initPayment,

    successPayment,

    failPayment,

    cancelPayment,
};