// ======================================
// admin.route.ts
// ======================================

import express from "express";

import { AdminControllers } from "./admin.controller";

const router =
  express.Router();

// CREATE ADMIN

router.post(
  "/create-admin",
  AdminControllers.createAdmin
);

// GET ALL ADMINS

router.get(
  "/",
  AdminControllers.getAllAdmins
);

// GET SINGLE ADMIN

router.get(
  "/:id",
  AdminControllers.getSingleAdmin
);

// UPDATE ADMIN

router.patch(
  "/:id",
  AdminControllers.updateAdmin
);

export const AdminRoutes =
  router;