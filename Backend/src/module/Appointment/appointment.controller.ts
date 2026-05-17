// ======================================
// appointment.controller.ts
// ======================================

import type {
  Request,
  Response,
} from "express";

import { AppointmentServices } from "./appointment.service";

// CREATE

const createAppointment =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const { userId } =
        req.body;

      const result =
        await AppointmentServices.createAppointment(
          userId,
          req.body
        );

      res.status(201).json({
        success: true,

        message:
          "Appointment created successfully",

        data: result,
      });

    } catch (error: any) {

      res.status(400).json({
        success: false,

        message:
          error.message,
      });
    }
  };

// GET ALL

const getAllAppointments =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const result =
        await AppointmentServices.getAllAppointments();

      res.status(200).json({
        success: true,

        data: result,
      });

    } catch (error: any) {

      res.status(400).json({
        success: false,

        message:
          error.message,
      });
    }
  };

// MY APPOINTMENTS

const getMyAppointments =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const result =
        await AppointmentServices.getMyAppointments(
          req.params.userId as string
        );

      res.status(200).json({
        success: true,

        data: result,
      });

    } catch (error: any) {

      res.status(400).json({
        success: false,

        message:
          error.message,
      });
    }
  };

// DOCTOR APPOINTMENTS

const getDoctorAppointments =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const result =
        await AppointmentServices.getDoctorAppointments(
          req.params.userId as string
        );

      res.status(200).json({
        success: true,

        data: result,
      });

    } catch (error: any) {

      res.status(400).json({
        success: false,

        message:
          error.message,
      });
    }
  };

// STAFF

const getAllAppointmentsForStaff =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const result =
        await AppointmentServices.getAllAppointmentsForStaff();

      res.status(200).json({
        success: true,

        data: result,
      });

    } catch (error: any) {

      res.status(400).json({
        success: false,

        message:
          error.message,
      });
    }
  };

// CONFIRM PAYMENT

const confirmPayment =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const result =
        await AppointmentServices.confirmPayment(
          req.params.id as string
        );

      res.status(200).json({
        success: true,

        data: result,
      });

    } catch (error: any) {

      res.status(400).json({
        success: false,

        message:
          error.message,
      });
    }
  };

// MARK VISITED

const markVisited =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const result =
        await AppointmentServices.markVisited(
          req.params.id as string
        );

      res.status(200).json({
        success: true,

        data: result,
      });

    } catch (error: any) {

      res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };

// COMPLETE

const completeAppointment =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const result =
        await AppointmentServices.completeAppointment(
          req.params.id as string
        );

      res.status(200).json({
        success: true,

        data: result,
      });

    } catch (error: any) {

      res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };

export const AppointmentControllers =
  {
    createAppointment,

    getAllAppointments,

    getMyAppointments,

    getDoctorAppointments,

    getAllAppointmentsForStaff,

    confirmPayment,

    markVisited,

    completeAppointment,
  };