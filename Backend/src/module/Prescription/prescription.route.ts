import express from "express";

import { PrescriptionControllers } from "./prescription.controller";

const router =
  express.Router();

// CREATE

router.post(
  "/",
  PrescriptionControllers.createPrescription
);

router.get(
  "/doctor/:userId",
  PrescriptionControllers.getDoctorPrescriptions
);

router.get(
  "/patient/:userId",
  PrescriptionControllers.getPatientPrescriptions
);
// UPDATE

router.patch(
  "/:appointmentId",
  PrescriptionControllers.updatePrescription
);

// GET

router.get(
  "/:appointmentId",
  PrescriptionControllers.getPrescriptionByAppointment
);

export const PrescriptionRoutes =
  router;