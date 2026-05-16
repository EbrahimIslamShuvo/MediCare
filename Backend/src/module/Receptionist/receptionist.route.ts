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

router.get(
  "/",
  ReceptionistControllers.getAllReceptionists
);

router.get(
  "/user/:userId",
  ReceptionistControllers.getReceptionistByUserId
);

router.get(
  "/:id",
  ReceptionistControllers.getSingleReceptionist
);

router.patch(
  "/:id",
  ReceptionistControllers.updateReceptionist
);

export const ReceptionistRoutes =
  router;