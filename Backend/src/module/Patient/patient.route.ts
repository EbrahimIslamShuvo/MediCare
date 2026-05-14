// ======================================
// patient.route.ts
// ======================================

import express from "express";

import { PatientControllers } from "./patient.controller";

const router =
  express.Router();

// CREATE PATIENT

router.post(
  "/create-patient",
  PatientControllers.createPatient
);

// GET ALL PATIENTS

router.get(
  "/",
  PatientControllers.getAllPatients
);

// GET SINGLE PATIENT

router.get(
  "/:id",
  PatientControllers.getSinglePatient
);

// UPDATE PATIENT

router.patch(
  "/:id",
  PatientControllers.updatePatient
);

export const PatientRoutes =
  router;