// ======================================
// laboratory.controller.ts
// ======================================

import type {
  Request,
  Response,
} from "express";

import { LaboratoryServices } from "./laboratory.service";

// ======================================
// CREATE PROFILE
// ======================================

const createLaboratoryProfile =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await LaboratoryServices.createLaboratoryProfile(
          req.body
        );

      res.status(201).json({
        success: true,

        message:
          "Profile created successfully",

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
// GET PROFILE
// ======================================

const getLaboratoryProfile =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await LaboratoryServices.getLaboratoryProfile(
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
// UPDATE PROFILE
// ======================================

const updateLaboratoryProfile =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await LaboratoryServices.updateLaboratoryProfile(
          req.params.userId as string, 

          req.body
        );

      res.status(200).json({
        success: true,

        message:
          "Profile updated successfully",

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

export const LaboratoryControllers =
  {
    createLaboratoryProfile,

    getLaboratoryProfile,

    updateLaboratoryProfile,
  };