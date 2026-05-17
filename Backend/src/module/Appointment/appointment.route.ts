// ======================================
// appointment.route.ts
// ======================================

import express from "express";

import { AppointmentControllers } from "./appointment.controller";

const router =
  express.Router();

// CREATE

router.post(
  "/",
  AppointmentControllers.createAppointment
);

// GET ALL

router.get(
  "/",
  AppointmentControllers.getAllAppointments
);

// MY

router.get(
  "/my/:userId",
  AppointmentControllers.getMyAppointments
);

// DOCTOR

router.get(
  "/doctor/:userId",
  AppointmentControllers.getDoctorAppointments
);

// STAFF

router.get(
  "/staff/all",
  AppointmentControllers.getAllAppointmentsForStaff
);

// PAYMENT

router.patch(
  "/confirm-payment/:id",
  AppointmentControllers.confirmPayment
);

// VISITED

router.patch(
  "/visited/:id",
  AppointmentControllers.markVisited
);

// COMPLETE

router.patch(
  "/complete/:id",
  AppointmentControllers.completeAppointment
);

export const AppointmentRoutes =
  router;