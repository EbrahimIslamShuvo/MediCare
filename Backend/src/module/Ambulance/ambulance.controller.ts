import type {
  Request,
  Response,
} from "express";

import { AmbulanceServices } from "./ambulance.service";

// ======================================
// CREATE AMBULANCE
// ======================================

const createAmbulance =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await AmbulanceServices.createAmbulance(
          req.body
        );

      res.status(201).json({
        success: true,

        message:
          "Ambulance added successfully",

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
// GET ALL AMBULANCES
// ======================================

const getAllAmbulances =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await AmbulanceServices.getAllAmbulances();

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
// UPDATE AMBULANCE
// ======================================

const updateAmbulance =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await AmbulanceServices.updateAmbulance(
          req.params.id as string,

          req.body
        );

      res.status(200).json({
        success: true,

        message:
          "Ambulance updated successfully",

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
// DELETE AMBULANCE
// ======================================

const deleteAmbulance =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      await AmbulanceServices.deleteAmbulance(
        req.params.id as string
      );

      res.status(200).json({
        success: true,

        message:
          "Ambulance deleted successfully",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,

        message:
          error.message,
      });
    }
  };

export const AmbulanceControllers =
  {
    createAmbulance,

    getAllAmbulances,

    updateAmbulance,

    deleteAmbulance,
  };