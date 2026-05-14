// ======================================
// doctor.route.ts
// ======================================

import express from "express";

import { DoctorControllers } from "./doctor.controller";

import upload from "../../utils/upload";

const router =
  express.Router();

// CREATE DOCTOR

router.post(
  "/create-doctor",
  DoctorControllers.createDoctor
);

// GET ALL DOCTORS

router.get(
  "/",
  DoctorControllers.getAllDoctors
);

// GET SINGLE DOCTOR

router.get(
  "/:id",
  DoctorControllers.getSingleDoctor
);

// UPDATE DOCTOR

router.patch(
  "/:id",
  upload.single("image"),
  DoctorControllers.updateDoctor
);

export const DoctorRoutes =
  router;