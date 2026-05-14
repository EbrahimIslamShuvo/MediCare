// ======================================
// laboratory.route.ts
// ======================================

import express from "express";

import { LaboratoryControllers } from "./laboratory.controller";

const router =
  express.Router();

// CREATE

router.post(
  "/",
  LaboratoryControllers.createLaboratoryProfile
);

// GET

router.get(
  "/:userId",
  LaboratoryControllers.getLaboratoryProfile
);

// UPDATE

router.patch(
  "/:userId",
  LaboratoryControllers.updateLaboratoryProfile
);

export const LaboratoryRoutes =
  router;