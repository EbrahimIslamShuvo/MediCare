import SSLCommerzPayment from "sslcommerz-lts";

import Appointment from "../Appointment/appointment.model";

const store_id =
    process.env
        .SSL_STORE_ID!;

const store_passwd =
    process.env
        .SSL_STORE_PASSWORD!;

const is_live =
    process.env
        .IS_LIVE ===
    "true";

// INIT PAYMENT

const initPayment =
    async (
        appointmentId: string
    ) => {
        const appointment =
            await Appointment.findById(
                appointmentId
            )
                .populate({
                    path: "patient",

                    populate: {
                        path: "user",
                    },
                })
                .populate({
                    path: "doctor",

                    populate: {
                        path: "user",
                    },
                });

        if (
            !appointment
        ) {
            throw new Error(
                "Appointment not found"
            );
        }

        const patient =
            (
                appointment.patient as any
            ).user;

        const doctor =
            (
                appointment.doctor as any
            ).user;

        const data = {
            total_amount:
                (
                    appointment.doctor as any
                )
                    .consultationFee,

            currency:
                "BDT",

            tran_id:
                appointment._id.toString(),

            success_url:
                "http://localhost:3000/api/v1/payment/success-payment",

            fail_url:
                "http://localhost:3000/api/v1/payment/fail-payment",

            cancel_url:
                "http://localhost:3000/api/v1/payment/cancel-payment",

            ipn_url:
                "http://localhost:3000/api/v1/payment/ipn",

            shipping_method:
                "NO",

            product_name:
                "Doctor Appointment",

            product_category:
                "Appointment",

            product_profile:
                "general",

            cus_name:
                patient.name,

            cus_email:
                patient.email,

            cus_add1:
                "Dhaka",

            cus_city:
                "Dhaka",

            cus_country:
                "Bangladesh",

            cus_phone:
                "01700000000",
        };

        const sslcz =
            new SSLCommerzPayment(
                store_id,
                store_passwd,
                is_live
            );

        const apiResponse =
            await sslcz.init(
                data
            );

        return apiResponse.GatewayPageURL;
    };

export const PaymentServices =
{
    initPayment,
};