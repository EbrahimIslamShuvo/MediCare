import express from "express";

import { UserControllers } from "./user.controller";

const router =
  express.Router();

// GET ALL USERS

router.get(
  "/",
  UserControllers.getAllUsers
);

// GET SINGLE USER

router.get(
  "/:id",
  UserControllers.getSingleUser
);

// UPDATE USER

router.patch(
  "/:id",
  UserControllers.updateUser
);

export const UserRoutes =
  router;