import express from "express";

import { AmbulanceControllers } from "./ambulance.controller";

const router =
  express.Router();

// ======================================
// CREATE
// ======================================

router.post(
  "/",

  AmbulanceControllers.createAmbulance
);

// ======================================
// GET ALL
// ======================================

router.get(
  "/",

  AmbulanceControllers.getAllAmbulances
);

// ======================================
// UPDATE
// ======================================

router.patch(
  "/:id",

  AmbulanceControllers.updateAmbulance
);

// ======================================
// DELETE
// ======================================

router.delete(
  "/:id",

  AmbulanceControllers.deleteAmbulance
);

export const AmbulanceRoutes =
  router;