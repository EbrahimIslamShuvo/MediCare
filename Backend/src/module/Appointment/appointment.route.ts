// ======================================
// appointment.route.ts
// ======================================

import express from "express";

import { AppointmentControllers } from "./appointment.controller";

const router =
  express.Router();

// ======================================
// CREATE APPOINTMENT
// ======================================

router.post(
  "/",
  AppointmentControllers.createAppointment
);

// ======================================
// GET ALL APPOINTMENTS
// ======================================

router.get(
  "/",
  AppointmentControllers.getAllAppointments
);

// ======================================
// PATIENT APPOINTMENTS
// ======================================

router.get(
  "/my/:userId",
  AppointmentControllers.getMyAppointments
);

// ======================================
// DOCTOR APPOINTMENTS
// ======================================

router.get(
  "/doctor/:userId",
  AppointmentControllers.getDoctorAppointments
);

// ======================================
// STAFF ALL APPOINTMENTS
// ======================================

router.get(
  "/staff/all",
  AppointmentControllers.getAllAppointmentsForStaff
);

// ======================================
// CONFIRM PAYMENT
// ======================================

router.patch(
  "/confirm-payment/:id",
  AppointmentControllers.confirmPayment
);

export const AppointmentRoutes =
  router;