import type {
  Request,
  Response,
} from "express";

import { PrescriptionServices } from "./prescription.service";

// ======================================
// CREATE
// ======================================

const createPrescription =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await PrescriptionServices.createPrescription(
          req.body
        );

      res.status(201).json({
        success: true,

        message:
          "Prescription added successfully",

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

// ======================================
// UPDATE
// ======================================

const updatePrescription =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await PrescriptionServices.updatePrescription(
          req.params
            .appointmentId as string,

          req.body
        );

      res.status(200).json({
        success: true,

        message:
          "Prescription updated successfully",

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

// ======================================
// GET
// ======================================

const getPrescriptionByAppointment =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await PrescriptionServices.getPrescriptionByAppointment(
          req.params
            .appointmentId as string
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

  // ======================================
// GET DOCTOR PRESCRIPTIONS
// ======================================

const getDoctorPrescriptions =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await PrescriptionServices.getDoctorPrescriptions(
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

  // ======================================
// GET PATIENT PRESCRIPTIONS
// ======================================

const getPatientPrescriptions =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await PrescriptionServices.getPatientPrescriptions(
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

export const PrescriptionControllers =
  {
    createPrescription,

    updatePrescription,

    getPrescriptionByAppointment,

    getDoctorPrescriptions,

    getPatientPrescriptions,
  };