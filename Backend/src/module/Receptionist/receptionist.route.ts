// ======================================
// receptionist.route.ts
// ======================================

import express from "express";

import { ReceptionistControllers } from "./receptionist.controller";

const router =
  express.Router();

// CREATE RECEPTIONIST

router.post(
  "/create-receptionist",
  ReceptionistControllers.createReceptionist
);

// GET ALL RECEPTIONISTS

router.get(
  "/",
  ReceptionistControllers.getAllReceptionists
);

// GET SINGLE RECEPTIONIST

router.get(
  "/:id",
  ReceptionistControllers.getSingleReceptionist
);

// UPDATE RECEPTIONIST

router.patch(
  "/:id",
  ReceptionistControllers.updateReceptionist
);

export const ReceptionistRoutes =
  router;