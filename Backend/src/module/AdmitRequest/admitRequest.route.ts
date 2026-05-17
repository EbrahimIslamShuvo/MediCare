// ======================================
// admitRequest.route.ts
// ======================================

import express from "express";

import {
    AdmitRequestControllers,
} from "./admitRequest.controller";

import upload from "../../utils/upload";

const router =
    express.Router();

// CREATE

router.post(
    "/",
    AdmitRequestControllers.createAdmitRequest
);

// GET ALL

router.get(
    "/",
    AdmitRequestControllers.getAllAdmitRequests
);

// ADMIT

router.patch(
    "/admit/:id",
    AdmitRequestControllers.admitPatient
);

// ADD DOCTOR VISIT

router.patch(
    "/doctor-visit/:id",
    AdmitRequestControllers.addDoctorVisit
);

// ADD MEDICINE

router.patch(
    "/medicine/:id",
    AdmitRequestControllers.addMedicine
);

// ADD TEST REQUEST

router.patch(
    "/test-request/:id",
    AdmitRequestControllers.addTestRequest
);

// UPDATE LAB TEST

router.patch(
    "/lab-test/:id/:index",
    upload.single(
        "reportPdf"
    ),
    AdmitRequestControllers.updateLabTestStatus
);

// RELEASE PREVIEW

router.patch(
    "/release/:id",
    AdmitRequestControllers.releasePatient
);

// CONFIRM BILL

router.patch(
    "/confirm-bill/:id",
    AdmitRequestControllers.confirmBill
);

export const AdmitRequestRoutes =
    router;