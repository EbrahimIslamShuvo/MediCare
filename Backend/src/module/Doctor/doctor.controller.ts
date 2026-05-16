// ======================================
// doctor.controller.ts
// ======================================

import type {
  Request,
  Response,
} from "express";

import { DoctorServices } from "./doctor.service";

// CREATE DOCTOR

const createDoctor = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await DoctorServices.createDoctor(
        req.body
      );

    res.status(201).json({
      success: true,

      message:
        "Doctor created successfully",

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

// GET ALL DOCTORS

const getAllDoctors =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await DoctorServices.getAllDoctors();

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

// GET SINGLE DOCTOR

const getSingleDoctor =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await DoctorServices.getSingleDoctor(
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

// UPDATE DOCTOR

const updateDoctor = async (
  req: Request,
  res: Response
) => {
  try {

    // IMAGE

    if (req.file) {

      req.body.image =
        `/uploads/reports/${req.file.filename}`;
    }

    const result =
      await DoctorServices.updateDoctor(
        req.params.id as string,
        req.body
      );

    res.status(200).json({
      success: true,

      message:
        "Doctor updated successfully",

      data: result,
    });

  } catch (error: any) {

    console.log(error);

    res.status(500).json({
      success: false,

      message:
        error.message,
    });
  }
};

export const DoctorControllers =
  {
    createDoctor,

    getAllDoctors,

    getSingleDoctor,

    updateDoctor,
  };