import express from "express";

import { AuthControllers } from "./auth.controller";

const router =
  express.Router();

// REGISTER

router.post(
  "/register",
  AuthControllers.register
);

// LOGIN

router.post(
  "/login",
  AuthControllers.login
);

export const AuthRoutes =
  router;