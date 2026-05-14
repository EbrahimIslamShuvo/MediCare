// ======================================
// nurse.route.ts
// ======================================

import express from "express";

import { NurseControllers } from "./nurse.controller";

const router =
  express.Router();

// CREATE NURSE

router.post(
  "/create-nurse",
  NurseControllers.createNurse
);

// GET ALL NURSES

router.get(
  "/",
  NurseControllers.getAllNurses
);

// GET SINGLE NURSE

router.get(
  "/:id",
  NurseControllers.getSingleNurse
);

// UPDATE NURSE

router.patch(
  "/:id",
  NurseControllers.updateNurse
);

export const NurseRoutes =
  router;