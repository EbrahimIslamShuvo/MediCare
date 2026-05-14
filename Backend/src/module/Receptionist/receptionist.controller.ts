// ======================================
// receptionist.controller.ts
// ======================================

import type {
  Request,
  Response,
} from "express";

import { ReceptionistServices } from "./receptionist.service";

// CREATE RECEPTIONIST

const createReceptionist =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await ReceptionistServices.createReceptionist(
          req.body
        );

      res.status(201).json({
        success: true,

        message:
          "Receptionist created successfully",

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

// GET ALL RECEPTIONISTS

const getAllReceptionists =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await ReceptionistServices.getAllReceptionists();

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

// GET SINGLE RECEPTIONIST

const getSingleReceptionist =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const { id } = req.params;

      const result =
        await ReceptionistServices.getSingleReceptionist(
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

// UPDATE RECEPTIONIST

const updateReceptionist =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const { id } = req.params;

      const result =
        await ReceptionistServices.updateReceptionist(
          id as string,
          req.body
        );

      res.status(200).json({
        success: true,

        message:
          "Receptionist updated successfully",

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

export const ReceptionistControllers =
  {
    createReceptionist,

    getAllReceptionists,

    getSingleReceptionist,

    updateReceptionist,
  };