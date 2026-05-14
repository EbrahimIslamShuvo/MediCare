// ======================================
// laboratorist.route.ts
// ======================================

import express from "express";

import { LaboratoristControllers } from "./laboratorist.controller";

const router =
  express.Router();

// CREATE LABORATORIST

router.post(
  "/create-laboratorist",
  LaboratoristControllers.createLaboratorist
);

// GET ALL LABORATORISTS

router.get(
  "/",
  LaboratoristControllers.getAllLaboratorists
);

// GET SINGLE LABORATORIST

router.get(
  "/:id",
  LaboratoristControllers.getSingleLaboratorist
);

// UPDATE LABORATORIST

router.patch(
  "/:id",
  LaboratoristControllers.updateLaboratorist
);

export const LaboratoristRoutes =
  router;