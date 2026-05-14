import express from "express";

import { PaymentControllers } from "./payment.controller";

const router =
    express.Router();

// INIT

router.get(
    "/init-payment/:id",
    PaymentControllers.initPayment
);

// SUCCESS

router.post(
    "/success-payment",
    PaymentControllers.successPayment
);

// FAIL

router.post(
    "/fail-payment",
    PaymentControllers.failPayment
);

// CANCEL

router.post(
    "/cancel-payment",
    PaymentControllers.cancelPayment
);

export const PaymentRoutes =
    router;