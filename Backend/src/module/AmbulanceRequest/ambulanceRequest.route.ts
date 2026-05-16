import express from "express";

import { AmbulanceRequestControllers } from "./ambulanceRequest.controller";

const router =
  express.Router();

// ======================================
// CREATE REQUEST
// ======================================

router.post(
  "/",

  AmbulanceRequestControllers.createRequest
);

// ======================================
// GET ALL REQUESTS
// ======================================

router.get(
  "/",

  AmbulanceRequestControllers.getAllRequests
);

// ======================================
// ASSIGN AMBULANCE
// ======================================

router.patch(
  "/assign/:id",

  AmbulanceRequestControllers.assignAmbulance
);

// ======================================
// COMPLETE REQUEST
// ======================================

router.patch(
  "/complete/:id",

  AmbulanceRequestControllers.completeRequest
);

router.get(
  "/patient/:userId",

  AmbulanceRequestControllers.getPatientRequests
);

export const AmbulanceRequestRoutes =
  router;