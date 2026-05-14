// ======================================
// patient.controller.ts
// ======================================

import type {
  Request,
  Response,
} from "express";
import { PatientServices } from "./patient.service";


// CREATE PATIENT

const createPatient = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await PatientServices.createPatient(
        req.body
      );

    res.status(201).json({
      success: true,

      message:
        "Patient created successfully",

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

// GET ALL PATIENTS

const getAllPatients =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await PatientServices.getAllPatients();

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

// GET SINGLE PATIENT

const getSinglePatient =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const { id } = req.params;

      const result =
        await PatientServices.getSinglePatient(
          id as string
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

// UPDATE PATIENT

const updatePatient = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result =
      await PatientServices.updatePatient(
        id as string,
        req.body
      );

    res.status(200).json({
      success: true,

      message:
        "Patient updated successfully",

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

export const PatientControllers =
  {
    createPatient,

    getAllPatients,

    getSinglePatient,

    updatePatient,
  };