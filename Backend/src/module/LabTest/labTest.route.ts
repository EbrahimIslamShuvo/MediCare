// ======================================
// labTest.route.ts
// ======================================

import express from "express";


import { LabTestControllers } from "./labTest.controller";
import upload from "../../utils/upload";

const router =
  express.Router();

// CREATE

router.post(
  "/",
  LabTestControllers.createLabTestBooking
);

// GET ALL

router.get(
  "/",
  LabTestControllers.getAllLabTests
);

// SUCCESS

router.post(
  "/success",
  LabTestControllers.successPayment
);

// FAIL

router.post(
  "/fail",
  LabTestControllers.failPayment
);

// CANCEL

router.post(
  "/cancel",
  LabTestControllers.failPayment
);

// PATIENT REPORTS

router.get(
  "/patient/:userId",
  LabTestControllers.getPatientLabTests
);

// UPDATE STATUS

router.patch(
  "/:id",
  LabTestControllers.updateLabTestStatus
);

// COMPLETE TEST

router.patch(
  "/complete/:id",

  upload.single(
    "report"
  ),

  LabTestControllers.completeLabTest
);

// DOCTOR REPORTS

router.get(
  "/doctor/:doctorId",

  LabTestControllers.getDoctorLabReports
);

export const LabTestRoutes =
  router;